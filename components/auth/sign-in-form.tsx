import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { useAuth } from "../../hooks/use-auth";
interface ISignInForm {
  cpr: string;
  password: string;
}

export const SignInForm = () => {
  const auth = useAuth();

  const initialValues: ISignInForm = {
    cpr: "",
    password: "",
  };

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          cpr: yup.string().min(9).max(9).required(),
          password: yup.string().required(),
        })}
        onSubmit={async (values, actions) => {
          await auth.signIn(values.cpr, values.password);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting, isValid }) => (
          <Form className="flex flex-col gap-3 p-4">
            <div className="flex flex-col">
              <label className="label">CPR</label>
              <Field
                name="cpr"
                type="text"
                placeholder="Cpr"
                className={`input input-bordered input-primary ${
                  errors.cpr && "input-error"
                }`}
              />
              <label className="label-text-alt text-error">
                {errors.cpr && touched.cpr && errors.cpr}
              </label>
            </div>
            <div className="flex flex-col">
              <label className="label">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={`input input-bordered input-primary ${
                  errors.cpr && "input-error"
                }`}
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting && "loading"}`}
              disabled={isSubmitting || !isValid}
            >
              Sign In
            </button>
          </Form>
        )}
      </Formik>

      <Link className="link link-secondary" href="/signUp">
        New user?
      </Link>
    </div>
  );
};