import { Formik, Form, Field } from "formik";
import { FC, useState } from "react";
import * as yup from "yup";
import { useAppContext } from "../../contexts/AppContexts";
import { useAuth } from "../../hooks/use-auth";

import {
  Application,
  CreateApplicationMutationVariables,
  CreateAttachmentMutationVariables,
  CreateProgramChoiceMutationVariables,
  CreateStudentLogMutationVariables,
  Program,
  UpdateApplicationMutationVariables,
  UpdateAttachmentMutationVariables,
  UpdateProgramChoiceMutationVariables,
} from "../../src/API";
import { Status } from "../../src/models";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import Link from "next/link";
import {
  createAttachmentInDB,
  createApplicationInDB,
  createProgramChoiceInDB,
  updateAttachmentInDB,
  updateApplicationInDB,
  updateProgramChoiceInDB,
  createStudentLogInDB,
  DocType,
  uploadFile,
  DownloadLinks,
} from "../../src/CustomAPI";
import { checkIfFilesAreTooBig } from "../../src/HelperFunctions";

export interface CreateApplicationFormValues {
  application: CreateApplicationMutationVariables;
  primaryProgram: CreateProgramChoiceMutationVariables;
  secondaryProgram: CreateProgramChoiceMutationVariables;
  attachment: CreateAttachmentMutationVariables;
}
export interface UpdateApplicationFormValues {
  application: UpdateApplicationMutationVariables;
  primaryProgram: UpdateProgramChoiceMutationVariables;
  secondaryProgram: UpdateProgramChoiceMutationVariables;
  attachment: UpdateAttachmentMutationVariables;
  studentLog: CreateStudentLogMutationVariables;
}

interface FormValues {
  gpa: number | undefined;
  primaryProgramID: string | undefined;
  secondaryProgramID: string | undefined;
  cprDoc: File | undefined;
  acceptanceLetterDoc: File | undefined;
  transcriptDoc: File | undefined;
  signedContractDoc: File | undefined;
  reasonForUpdate?: string | undefined;
}

interface Props {
  application?: Application;
  programs?: Program[];
  downloadLinks?: DownloadLinks;
}

export const ApplicationForm: FC<Props> = (props) => {
  const { user } = useAuth();
  const { push } = useRouter();
  const { student, syncStudentApplication } = useAppContext();

  const [cprDoc, setCprDoc] = useState<File | undefined>(undefined);
  const [acceptanceLetterDoc, setAcceptanceLetterDoc] = useState<
    File | undefined
  >(undefined);
  const [transcriptDoc, setTranscriptDoc] = useState<File | undefined>(
    undefined
  );
  const [signedContractDoc, setSignedContractDoc] = useState<File | undefined>(
    undefined
  );

  const [withdrawing, setWithdrawing] = useState(false);

  const initialValues: FormValues = {
    gpa: props.application?.gpa ?? undefined,
    primaryProgramID:
      props.application?.programs?.items.sort(
        (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
      )[0]?.program?.id ?? undefined,
    secondaryProgramID:
      props.application?.programs?.items.sort(
        (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
      )[1]?.program?.id ?? undefined,
    cprDoc: undefined,
    acceptanceLetterDoc: undefined,
    transcriptDoc: undefined,
    signedContractDoc: undefined,
    reasonForUpdate: undefined,
  };

  async function withdrawApplication(application: Application) {
    let tempApplicationVar: UpdateApplicationMutationVariables = {
      input: {
        id: application.id,
        status: Status.WITHDRAWN,
        _version: application._version,
      },
    };
    setWithdrawing(true);
    let res = await updateApplicationInDB(tempApplicationVar);
    if (res === undefined) {
      throw new Error("Failed to withdraw");
    }
    await syncStudentApplication();
    setWithdrawing(false);
    push("/applications/");
    return res;
  }

  /**
   * It creates an attachment in the database, then creates an application in the database, then
   * creates two program choices in the database
   * @param {CreateApplicationFormValues} data - CreateApplicationFormValues
   * @returns a promise that resolves to an array of two promises.
   */
  async function createApplicationProcess(data: CreateApplicationFormValues) {
    let createdAttachmentInDB = await createAttachmentInDB(data.attachment);

    if (createdAttachmentInDB === undefined) {
      toast.error("Failed to create application");
      return;
    }

    let tempApplicationVar: CreateApplicationMutationVariables = {
      input: {
        id: undefined,
        gpa: data.application.input.gpa,
        status: data.application.input.status,
        studentCPR: data.application.input.studentCPR,
        attachmentID: createdAttachmentInDB.createAttachment?.id,
        applicationAttachmentId: createdAttachmentInDB.createAttachment?.id,
        _version: undefined,
      },
    };

    let createdApplicationInDB = await createApplicationInDB(
      tempApplicationVar
    );

    if (createdApplicationInDB === undefined) {
      toast.error("Failed to create application");
      return;
    }

    let tempPrimaryProgramChoice: CreateProgramChoiceMutationVariables = {
      input: {
        id: undefined,
        _version: undefined,
        choiceOrder: data.primaryProgram.input.choiceOrder,
        programID: data.primaryProgram.input.programID ?? "",
        programApplicationsId: data.primaryProgram.input.programID,
        applicationID: createdApplicationInDB.createApplication?.id ?? "",
        applicationProgramsId: createdApplicationInDB.createApplication?.id,
      },
    };

    let tempSecondaryProgramChoice: CreateProgramChoiceMutationVariables = {
      input: {
        id: undefined,
        _version: undefined,
        choiceOrder: data.secondaryProgram.input.choiceOrder,
        programID: data.secondaryProgram.input.programID ?? "",
        programApplicationsId: data.secondaryProgram.input.programID,
        applicationID: createdApplicationInDB.createApplication?.id ?? "",
        applicationProgramsId: createdApplicationInDB.createApplication?.id,
      },
    };

    await Promise.all([
      createProgramChoiceInDB(tempPrimaryProgramChoice),
      createProgramChoiceInDB(tempSecondaryProgramChoice),
    ])
      .then(async (res) => {
        console.log("Create program choice res", res);
        await syncStudentApplication();
        push("/applications");
      })
      .catch((err) => {
        console.log("Create program choice error", err);
        toast.error("Something went wrong");
      });
  }

  async function updateApplicationProcess(data: UpdateApplicationFormValues) {
    let updatedAttachmentInDB = await updateAttachmentInDB(data.attachment);

    if (updatedAttachmentInDB === undefined) {
      toast.error("Failed to update application");
      return;
    }

    let tempApplicationVar: UpdateApplicationMutationVariables = {
      input: {
        id: data.application.input.id,
        gpa: data.application.input.gpa,
        status: data.application.input.status,
        studentCPR: data.application.input.studentCPR,
        attachmentID: data.application.input.attachmentID,
        applicationAttachmentId: data.application.input.applicationAttachmentId,
        _version: data.application.input._version,
      },
    };

    let updatedApplicationInDB = await updateApplicationInDB(
      tempApplicationVar
    );

    if (updatedApplicationInDB === undefined) {
      toast.error("Failed to update application");
      return;
    }

    let tempPrimaryProgramChoice: UpdateProgramChoiceMutationVariables = {
      input: {
        id: data.primaryProgram.input.id,
        _version: data.primaryProgram.input._version,
        choiceOrder: data.primaryProgram.input.choiceOrder,
        programID: data.primaryProgram.input.programID,
        programApplicationsId: data.primaryProgram.input.programApplicationsId,
        applicationID: data.primaryProgram.input.applicationID,
        applicationProgramsId: data.primaryProgram.input.applicationProgramsId,
      },
    };

    let tempSecondaryProgramChoice: UpdateProgramChoiceMutationVariables = {
      input: {
        id: data.secondaryProgram.input.id,
        _version: data.secondaryProgram.input._version,
        choiceOrder: data.secondaryProgram.input.choiceOrder,
        programID: data.secondaryProgram.input.programID,
        programApplicationsId:
          data.secondaryProgram.input.programApplicationsId,
        applicationID: data.secondaryProgram.input.applicationID,
        applicationProgramsId:
          data.secondaryProgram.input.applicationProgramsId,
      },
    };

    await Promise.all([
      updateProgramChoiceInDB(tempPrimaryProgramChoice),
      updateProgramChoiceInDB(tempSecondaryProgramChoice),
      createStudentLogInDB(data.studentLog),
    ])
      .then(async (res) => {
        console.log("Update program choice res", res);
        await syncStudentApplication();
        push("/applications");
      })
      .catch((err) => {
        console.log("Update program choice error", err);
        toast.error("Something went wrong");
      });
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={
          props.application
            ? yup.object({
                gpa: yup.number().min(70).max(100).required(),
                primaryProgramID: yup.string().required(),
                secondaryProgramID: yup.string().required(),
                // cprDoc: yup.mixed(),
                // acceptanceLetterDoc: yup.mixed(),
                // transcriptDoc: yup.mixed(),
                reasonForUpdate: yup.string().required(),
              })
            : yup.object({
                gpa: yup.number().min(70).max(100).required(),
                primaryProgramID: yup.string().required(),
                secondaryProgramID: yup.string().required(),
                cprDoc: yup.mixed().required(),
                acceptanceLetterDoc: yup.mixed().required(),
                transcriptDoc: yup.mixed().required(),
              })
        }
        onSubmit={async (values, actions) => {
          console.log({ values, actions });

          let storageKeys = await toast.promise(
            Promise.all([
              cprDoc &&
                uploadFile(cprDoc, DocType.CPR, `${student?.getStudent?.cpr}`),
              acceptanceLetterDoc &&
                uploadFile(
                  acceptanceLetterDoc,
                  DocType.ACCEPTANCE,
                  `${student?.getStudent?.cpr}`
                ),
              transcriptDoc &&
                uploadFile(
                  transcriptDoc,
                  DocType.TRANSCRIPT,
                  `${student?.getStudent?.cpr}`
                ),
              signedContractDoc &&
                uploadFile(
                  signedContractDoc,
                  DocType.SIGNED_CONTRACT,
                  `${student?.getStudent?.cpr}`
                ),
            ])
              .then((res) => {
                console.log("Promise all values", res);
                return res;
              })
              .catch((error) => {
                console.log("Upload error", error);
                throw error;
              }),
            {
              loading: "Uploading documents...",
              success: "Documents uploaded successfully",
              error: "Uploading documents failed",
            }
          );

          const createValues: CreateApplicationFormValues = {
            application: {
              input: {
                id: undefined,
                gpa: values.gpa,
                status: Status.REVIEW,
                studentCPR: `${student?.getStudent?.cpr}`,
                _version: null,
                attachmentID: null,
                applicationAttachmentId: null,
              },
              condition: undefined,
            },
            primaryProgram: {
              input: {
                id: undefined,
                applicationID: "",
                choiceOrder: 1,
                _version: undefined,
                programID: values.primaryProgramID ?? "",
                applicationProgramsId: values.primaryProgramID ?? "",
                programApplicationsId: undefined,
              },
              condition: undefined,
            },
            secondaryProgram: {
              input: {
                id: undefined,
                _version: undefined,
                choiceOrder: 2,
                programID: values.secondaryProgramID ?? "",
                applicationProgramsId: values.secondaryProgramID ?? "",
                applicationID: "",
                programApplicationsId: undefined,
              },
              condition: undefined,
            },
            attachment: {
              input: {
                id: undefined,
                cprDoc: storageKeys?.[0],
                acceptanceLetterDoc: storageKeys?.[1],
                transcriptDoc: storageKeys?.[2],
                signedContractDoc: storageKeys?.[3],
                _version: undefined,
              },
              condition: undefined,
            },
          };

          let updateValues: UpdateApplicationFormValues = {
            application: {
              input: {
                id: props.application?.id ?? "",
                gpa: values.gpa,
                status: props.application?.status,
                studentCPR: `${student?.getStudent?.cpr}`,
                _version: props.application?._version,
                attachmentID: props.application?.attachmentID,
                applicationAttachmentId:
                  props.application?.applicationAttachmentId,
              },
              condition: undefined,
            },
            primaryProgram: {
              input: {
                id:
                  props.application?.programs?.items.sort(
                    (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                  )[0]?.id ?? "",
                applicationID: props.application?.id ?? "",
                choiceOrder: 1,
                _version: props.application?.programs?.items.sort(
                  (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                )[0]?._version,
                programID: values.primaryProgramID ?? "",
                applicationProgramsId: props.application?.id ?? "",
                programApplicationsId: values.primaryProgramID ?? "",
              },
              condition: undefined,
            },
            secondaryProgram: {
              input: {
                id:
                  props.application?.programs?.items.sort(
                    (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                  )[1]?.id ?? "",
                _version: props.application?.programs?.items.sort(
                  (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                )[1]?._version,
                choiceOrder: 2,
                programID: values.secondaryProgramID ?? "",
                applicationProgramsId: props.application?.id ?? "",
                applicationID: props.application?.id ?? "",
                programApplicationsId: values.secondaryProgramID ?? "",
              },
              condition: undefined,
            },
            attachment: {
              input: {
                id: props.application?.attachment?.id ?? "",
                cprDoc:
                  storageKeys?.[0] ?? props.application?.attachment?.cprDoc,
                acceptanceLetterDoc:
                  storageKeys?.[1] ??
                  props.application?.attachment?.acceptanceLetterDoc,
                transcriptDoc:
                  storageKeys?.[2] ??
                  props.application?.attachment?.transcriptDoc,
                signedContractDoc:
                  storageKeys?.[3] ??
                  props.application?.attachment?.signedContractDoc,
                _version: props.application?.attachment?._version,
              },
              condition: undefined,
            },
            studentLog: {
              input: {
                id: undefined,
                applicationID: props.application?.id ?? "",
                studentCPR: user?.getUsername() ?? "",
                dateTime: new Date().toISOString(),
                snapshot: JSON.stringify(props.application),
                reason: values.reasonForUpdate,
                _version: undefined,
                applicationStudentLogsId: props.application?.id ?? "",
              },
              condition: undefined,
            },
          };

          {
            props.application
              ? await toast.promise(updateApplicationProcess(updateValues), {
                  loading: "Updating application...",
                  success: "Application updated successfully",
                  error: "Application update failed",
                })
              : await toast.promise(createApplicationProcess(createValues), {
                  loading: "Creating application...",
                  success: "Application created successfully",
                  error: "Application creation failed",
                });
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
          setFieldError,
        }) => (
          <Form className="container grid max-w-3xl grid-cols-1 gap-3 mx-auto md:grid-cols-2">
            {/* FullName */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">Full Name</label>
              <Field
                type="text"
                name="fullName"
                title="fullName"
                placeholder="Full name"
                className={`input input-bordered input-primary`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={student?.getStudent?.fullName}
                disabled
              />
            </div>
            {/* CPR */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">CPR</label>
              <Field
                type="text"
                name="cpr"
                title="cpr"
                placeholder="CPR"
                className={`input input-bordered input-primary`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={user?.getUsername()}
                disabled
              />
            </div>
            <div className="divider md:col-span-2"></div>
            {/* GPA */}
            <div className="flex flex-col justify-start w-full md:col-span-2">
              <label className="label">Student GPA</label>
              <Field
                type="number"
                name="gpa"
                title="gpa"
                placeholder="GPA (70 - 100)"
                className={`input input-bordered input-primary ${
                  errors.gpa && "input-error"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gpa ?? ""}
              />
              <label className="label-text-alt text-error">
                {errors.gpa && touched.gpa && errors.gpa}
              </label>
            </div>
            {/* Primary Program */}
            {
              <div className="flex flex-col justify-start w-full">
                <label className="label">Primary Program</label>
                <Field
                  as="select"
                  name="primaryProgramID"
                  title="primaryProgramID"
                  placeholder="Primary Program"
                  className={`input input-bordered input-primary ${
                    errors.primaryProgramID && "input-error"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.primaryProgramID}
                >
                  <option
                    selected={props.application === undefined}
                    disabled
                    value={undefined}
                  >
                    Select
                  </option>
                  {props.programs?.map(
                    (program: any) =>
                      program?.id !== values.secondaryProgramID && (
                        <option key={program?.id} value={program?.id}>
                          {`${program?.name}-${program?.university.name}`}
                        </option>
                      )
                  )}
                </Field>
                <label className="label-text-alt text-error">
                  {errors.primaryProgramID &&
                    touched.primaryProgramID &&
                    errors.primaryProgramID}
                </label>
              </div>
            }
            {/* Secondary Program */}
            {
              <div className="flex flex-col justify-start w-full">
                <label className="label">Secondary Program</label>
                <Field
                  as="select"
                  name="secondaryProgramID"
                  title="secondaryProgramID"
                  placeholder="Secondary Program"
                  className={`input input-bordered input-primary ${
                    errors.secondaryProgramID && "input-error"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.secondaryProgramID}
                >
                  <option
                    selected={props.application === undefined}
                    disabled
                    value={undefined}
                  >
                    Select
                  </option>
                  {props.programs?.map(
                    (program: any) =>
                      program?.id !== values.primaryProgramID && (
                        <option key={program?.id} value={program?.id}>
                          {`${program?.name}-${program?.university.name}`}
                        </option>
                      )
                  )}
                </Field>
                <label className="label-text-alt text-error">
                  {errors.secondaryProgramID &&
                    touched.secondaryProgramID &&
                    errors.secondaryProgramID}
                </label>
              </div>
            }
            <div className="divider md:col-span-2"></div>

            {/* cprDoc */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">
                CPR Document{" "}
                {!props.application && (
                  <span className="ml-1 mr-auto text-red-500">*</span>
                )}{" "}
                {props.downloadLinks?.cprDoc && (
                  <Link
                    href={props.downloadLinks?.cprDoc}
                    target="_blank"
                    className="ml-1 link link-primary"
                  >
                    View
                  </Link>
                )}
              </label>
              <Field
                type="file"
                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                id="cprDoc"
                name="cprDoc"
                title="cprDoc"
                placeholder="CPR Doc"
                className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                  errors.cprDoc && "input-error"
                }`}
                onChange={(event: any) => {
                  let file: File | undefined = event.currentTarget.files[0];

                  let isValid = checkIfFilesAreTooBig(file);
                  if (isValid) {
                    setCprDoc(file);
                    handleChange(event);
                  } else {
                    setFieldError("cprDoc", "File is too large");
                  }
                }}
                // onChange={handleChange}
                onBlur={handleBlur}
                value={values.cprDoc}
              />
              <label className="label-text-alt text-error">
                {errors.cprDoc && touched.cprDoc && errors.cprDoc}
              </label>
            </div>
            {/* acceptanceLetterDoc */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">
                Acceptance Letter Document{" "}
                {!props.application && (
                  <span className="ml-1 mr-auto text-red-500">*</span>
                )}
                {props.downloadLinks?.acceptanceLetterDoc && (
                  <Link
                    href={props.downloadLinks?.acceptanceLetterDoc}
                    target="_blank"
                    className="ml-1 link link-primary"
                  >
                    View
                  </Link>
                )}
              </label>
              <Field
                type="file"
                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                id="acceptanceLetterDoc"
                name="acceptanceLetterDoc"
                title="acceptanceLetterDoc"
                placeholder="Acceptance Letter Doc"
                className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                  errors.acceptanceLetterDoc && "input-error"
                }`}
                onChange={(event: any) => {
                  let file: File | undefined = event.currentTarget.files[0];

                  let isValid = checkIfFilesAreTooBig(file);
                  if (isValid) {
                    setAcceptanceLetterDoc(file);
                    handleChange(event);
                  } else {
                    setFieldError("acceptanceLetterDoc", "File is too large");
                  }
                }}
                onBlur={handleBlur}
                value={values.acceptanceLetterDoc ?? ""}
              />
              <label className="label-text-alt text-error">
                {errors.acceptanceLetterDoc &&
                  touched.acceptanceLetterDoc &&
                  errors.acceptanceLetterDoc}
              </label>
            </div>

            {/* transcriptDoc */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">
                Transcript Document{" "}
                {!props.application && (
                  <span className="ml-1 mr-auto text-red-500">*</span>
                )}
                {props.downloadLinks?.transcriptDoc && (
                  <Link
                    href={props.downloadLinks?.transcriptDoc}
                    target="_blank"
                    className="ml-1 link link-primary"
                  >
                    View
                  </Link>
                )}
              </label>
              <Field
                type="file"
                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                id="transcriptDoc"
                name="transcriptDoc"
                title="transcriptDoc"
                placeholder="Transcript Doc"
                className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                  errors.transcriptDoc && "input-error"
                }`}
                onChange={(event: any) => {
                  let file: File | undefined = event.currentTarget.files[0];

                  let isValid = checkIfFilesAreTooBig(file);
                  if (isValid) {
                    setTranscriptDoc(file);
                    handleChange(event);
                  } else {
                    setFieldError("transcriptDoc", "File is too large");
                  }
                }}
                onBlur={handleBlur}
                value={values.transcriptDoc ?? ""}
              />
              <label className="label-text-alt text-error">
                {errors.transcriptDoc &&
                  touched.transcriptDoc &&
                  errors.transcriptDoc}
              </label>
            </div>

            {/* signedContractDoc */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">
                Signed Contract Document
                {props.downloadLinks?.signedContractDoc && (
                  <Link
                    href={props.downloadLinks?.signedContractDoc}
                    target="_blank"
                    className="ml-1 link link-primary"
                  >
                    View
                  </Link>
                )}
              </label>

              <Field
                type="file"
                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                id="signedContractDoc"
                name="signedContractDoc"
                title="signedContractDoc"
                placeholder="Signed Contract Doc"
                className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                  errors.signedContractDoc && "input-error"
                }`}
                onChange={(event: any) => {
                  let file: File | undefined = event.currentTarget.files[0];

                  let isValid = checkIfFilesAreTooBig(file);
                  if (isValid) {
                    setSignedContractDoc(file);
                    handleChange(event);
                  } else {
                    setFieldError("signedContractDoc", "File is too large");
                  }
                }}
                onBlur={handleBlur}
                value={values.signedContractDoc ?? ""}
              />
              <label className="label-text-alt text-error">
                {errors.signedContractDoc &&
                  touched.signedContractDoc &&
                  errors.signedContractDoc}
              </label>
            </div>
            {/* Reason */}
            {props.application && (
              <div className="flex flex-col justify-start w-full md:col-span-2">
                <label className="label">Reason For Update</label>
                <Field
                  type="text"
                  name="reasonForUpdate"
                  title="reasonForUpdate"
                  placeholder="Reason For Update..."
                  className={`input input-bordered input-primary ${
                    errors.reasonForUpdate && "input-error"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.reasonForUpdate ?? ""}
                />
                <label className="label-text-alt text-error">
                  {errors.reasonForUpdate &&
                    touched.reasonForUpdate &&
                    errors.reasonForUpdate}
                </label>
              </div>
            )}

            {/* Submit */}
            <button
              className="my-3 text-white btn btn-primary md:col-span-2"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {props.application ? "Update" : "Apply"}
            </button>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="cursor-pointer modal">
              <label className="relative modal-box" htmlFor="">
                <h3 className="text-lg font-bold">Confirm withdraw</h3>
                <p className="py-4">
                  Are you sure you want to withdraw your application?
                </p>
                <div className="modal-action">
                  <button
                    className={`btn btn-error btn-sm ${
                      withdrawing && "loading"
                    }`}
                    type="button"
                    disabled={withdrawing}
                    onClick={() => {
                      toast.promise(withdrawApplication(props.application!), {
                        loading: "Withdrawing...",
                        success: "Withdraw successfully",
                        error: (err) => {
                          return `${err}`;
                        },
                      });
                    }}
                  >
                    Withdraw
                  </button>
                  <label htmlFor="my-modal" className="btn btn-sm">
                    No
                  </label>
                </div>
              </label>
            </label>

            {props.application &&
              (props.application.status === Status.REVIEW ||
                props.application.status === Status.ELIGIBLE) && (
                <label
                  htmlFor="my-modal"
                  className="btn md:col-span-2 btn-error"
                >
                  Withdraw
                </label>
              )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
