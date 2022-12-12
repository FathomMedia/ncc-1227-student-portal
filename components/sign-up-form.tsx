import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "yup-phone";
import React from "react";
import { API, Auth } from "aws-amplify";

import * as mutations from "../src/graphql/mutations";

import {
  CreateStudentMutation,
  DeleteAddressMutationVariables,
  DeleteStudentMutation,
} from "../src/API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { SignUpParams } from "@aws-amplify/auth";
import { ISignUpResult } from "amazon-cognito-identity-js";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/router";

export interface CreateStudentFormValues {
  cpr: string;
  email: string;
  phone: string;
  fullName: string;
  password: string;
}

export default function SignUpForm() {
  const auth = useAuth();

  const router = useRouter();

  const initialValues: CreateStudentFormValues = {
    cpr: "",
    email: "",
    phone: "",
    fullName: "",
    password: "",
  };

  async function createDatabaseStudent(
    values: CreateStudentFormValues
  ): Promise<GraphQLResult<CreateStudentMutation> | null> {
    try {
      const res: GraphQLResult<CreateStudentMutation> = (await API.graphql({
        query: mutations.createStudent,
        variables: {
          input: {
            cpr: values.cpr,
            email: values.email,
            fullName: values.fullName,
            phone: values.phone,
          },
        },
      })) as GraphQLResult<CreateStudentMutation>;

      return res;
    } catch (error) {
      console.log("createDatabaseStudent => error", error);
      return null;
    }
  }

  async function createCognitoUser(
    values: CreateStudentFormValues
  ): Promise<ISignUpResult | null> {
    try {
      const signUpPrams: SignUpParams = {
        username: values.cpr,
        password: values.password,
        attributes: {
          email: values.email,
          phone_number: values.phone,
        },
      };
      const signUpResult = await Auth.signUp(signUpPrams);

      return signUpResult;
    } catch (error) {
      console.log("createCognitoUser => error", error);
      return null;
    }
  }

  async function deleteCreatedUser(createdDatabaseUser: CreateStudentMutation) {
    let mutationInputs: DeleteAddressMutationVariables = {
      input: {
        id: `${createdDatabaseUser.createStudent?.id}`,
        _version: createdDatabaseUser.createStudent?._version,
      },
    };

    try {
      let res = (await API.graphql({
        query: mutations.deleteStudent,
        variables: mutationInputs,
      })) as GraphQLResult<DeleteStudentMutation>;

      return res;
    } catch (error) {
      console.log("SignUpForm => deleteCreatedUser => error", error);
      return null;
    }
  }

  return (
    <div>
      {
        <Formik
          initialValues={initialValues}
          validationSchema={yup.object({
            cpr: yup.string().min(9).required(),
            email: yup.string().email().required(),
            phone: yup.string().phone().required(),
            fullName: yup.string().required(),
            password: yup.string().required(),
          })}
          onSubmit={async (values, actions) => {
            console.log({ values, actions });

            let userAlreadyExists = await auth.checkIfCprExist(
              values.cpr.trim()
            );

            if (userAlreadyExists) {
              toast.error("User already exists");
              return;
            }

            const createdDatabaseUser = await createDatabaseStudent(values);
            if (createdDatabaseUser?.data == null) {
              toast.error("Error creating the user");
              return;
            }

            const createCognitoUserResult = await createCognitoUser(values);

            if (createCognitoUserResult?.user) {
              router.push({ pathname: "/signUp", query: { cpr: values.cpr } });
              toast("email need to be verified");
            } else {
              toast.error("Error creating the user");
              await deleteCreatedUser(createdDatabaseUser.data);
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
            <Form className="container flex flex-col mx-auto">
              {/* CPR */}
              <label className="label">CPR</label>
              <Field
                type="text"
                name="cpr"
                title="cpr"
                placeholder="CPR"
                className={`input input-bordered input-primary ${
                  errors.cpr && "input-error"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cpr}
              />
              <label className="label-text-alt text-error">
                {errors.cpr && touched.cpr && errors.cpr}
              </label>
              {/* Email */}
              <label className="label">Email</label>
              <Field
                type="email"
                name="email"
                title="email"
                placeholder="Email"
                className={`input input-bordered input-primary ${
                  errors.email && "input-error"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <label className="label-text-alt text-error">
                {errors.email && touched.email && errors.email}
              </label>
              {/* Phone */}
              <label className="label">Phone</label>
              <Field
                type="phone"
                name="phone"
                title="phone"
                placeholder="Phone"
                className={`input input-bordered input-primary ${
                  errors.phone && "input-error"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              <label className="label-text-alt text-error">
                {errors.phone && touched.phone && errors.phone}
              </label>
              {/* FullName */}
              <label className="label">Full name</label>
              <Field
                type="text"
                name="fullName"
                title="fullName"
                placeholder="Full name"
                className={`input input-bordered input-primary ${
                  errors.fullName && "input-error"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
              />
              <label className="label-text-alt text-error">
                {errors.fullName && touched.fullName && errors.fullName}
              </label>

              {/* Full name */}
              <label className="label">Password</label>
              <Field
                type="password"
                name="password"
                title="password"
                placeholder="Password"
                className={`input input-bordered input-primary ${
                  errors.password && "input-error"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <label className="label-text-alt text-error">
                {errors.password && touched.password && errors.password}
              </label>

              {/* Submit */}
              <button
                className="my-3 text-white btn btn-primary"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      }
    </div>
  );
}
