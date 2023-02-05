import {
  Gender,
  Language,
  Student,
  UpdateStudentMutationVariables,
} from "../../src/API";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import "yup-phone";
import { updateStudentInDB } from "../../src/CustomAPI";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../contexts/AppContexts";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

interface Props {
  student: Student;
}

interface FormValues {
  phone: string | null | undefined;
  gender: Gender | null | undefined;
  schoolName: string | null | undefined;
  specialization: string | null | undefined;
  placeOfBirth: string | null | undefined;
  studentOrderAmongSiblings: number | null | undefined;
  householdIncome: number | null | undefined;
  preferredLanguage: Language | null | undefined;
  graduationDate: string | null | undefined;
  address: string | null | undefined;
}

export default function ViewApplication({ student }: Props) {
  const { syncStudent } = useAppContext();
  const { t } = useTranslation("account");

  let initialValues: FormValues = {
    phone: student.phone,
    gender: student.gender,
    schoolName: student.schoolName,
    specialization: student.specialization,
    placeOfBirth: student.placeOfBirth,
    studentOrderAmongSiblings: student.studentOrderAmongSiblings,
    householdIncome: student.householdIncome,
    preferredLanguage: student.preferredLanguage,
    graduationDate: student.graduationDate,
    address: student.address,
  };

  async function updateProcess(inputs: UpdateStudentMutationVariables) {
    return await updateStudentInDB(inputs).then(async (value) => {
      if (value === undefined) {
        throw new Error("Failed to update");
      }
      await syncStudent();

      return value;
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object({
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
      })}
      onSubmit={async (values, actions) => {
        // console.log({ values, actions });

        let updateVars: UpdateStudentMutationVariables = {
          input: {
            cpr: student.cpr,
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
            _version: student._version,
          },
        };

        await toast.promise(updateProcess(updateVars), {
          loading: "Updating...",
          success: "Updated successfully",
          error: (err) => {
            return `${err.message}`;
          },
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
              className={`input input-bordered input-primary `}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled
              value={student.cpr ?? ""}
            />
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
              className={`input input-bordered input-primary`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={student.email}
              disabled
            />
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
              className={`input input-bordered input-primary`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={student.fullName}
              disabled
            />
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
              <option value={Language.ARABIC}>Arabic</option>
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
              dir="ltr"
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

          {/* Submit */}
          <button
            className="my-3 text-white md:col-span-2 btn btn-primary"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {t("update")}
          </button>
        </Form>
      )}
    </Formik>
  );
}
