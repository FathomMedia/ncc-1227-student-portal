import React from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import "yup-phone";

import { ParentInfo, UpdateParentInfoMutationVariables } from "../../src/API";
import { updateParentInfoInDB } from "../../src/CustomAPI";
import { useAppContext } from "../../contexts/AppContexts";
import toast from "react-hot-toast";

interface FormValues {
  guardianFullName: string | null | undefined;
  relation: string | null | undefined;
  guardianCPR: string | null | undefined;
  primaryMobile: string | null | undefined;
  secondaryMobile: string | null | undefined;
  fatherFullName: string | null | undefined;
  fatherCPR: string | null | undefined;
  motherFullName: string | null | undefined;
  motherCPR: string | null | undefined;
  numberOfFamilyMembers: number | null | undefined;
  address: string | null | undefined;
}

interface Props {
  parentInfo: ParentInfo;
}

export default function ViewParentInfo({ parentInfo }: Props) {
  const { syncStudent } = useAppContext();

  let initialValues: FormValues = {
    guardianFullName: parentInfo.guardianFullName,
    relation: parentInfo.relation,
    guardianCPR: parentInfo.guardianCPR,
    primaryMobile: parentInfo.primaryMobile,
    secondaryMobile: parentInfo.secondaryMobile,
    fatherFullName: parentInfo.fatherFullName,
    fatherCPR: parentInfo.fatherCPR,
    motherFullName: parentInfo.motherFullName,
    motherCPR: parentInfo.motherCPR,
    numberOfFamilyMembers: parentInfo.numberOfFamilyMembers,
    address: parentInfo.address,
  };

  async function updateProcess(inputs: UpdateParentInfoMutationVariables) {
    return await updateParentInfoInDB(inputs).then(async (value) => {
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
        guardianFullName: yup.string().required(),
        relation: yup.string().required(),
        guardianCPR: yup.string().required(),
        address: yup.string().required(),

        primaryMobile: yup.string().phone().required(),
        secondaryMobile: yup.string().phone().required(),

        fatherFullName: yup.string().required(),
        fatherCPR: yup.string().required(),

        motherFullName: yup.string().required(),
        motherCPR: yup.string().required(),

        numberOfFamilyMembers: yup.number().required(),
      })}
      onSubmit={async (values, actions) => {
        let updateVars: UpdateParentInfoMutationVariables = {
          input: {
            id: parentInfo.id,
            guardianFullName: values.guardianFullName,
            relation: values.relation,
            guardianCPR: values.guardianCPR,
            primaryMobile: values.primaryMobile,
            secondaryMobile: values.secondaryMobile,
            fatherFullName: values.fatherFullName,
            fatherCPR: values.fatherCPR,
            motherFullName: values.motherFullName,
            motherCPR: values.motherCPR,
            numberOfFamilyMembers: values.numberOfFamilyMembers,
            address: values.address,
            _version: parentInfo._version,
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
          {/* guardianFullName */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Guardian Full Name</label>
            <Field
              type="text"
              name="guardianFullName"
              title="guardianFullName"
              placeholder="Guardian Full Name"
              className={`input input-bordered input-primary ${
                errors.guardianFullName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guardianFullName ?? ""}
            />
            <label className="label-text-alt text-error">
              {errors.guardianFullName &&
                touched.guardianFullName &&
                errors.guardianFullName}
            </label>
          </div>

          {/* relation */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Relation</label>
            <Field
              type="text"
              name="relation"
              title="relation"
              placeholder="Relation"
              className={`input input-bordered input-primary ${
                errors.relation && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.relation}
            />
            <label className="label-text-alt text-error">
              {errors.relation && touched.relation && errors.relation}
            </label>
          </div>

          {/* Guardian CPR */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Guardian CPR</label>
            <Field
              type="text"
              name="guardianCPR"
              title="guardianCPR"
              placeholder="Guardian CPR"
              className={`input input-bordered input-primary ${
                errors.guardianCPR && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guardianCPR}
            />
            <label className="label-text-alt text-error">
              {errors.guardianCPR && touched.guardianCPR && errors.guardianCPR}
            </label>
          </div>

          {/* Address */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Address</label>
            <Field
              type="text"
              name="address"
              title="address"
              placeholder="Address"
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

          <div className="divider md:col-span-2"></div>

          {/* primaryMobile */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Primary Mobile</label>
            <Field
              type="phone"
              name="primaryMobile"
              title="primaryMobile"
              placeholder="Primary Mobile (+973)"
              className={`input input-bordered input-primary ${
                errors.primaryMobile && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.primaryMobile}
            />
            <label className="label-text-alt text-error">
              {errors.primaryMobile &&
                touched.primaryMobile &&
                errors.primaryMobile}
            </label>
          </div>

          {/* secondaryMobile */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Secondary Mobile</label>
            <Field
              type="phone"
              name="secondaryMobile"
              title="secondaryMobile"
              placeholder="Primary Mobile (+973)"
              className={`input input-bordered input-primary ${
                errors.secondaryMobile && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.secondaryMobile}
            />
            <label className="label-text-alt text-error">
              {errors.secondaryMobile &&
                touched.secondaryMobile &&
                errors.secondaryMobile}
            </label>
          </div>

          {/* Number Of Family Members */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Number Of Family Members</label>
            <Field
              type="text"
              name="numberOfFamilyMembers"
              title="numberOfFamilyMembers"
              placeholder="Number Of Family Members"
              className={`input input-bordered input-primary ${
                errors.numberOfFamilyMembers && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.numberOfFamilyMembers}
            />
            <label className="label-text-alt text-error">
              {errors.numberOfFamilyMembers &&
                touched.numberOfFamilyMembers &&
                errors.numberOfFamilyMembers}
            </label>
          </div>

          <div className="divider md:col-span-2"></div>

          {/* Father Full Name */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Father Full Name</label>
            <Field
              type="text"
              name="fatherFullName"
              title="fatherFullName"
              placeholder="Father Full Name"
              className={`input input-bordered input-primary ${
                errors.fatherFullName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fatherFullName}
            />
            <label className="label-text-alt text-error">
              {errors.fatherFullName &&
                touched.fatherFullName &&
                errors.fatherFullName}
            </label>
          </div>

          {/* Father CPR */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Father CPR</label>
            <Field
              type="text"
              name="fatherCPR"
              title="fatherCPR"
              placeholder="Father CPR"
              className={`input input-bordered input-primary ${
                errors.fatherCPR && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fatherCPR}
            />
            <label className="label-text-alt text-error">
              {errors.fatherCPR && touched.fatherCPR && errors.fatherCPR}
            </label>
          </div>

          <div className="md:col-span-2 divider"></div>

          {/* Mother Full Name */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Mother Full Name</label>
            <Field
              type="text"
              name="motherFullName"
              title="motherFullName"
              placeholder="Mother Full Name"
              className={`input input-bordered input-primary ${
                errors.motherFullName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.motherFullName}
            />
            <label className="label-text-alt text-error">
              {errors.motherFullName &&
                touched.motherFullName &&
                errors.motherFullName}
            </label>
          </div>

          {/* Mother CPR */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">Mother CPR</label>
            <Field
              type="text"
              name="motherCPR"
              title="motherCPR"
              placeholder="Mother CPR"
              className={`input input-bordered input-primary ${
                errors.motherCPR && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.motherCPR}
            />
            <label className="label-text-alt text-error">
              {errors.motherCPR && touched.motherCPR && errors.motherCPR}
            </label>
          </div>

          {/* Submit */}
          <button
            className={`my-3 text-white btn btn-primary md:col-span-2 ${
              isSubmitting && "loading"
            }`}
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Update
          </button>
        </Form>
      )}
    </Formik>
  );
}
