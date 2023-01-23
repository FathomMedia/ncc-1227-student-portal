import { Formik, Form, Field } from "formik";
import {
  CreateStudentMutationVariables,
  Gender,
  Language,
} from "../../src/API";
import * as yup from "yup";
import "yup-phone";
import { useTranslation } from "react-i18next";

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

          {/* specialization */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("specialization")}</label>
            <Field
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
