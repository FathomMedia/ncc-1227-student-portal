import {
  FamilyIncome,
  Gender,
  Language,
  SchoolType,
  Student,
  UpdateStudentMutationVariables,
} from "../../src/API";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import "yup-phone";
import { updateStudentInDB, uploadFile, DocType } from "../../src/CustomAPI";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../contexts/AppContexts";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import MultiUpload from "../MultiUpload";

interface Props {
  student: Student;
}

interface FormValues {
  phone: string | null | undefined;
  gender: Gender | null | undefined;
  schoolName: string | null | undefined;
  schoolType: SchoolType | null | undefined;
  specialization: string | null | undefined;
  placeOfBirth: string | null | undefined;

  familyIncome: FamilyIncome | null | undefined;
  familyIncomeProofDocs: (string | null)[] | null | undefined;
  familyIncomeProofDocsFile: File[];

  nationality: string | null | undefined;
  studentOrderAmongSiblings: number | null | undefined;
  preferredLanguage: Language | null | undefined;
  graduationDate: string | null | undefined;
  address: string | null | undefined;
}

export default function ViewApplication({ student }: Props) {
  const { syncStudent } = useAppContext();
  const { t } = useTranslation("account");
  const { t: tErrors } = useTranslation("errors");

  const [familyIncomeProofDocsFile, setFamilyIncomeProofDocsFile] = useState<
    File[]
  >([]);
  const [familyIncomeProofInvalid, setFamilyIncomeProofInvalid] =
    useState<boolean>(false);

  let initialValues: FormValues = {
    phone: student.phone,
    gender: student.gender,
    schoolName: student.schoolName,
    schoolType: student.schoolType,
    specialization: student.specialization,
    placeOfBirth: student.placeOfBirth,
    familyIncome: student.familyIncome,
    familyIncomeProofDocs: student.familyIncomeProofDocs ?? [],
    familyIncomeProofDocsFile: [],
    nationality: student.nationality,
    studentOrderAmongSiblings: student.studentOrderAmongSiblings,
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
        phone: yup
          .string()
          .phone()
          .required(`${tErrors("requiredField")}`),
        gender: yup.string().required(`${tErrors("requiredField")}`),
        schoolName: yup.string().required(`${tErrors("requiredField")}`),
        schoolType: yup.string().required(`${tErrors("requiredField")}`),
        specialization: yup.string().required(`${tErrors("requiredField")}`),
        address: yup.string().required(`${tErrors("requiredField")}`),
        placeOfBirth: yup.string().required(`${tErrors("requiredField")}`),
        familyIncome: yup.string().required(`${tErrors("requiredField")}`),
        familyIncomeProofDocs: yup.array(yup.string()),
        familyIncomeProofDocsFile: yup.array(yup.string()),
        nationality: yup.string().required(`${tErrors("requiredField")}`),
        studentOrderAmongSiblings: yup
          .number()
          .required(`${tErrors("requiredField")}`),
        preferredLanguage: yup.string().required(`${tErrors("requiredField")}`),
        graduationDate: yup.date().required(`${tErrors("requiredField")}`),
      })}
      onSubmit={async (values, actions) => {
        const storageKeys =
          familyIncomeProofDocsFile.length > 0
            ? await toast.promise(
                Promise.all([
                  ...familyIncomeProofDocsFile.map((f, index) =>
                    uploadFile(
                      f,
                      DocType.FAMILY_INCOME_PROOF,
                      student.cpr,
                      index
                    )
                  ),
                ]),
                {
                  loading: "Uploading...",
                  success: "Document uploaded successfully",
                  error: (err) => {
                    return `${err.message}`;
                  },
                }
              )
            : student.familyIncomeProofDocs;

        let updateVars: UpdateStudentMutationVariables = {
          input: {
            cpr: student.cpr,
            phone: values.phone,
            gender: values.gender,
            schoolName: values.schoolName,
            schoolType: values.schoolType,
            specialization: values.specialization,
            placeOfBirth: values.placeOfBirth,
            nationality: values.nationality,
            studentOrderAmongSiblings: values.studentOrderAmongSiblings,
            familyIncome: values.familyIncome,
            familyIncomeProofDocs: storageKeys,
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

          {/* nationality */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("nationality")}</label>
            <Field
              dir="ltr"
              type="text"
              name="nationality"
              title="nationality"
              placeholder="nationality"
              className={`input input-bordered input-primary ${
                errors.nationality && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nationality}
            />
            <label className="label-text-alt text-error">
              {errors.nationality && touched.nationality && errors.nationality}
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

          {/* familyIncome */}
          <div className="flex flex-col justify-start w-full md:col-span-2">
            <label className="label">{t("familyIncome")}</label>
            <Field
              dir="ltr"
              as="select"
              name="familyIncome"
              title="familyIncome"
              placeholder="Preferred Language"
              className={`input input-bordered input-primary ${
                errors.familyIncome && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.familyIncome}
            >
              <option disabled selected value={undefined}>
                Select
              </option>

              <option value={FamilyIncome.LESS_THAN_500}>Less than 500</option>
              <option value={FamilyIncome.BETWEEN_500_AND_700}>500-700</option>
              <option value={FamilyIncome.BETWEEN_700_AND_1000}>
                700-1000
              </option>
              <option value={FamilyIncome.OVER_1000}>More than 1000</option>
            </Field>
            <label className="label-text-alt text-error">
              {errors.familyIncome &&
                touched.familyIncome &&
                errors.familyIncome}
            </label>
          </div>
          {/* Family income proof */}
          <div className="justify-start md:col-span-2">
            <MultiUpload
              onFiles={(files) => {
                setFamilyIncomeProofDocsFile(files);
              }}
              isInvalid={setFamilyIncomeProofInvalid}
              handleChange={(event) => {
                handleChange(event);
              }}
              handleOnClear={() => {
                setFamilyIncomeProofDocsFile([]);
              }}
              value={values.familyIncomeProofDocsFile ?? ""}
              filedName={"familyIncomeProofDocsFile"}
              title={`${t("familyIncomeProof")} ${t("document")}`}
              storageKeys={student.familyIncomeProofDocs}
            ></MultiUpload>
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
            disabled={
              isSubmitting ||
              !isValid ||
              familyIncomeProofInvalid ||
              (familyIncomeProofDocsFile.length === 0 &&
                (student.familyIncomeProofDocs ?? []).length === 0)
            }
          >
            {t("update")}
          </button>
        </Form>
      )}
    </Formik>
  );
}
