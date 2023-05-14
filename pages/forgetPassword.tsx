import { NextPage } from "next";
import { PageComponent } from "../components/PageComponent";
import { Formik, Form, Field } from "formik";
import { t } from "i18next";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";
import { useRouter } from "next/router";

interface Props {}

interface IForgetPasswordForm {
  cpr: string;
}
interface IForgetPasswordOTPForm {
  otp: string;
  newPassword: string;
}

const ForgetPassword: NextPage<Props> = () => {
  const { t } = useTranslation("forgetPassword");
  const auth = useAuth();
  const initialValues: IForgetPasswordForm = {
    cpr: "",
  };
  const initialValuesOTP: IForgetPasswordOTPForm = {
    otp: "",
    newPassword: "",
  };

  const [showOTP, setShowOTP] = useState(false);
  const [cpr, setCpr] = useState("");

  const router = useRouter();

  return (
    <div>
      <PageComponent title={"Forget Password"}>
        <div className="container max-w-sm mx-auto">
          {!showOTP && (
            <Formik
              initialValues={initialValues}
              validationSchema={yup.object({
                cpr: yup.string().min(9).max(9).required(),
              })}
              onSubmit={async (values, actions) => {
                await auth.sendForgetPassword(values.cpr).then((isSent) => {
                  if (isSent) {
                    setCpr(values.cpr);
                    setShowOTP(isSent);
                  }
                });
              }}
            >
              {({ errors, touched, isSubmitting, isValid }) => (
                <Form className="flex flex-col gap-3 p-4">
                  <div className="flex flex-col">
                    <label className="label">{t("cpr")}</label>
                    <Field
                      name="cpr"
                      type="text"
                      placeholder="CPR"
                      className={`input input-bordered input-primary ${
                        errors.cpr && "input-error"
                      }`}
                    />
                    <label className="label-text-alt text-error">
                      {errors.cpr && touched.cpr && errors.cpr}
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary ${isSubmitting && "loading"}`}
                    disabled={isSubmitting || !isValid}
                  >
                    {t("sendResetEmail")}
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {showOTP && (
            <Formik
              initialValues={initialValuesOTP}
              validationSchema={yup.object({
                otp: yup.string().min(6).max(6).required(),
                newPassword: yup.string().min(6).required(),
              })}
              onSubmit={async (values, actions) => {
                auth
                  .verifyForgetPassword(cpr, values.otp, values.newPassword)
                  .then((isPasswordUpdated) => {
                    if (isPasswordUpdated) {
                      router.replace("/signIn");
                    }
                  });
              }}
            >
              {({ errors, touched, isSubmitting, isValid }) => (
                <Form className="flex flex-col gap-3 p-4">
                  <div className="flex flex-col">
                    <label className="label">{t("cpr")}</label>
                    <Field
                      name="cpr"
                      type="text"
                      disabled
                      placeholder="CPR"
                      className={`input input-bordered input-primary`}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="label">{t("otp")}</label>
                    <Field
                      name="otp"
                      type="text"
                      placeholder="OTP"
                      className={`input input-bordered input-primary ${
                        errors.otp && "input-error"
                      }`}
                    />
                    <label className="label-text-alt text-error">
                      {errors.otp && touched.otp && errors.otp}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label className="label">{t("newPassword")}</label>
                    <Field
                      name="newPassword"
                      type="text"
                      placeholder="New Password"
                      className={`input input-bordered input-primary ${
                        errors.newPassword && "input-error"
                      }`}
                    />
                    <label className="label-text-alt text-error">
                      {errors.newPassword &&
                        touched.newPassword &&
                        errors.newPassword}
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary ${isSubmitting && "loading"}`}
                    disabled={isSubmitting || !isValid}
                  >
                    {t("verify")}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </PageComponent>
    </div>
  );
};

export default ForgetPassword;
