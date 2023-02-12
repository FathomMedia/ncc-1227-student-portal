import { Formik, Form, Field } from "formik";
import {
  CreateStudentMutationVariables,
  Gender,
  Language,
  SchoolType,
} from "../../src/API";
import * as yup from "yup";
import "yup-phone";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ICreateStudentForm {
  student: CreateStudentMutationVariables;
  password: string;

  submitTitle: string;
  onFormSubmit: (values: {
    student: CreateStudentMutationVariables;
    password: string;
  }) => void;
}

export const CreateStudentForm = (props: ICreateStudentForm) => {
  const { t } = useTranslation("account");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        ...props.student.input,
        password: "",
      }}
      validationSchema={yup.object({
        cpr: yup.string().min(9).max(9).required(),
        fullName: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().phone().required(),
        gender: yup.string().required(),
        schoolName: yup.string().required(),
        schoolType: yup.string().required(),
        specialization: yup.string().required(),
        address: yup.string().required(),
        placeOfBirth: yup.string().required(),
        studentOrderAmongSiblings: yup.number().required(),
        householdIncome: yup.number().required(),
        preferredLanguage: yup.string().required(),
        graduationDate: yup.date().required(),
        password: yup.string().required(),
      })}
      onSubmit={async (values, actions) => {
        // console.log({ values, actions });

        props.onFormSubmit({
          student: {
            input: {
              cpr: values.cpr,
              fullName: values.fullName,
              email: values.email,
              phone: values.phone,
              gender: values.gender,
              schoolName: values.schoolName,
              schoolType: values.schoolType,
              specialization: values.specialization,
              placeOfBirth: values.placeOfBirth,
              studentOrderAmongSiblings: values.studentOrderAmongSiblings,
              householdIncome: values.householdIncome,
              preferredLanguage: values.preferredLanguage,
              graduationDate: values.graduationDate,
              address: values.address,
              parentInfoID: props.student.input.parentInfoID,
              _version: props.student.input._version,
            },
            condition: props.student.condition,
          },
          password: values.password,
        });

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
        <Form className="container grid max-w-3xl grid-cols-1 gap-3 mx-auto md:grid-cols-2">
          {/* CPR */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("studentCPR")}</label>
            <Field
              dir="ltr"
              type="text"
              name="cpr"
              title="cpr"
              placeholder="CPR"
              className={`input input-bordered input-primary ${
                errors.cpr && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cpr ?? ""}
            />
            <label className="label-text-alt text-error">
              {errors.cpr && touched.cpr && errors.cpr}
            </label>
          </div>
          {/* FullName */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("fullName")}</label>
            <Field
              dir="ltr"
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
          </div>
          {/* Email */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("email")}</label>
            <Field
              dir="ltr"
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
          </div>
          {/* Phone */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("phone")}</label>
            <Field
              dir="ltr"
              type="phone"
              name="phone"
              title="phone"
              placeholder="Phone (+973)"
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
          </div>

          {/* Gender */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("gender")}</label>
            <Field
              dir="ltr"
              as="select"
              name="gender"
              title="gender"
              placeholder="Gender"
              className={`input input-bordered input-primary ${
                errors.gender && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
            >
              <option disabled selected value={undefined}>
                Select
              </option>
              <option value={Gender.MALE}>Male</option>
              <option value={Gender.FEMALE}>Female</option>
            </Field>
            <label className="label-text-alt text-error">
              {errors.gender && touched.gender && errors.gender}
            </label>
          </div>

          {/* address */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("studentAddress")}</label>
            <Field
              dir="ltr"
              type="text"
              name="address"
              title="address"
              placeholder="Student Address"
              className={`input input-bordered input-primary ${
                errors.address && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
            />
            <label className="label-text-alt text-error">
              {errors.address && touched.address && errors.address}
            </label>
          </div>

          {/* schoolName */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("schoolName")}</label>
            <Field
              dir="ltr"
              type="text"
              name="schoolName"
              title="schoolName"
              placeholder="School name"
              className={`input input-bordered input-primary ${
                errors.schoolName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.schoolName}
            />
            <label className="label-text-alt text-error">
              {errors.schoolName && touched.schoolName && errors.schoolName}
            </label>
          </div>

          {/* schoolType */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("schoolType")}</label>
            <Field
              dir="ltr"
              as="select"
              name="schoolType"
              title="schoolType"
              placeholder="Preferred Language"
              className={`input input-bordered input-primary ${
                errors.schoolType && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.schoolType}
            >
              <option disabled selected value={undefined}>
                Select
              </option>
              <option value={SchoolType.PRIVATE}>Private</option>
              <option value={SchoolType.PUBLIC}>Public</option>
            </Field>
            <label className="label-text-alt text-error">
              {errors.schoolType && touched.schoolType && errors.schoolType}
            </label>
          </div>

          {/* specialization */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("specialization")}</label>
            <Field
              dir="ltr"
              type="text"
              name="specialization"
              title="specialization"
              placeholder="Specialization"
              className={`input input-bordered input-primary ${
                errors.specialization && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.specialization}
            />
            <label className="label-text-alt text-error">
              {errors.specialization &&
                touched.specialization &&
                errors.specialization}
            </label>
          </div>
          {/* placeOfBirth */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("placeOfBirth")}</label>
            <Field
              dir="ltr"
              type="text"
              name="placeOfBirth"
              title="placeOfBirth"
              placeholder="Place Of Birth"
              className={`input input-bordered input-primary ${
                errors.placeOfBirth && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.placeOfBirth}
            />
            <label className="label-text-alt text-error">
              {errors.placeOfBirth &&
                touched.placeOfBirth &&
                errors.placeOfBirth}
            </label>
          </div>

          {/* Student Order Among Siblings */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("studentOrderAmongSiblings")}</label>
            <Field
              dir="ltr"
              type="number"
              name="studentOrderAmongSiblings"
              title="studentOrderAmongSiblings"
              placeholder="Student Order Among Siblings"
              className={`input input-bordered input-primary ${
                errors.studentOrderAmongSiblings && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.studentOrderAmongSiblings}
            />
            <label className="label-text-alt text-error">
              {errors.studentOrderAmongSiblings &&
                touched.studentOrderAmongSiblings &&
                errors.studentOrderAmongSiblings}
            </label>
          </div>

          {/* Household Income */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("householdIncome")}</label>
            <Field
              dir="ltr"
              type="number"
              name="householdIncome"
              title="householdIncome"
              placeholder="Household Income"
              className={`input input-bordered input-primary ${
                errors.householdIncome && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.householdIncome}
            />
            <label className="label-text-alt text-error">
              {errors.householdIncome &&
                touched.householdIncome &&
                errors.householdIncome}
            </label>
          </div>

          {/* preferredLanguage */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("preferredLanguage")}</label>
            <Field
              dir="ltr"
              as="select"
              name="preferredLanguage"
              title="preferredLanguage"
              placeholder="Preferred Language"
              className={`input input-bordered input-primary ${
                errors.preferredLanguage && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.preferredLanguage}
            >
              <option disabled selected value={undefined}>
                Select
              </option>
              <option value={Language.ARABIC}>العربية</option>
              <option value={Language.ENGLISH}>English</option>
            </Field>
            <label className="label-text-alt text-error">
              {errors.preferredLanguage &&
                touched.preferredLanguage &&
                errors.preferredLanguage}
            </label>
          </div>

          {/* graduationDate */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("graduationDate")}</label>
            <Field
              type="date"
              name="graduationDate"
              title="graduationDate"
              placeholder="Graduation Date"
              className={`input input-bordered input-primary ${
                errors.graduationDate && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.graduationDate}
            />
            <label className="label-text-alt text-error">
              {errors.graduationDate &&
                touched.graduationDate &&
                errors.graduationDate}
            </label>
          </div>

          {/* Password */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("password")}</label>
            <div className="relative w-full">
              <Field
                dir="ltr"
                type={showPassword ? "text" : "password"}
                name="password"
                title="password"
                placeholder="Password"
                className={`input w-full input-bordered input-primary ${
                  errors.password && "input-error"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm leading-5 hover:cursor-pointer"
              >
                <svg
                  className={`h-6  text-gray-700 ${
                    showPassword ? "hidden" : "block"
                  } `}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                  ></path>
                </svg>

                <svg
                  className={`h-6  text-gray-700 ${
                    showPassword ? "block" : "hidden"
                  }`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                  ></path>
                </svg>
              </div>
            </div>
            <label className="label-text-alt text-error">
              {errors.password && touched.password && errors.password}
            </label>
          </div>

          {/* Submit */}
          <button
            className="my-3 text-white md:col-span-2 btn btn-primary"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {props.submitTitle}
          </button>
        </Form>
      )}
    </Formik>
  );
};
