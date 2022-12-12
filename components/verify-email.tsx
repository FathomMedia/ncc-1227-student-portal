import { API, Auth, graphqlOperation } from "aws-amplify";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import * as yup from "yup";
import { ListStudentsQuery } from "../src/API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useEffect, useState } from "react";
import AppLoader from "./App-loader";
import { useRouter } from "next/router";

interface Props {
  cpr: string;
  // email: string;
}

interface IVerifyEmail {
  code: string;
}

export const VerifyEmail = ({ cpr }: Props) => {
  const initialValues: IVerifyEmail = {
    code: "",
  };

  const { push } = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);

  /* It replaces the characters after the first 3 characters of the email with *** */
  const partialEmail = email?.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2");

  /* A countdown timer. */
  useEffect(() => {
    if (countdown > 0) {
      var interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  /* Get's the cpr email. */
  useEffect(() => {
    setLoading(true);
    getUserEmail(cpr)
      .then((userEmail) => {
        setEmail(userEmail);
      })
      .finally(() => setLoading(false));

    return () => {};
  }, [cpr]);

  /**
   * When the user clicks the button, reset the countdown to 60 seconds.
   */
  function resetCountdown() {
    setCountdown(60);
  }

  /**
   * It resend the verification code to the user's email address
   */
  async function resendCode() {
    await toast
      .promise(Auth.resendSignUp(cpr), {
        loading: "Sending verification code...",
        success: "Verification code has been sent",
        error: (error) => {
          return `${error.message}`;
        },
      })
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        resetCountdown();
      });
  }

  /**
   * It queries the database for a user with the given CPR number, and returns the user's email address
   * if found, or null if not found
   * @param {string} cpr - The CPR number of the user.
   * @returns The email of the user with the given CPR number.
   */
  async function getUserEmail(cpr: string): Promise<string | null> {
    let query = `
    query GetUserEmail {
      listStudents(filter: {cpr: {eq: "${cpr}"}}) {
        items {
          _version
          _deleted
          id
          cpr
          email
        }
      }
    }
    `;

    let res = (await API.graphql(
      graphqlOperation(query)
    )) as GraphQLResult<ListStudentsQuery>;

    return (res.data?.listStudents?.items ?? []).length > 0
      ? res.data?.listStudents?.items[0]?.email ?? null
      : null;
  }

  return loading ? (
    <AppLoader></AppLoader>
  ) : (
    <div>
      <h2>
        verification code has been sent to{" "}
        <span className="text-goblin-500">{partialEmail}</span>
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          code: yup.string().required(),
        })}
        onSubmit={(values, actions) => {
          try {
            toast.promise(
              Auth.confirmSignUp(cpr, values.code).then((res) => {
                console.log("confirmSignUp", res);
              }),
              {
                loading: "Verifying...",
                success: () => {
                  push("/signIn");
                  return <b>Account verified!</b>;
                },
                error: <b>Could not verify account.</b>,
              }
            );
          } catch (error) {
            toast.error("Error verifying account");
          }
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          isValid,
        }) => (
          <div>
            <Form className="flex items-start gap-3 p-4">
              {/* Code field */}
              <div className="flex flex-col">
                <Field
                  type="text"
                  name="code"
                  title="code"
                  placeholder="Code"
                  className={`input input-bordered input-primary ${
                    errors.code && "input-error"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.code}
                />
                <label className="label-text-alt text-error">
                  {errors.code && touched.code && errors.code}
                </label>
              </div>

              {/* Submit */}
              <button
                className="text-white btn btn-primary"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Verify
              </button>
              <button
                className="text-white btn btn-accent"
                type="button"
                onClick={resendCode}
                disabled={countdown > 0}
              >
                {"Resend code"}
                {countdown > 0 && (
                  <span className="countdown mx-2">
                    <span style={{ ["--value" as any]: countdown }}></span>
                  </span>
                )}
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
