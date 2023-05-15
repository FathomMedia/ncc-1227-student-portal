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
  SchoolType,
  UpdateApplicationMutationVariables,
  UpdateAttachmentMutationVariables,
  UpdateProgramChoiceMutationVariables,
} from "../../src/API";
import { Status } from "../../src/models";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

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
} from "../../src/CustomAPI";
import {
  ApplicationSnapshotInput,
  checkIfFilesAreTooBig,
  getStudentApplicationSnapshot,
} from "../../src/HelperFunctions";
import GetStorageLinkComponent from "../get-storage-link-component";
import { useTranslation } from "react-i18next";

export interface CreateApplicationFormValues {
  application: CreateApplicationMutationVariables;
  primaryProgram: CreateProgramChoiceMutationVariables;
  secondaryProgram: CreateProgramChoiceMutationVariables;
  attachment: CreateAttachmentMutationVariables;
  studentLog: CreateStudentLogMutationVariables;
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
  schoolCertificate: File | undefined;
  transcriptDoc: File | undefined;
  primaryAcceptanceDoc: File | undefined;
  secondaryAcceptanceDoc: File | undefined;

  reasonForUpdate?: string | undefined;
}

interface Props {
  application?: Application;
  programs?: Program[];
}

export const ApplicationForm: FC<Props> = (props) => {
  const { user } = useAuth();
  const { push } = useRouter();
  const { student, syncStudentApplication } = useAppContext();
  const { t } = useTranslation("applicationPage");

  const [cprDoc, setCprDoc] = useState<File | undefined>(undefined);
  const [schoolCertificate, setSchoolCertificate] = useState<File | undefined>(
    undefined
  );
  const [transcriptDoc, setTranscriptDoc] = useState<File | undefined>(
    undefined
  );

  const [primaryProgram, setPrimaryProgram] = useState<Program | undefined>(
    props.application?.programs?.items.sort(
      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
    )[0]?.program ?? undefined
  );
  const [secondaryProgram, setSecondaryProgram] = useState<Program | undefined>(
    props.application?.programs?.items.sort(
      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
    )[1]?.program ?? undefined
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
    schoolCertificate: undefined,
    transcriptDoc: undefined,
    primaryAcceptanceDoc: undefined,
    secondaryAcceptanceDoc: undefined,
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
        dateTime: new Date().toISOString(),
        schoolType: student?.getStudent?.schoolType,
        schoolName: student?.getStudent?.schoolName,
        batch: new Date().getFullYear(),
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
      createStudentLogInDB({
        input: {
          id: undefined,
          _version: undefined,
          applicationID: createdApplicationInDB.createApplication?.id ?? "",
          studentCPR: data.studentLog.input.studentCPR,
          dateTime: data.studentLog.input.dateTime,
          snapshot: data.studentLog.input.snapshot,
          reason: data.studentLog.input.reason,
          applicationStudentLogsId:
            createdApplicationInDB.createApplication?.id,
          studentStudentLogsCpr: data.studentLog.input.studentCPR,
        },
      }),
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
                gpa: yup.number().min(88).max(100).required(),
                primaryProgramID: yup.string().required(),
                secondaryProgramID: yup.string().required(),
                reasonForUpdate: yup.string().required(),
              })
            : yup.object({
                gpa: yup.number().min(88).max(100).required(),
                primaryProgramID: yup.string().required(),
                secondaryProgramID: yup.string().required(),
                cprDoc: yup.mixed().required(),
                schoolCertificate:
                  student?.getStudent?.schoolType == SchoolType.PRIVATE
                    ? yup.mixed().required()
                    : yup.mixed(),
                transcriptDoc: yup.mixed().required(),
              })
        }
        onSubmit={async (values, actions) => {
          console.log({ values, actions });
          let checkStorageKeys: (string | null | undefined)[] = [
            props.application
              ? props.application.attachment?.cprDoc
              : undefined,
            props.application
              ? props.application.attachment?.schoolCertificate
              : undefined,
            props.application
              ? props.application.attachment?.transcriptDoc
              : undefined,
          ];

          let storageKeys = await toast.promise(
            Promise.all([
              cprDoc &&
                uploadFile(cprDoc, DocType.CPR, `${student?.getStudent?.cpr}`),
              schoolCertificate &&
                uploadFile(
                  schoolCertificate,
                  DocType.SCHOOL_CERTIFICATE,
                  `${student?.getStudent?.cpr}`
                ),
              transcriptDoc &&
                uploadFile(
                  transcriptDoc,
                  DocType.TRANSCRIPT,
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

          checkStorageKeys[0] =
            storageKeys[0] !== undefined ? storageKeys[0] : checkStorageKeys[0];
          checkStorageKeys[1] =
            storageKeys[1] !== undefined ? storageKeys[1] : checkStorageKeys[1];
          checkStorageKeys[2] =
            storageKeys[2] !== undefined ? storageKeys[2] : checkStorageKeys[2];

          let newApplicationSnapshotInput: ApplicationSnapshotInput = {
            gpa: values.gpa,
            primaryProgram: {
              id: values.primaryProgramID,
              name: `${
                props.programs?.find((p) => p.id === values.primaryProgramID)
                  ?.name
              }-${
                props.programs?.find((p) => p.id === values.primaryProgramID)
                  ?.university?.name
              }`,
            },
            secondaryProgram: {
              id: values.secondaryProgramID,
              name: `${
                props.programs?.find((p) => p.id === values.secondaryProgramID)
                  ?.name
              }-${
                props.programs?.find((p) => p.id === values.secondaryProgramID)
                  ?.university?.name
              }`,
            },
            attachments: {
              cpr: storageKeys[0] ?? undefined,
              acceptance: storageKeys[1] ?? undefined,
              transcript: storageKeys[2] ?? undefined,
            },
          };

          let oldApplicationSnapshotInput:
            | ApplicationSnapshotInput
            | undefined = props.application
            ? {
                gpa: props.application.gpa ?? undefined,
                primaryProgram: {
                  id:
                    props.application?.programs?.items.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[0]?.program?.id ?? undefined,
                  name: `${
                    props.application?.programs?.items.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[0]?.program?.name
                  }-${
                    props.application?.programs?.items.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[0]?.program?.university?.name
                  }`,
                },
                secondaryProgram: {
                  id:
                    props.application?.programs?.items.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[1]?.program?.id ?? undefined,
                  name: `${
                    props.application?.programs?.items.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[1]?.program?.name
                  }-${
                    props.application?.programs?.items.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[1]?.program?.university?.name
                  }`,
                },
                attachments: {
                  cpr: props.application?.attachment?.cprDoc ?? undefined,
                  acceptance:
                    props.application?.attachment?.schoolCertificate ??
                    undefined,
                  transcript:
                    props.application?.attachment?.transcriptDoc ?? undefined,
                },
              }
            : undefined;

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
                dateTime: new Date().toISOString(),
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
                schoolCertificate: storageKeys?.[1],
                transcriptDoc: storageKeys?.[2],
                _version: undefined,
              },
              condition: undefined,
            },
            studentLog: {
              input: {
                id: undefined,
                applicationID: "",
                studentCPR: user?.getUsername() ?? "",
                dateTime: new Date().toISOString(),

                snapshot: getStudentApplicationSnapshot({
                  newApplication: newApplicationSnapshotInput,
                  oldApplication: oldApplicationSnapshotInput,
                }),

                reason: "Initial Submit",
                _version: undefined,
                applicationStudentLogsId: "",
              },
              condition: undefined,
            },
          };

          /* -------------------------------------------------------------------------- */
          /*                                   UPDATE                                   */
          /* -------------------------------------------------------------------------- */

          let updateValues: UpdateApplicationFormValues = {
            application: {
              input: {
                id: props.application?.id ?? "",
                gpa: values.gpa,
                status:
                  props.application?.status === Status.NOT_COMPLETED
                    ? Array.prototype.every.call(
                        checkStorageKeys,
                        (x) => typeof x === "string"
                      )
                      ? Status.REVIEW
                      : Status.NOT_COMPLETED
                    : props.application?.status,
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
                schoolCertificate:
                  storageKeys?.[1] ??
                  props.application?.attachment?.schoolCertificate,
                transcriptDoc:
                  storageKeys?.[2] ??
                  props.application?.attachment?.transcriptDoc,
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

                snapshot: getStudentApplicationSnapshot({
                  newApplication: newApplicationSnapshotInput,
                  oldApplication: oldApplicationSnapshotInput,
                }),

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
          <Form className="container grid max-w-3xl grid-cols-1 gap-3 mx-auto md:grid-cols-2 ">
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
                value={student?.getStudent?.fullName}
                disabled
              />
            </div>
            {/* CPR */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">{t("CPR")}</label>
              <Field
                dir="ltr"
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
              <label className="label">{t("studentGPA")}</label>
              <Field
                dir="ltr"
                type="number"
                name="gpa"
                title="gpa"
                placeholder="GPA (88 - 100)"
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
                <label className="label">{t("primaryProgram")}</label>
                <Field
                  dir="ltr"
                  as="select"
                  name="primaryProgramID"
                  title="primaryProgramID"
                  placeholder="Primary Program"
                  className={`input input-bordered input-primary ${
                    errors.primaryProgramID && "input-error"
                  }`}
                  onChange={(event: any) => {
                    setPrimaryProgram(
                      props.programs?.find((p) => p.id === event.target.value)
                    );
                    handleChange(event);
                  }}
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
                    (program) =>
                      program?.id !== values.secondaryProgramID && (
                        <option
                          key={program?.id}
                          value={program?.id}
                          disabled={program?.isDeactivated === true}
                        >
                          {`${program?.name}-${program?.university?.name}`}
                        </option>
                      )
                  )}
                </Field>
                <label className="label-text-alt text-error">
                  {errors.primaryProgramID &&
                    touched.primaryProgramID &&
                    errors.primaryProgramID}
                </label>
                {primaryProgram?.requirements && (
                  <div
                    dir="ltr"
                    className="p-3 mt-2 border border-gray-300 rounded-md"
                  >
                    <div className="stat-title">Requirements</div>
                    <label className="whitespace-pre-wrap stat-desc">
                      {primaryProgram?.requirements}
                    </label>
                  </div>
                )}
              </div>
            }
            {/* Secondary Program */}
            {
              <div className="flex flex-col justify-start w-full">
                <label className="label">{t("secondaryProgram")}</label>
                <Field
                  dir="ltr"
                  as="select"
                  name="secondaryProgramID"
                  title="secondaryProgramID"
                  placeholder="Secondary Program"
                  className={`input input-bordered input-primary ${
                    errors.secondaryProgramID && "input-error"
                  }`}
                  onChange={(event: any) => {
                    setSecondaryProgram(
                      props.programs?.find((p) => p.id === event.target.value)
                    );
                    handleChange(event);
                  }}
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
                    (program) =>
                      program?.id !== values.primaryProgramID && (
                        <option
                          key={program?.id}
                          value={program?.id}
                          disabled={program?.isDeactivated === true}
                        >
                          {`${program?.name}-${program?.university?.name}`}
                        </option>
                      )
                  )}
                </Field>
                <label className="label-text-alt text-error">
                  {errors.secondaryProgramID &&
                    touched.secondaryProgramID &&
                    errors.secondaryProgramID}
                </label>
                {secondaryProgram?.requirements && (
                  <div
                    dir="ltr"
                    className="p-3 mt-2 border border-gray-300 rounded-md"
                  >
                    <div className="stat-title">Requirements</div>
                    <label className="whitespace-pre-wrap stat-desc">
                      {secondaryProgram?.requirements}
                    </label>
                  </div>
                )}
              </div>
            }
            <div className="divider md:col-span-2"></div>

            {/* cprDoc */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">
                {t("CPR")} {t("document")}{" "}
                {!props.application && (
                  <span className="ml-1 mr-auto text-red-500">*</span>
                )}{" "}
                {props.application && (
                  <GetStorageLinkComponent
                    storageKey={props.application?.attachment?.cprDoc}
                  ></GetStorageLinkComponent>
                )}
              </label>
              <Field
                dir="ltr"
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
                onBlur={handleBlur}
                value={values.cprDoc ?? ""}
              />
              <label className="label-text-alt text-error">
                {errors.cprDoc && touched.cprDoc && errors.cprDoc}
              </label>
            </div>

            {/* schoolCertificate */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">
                {t("schoolCertificate")} {t("document")}{" "}
                {!props.application && (
                  <span className="ml-1 mr-auto text-red-500">*</span>
                )}
                {props.application && (
                  <GetStorageLinkComponent
                    storageKey={
                      props.application?.attachment?.schoolCertificate
                    }
                  ></GetStorageLinkComponent>
                )}
              </label>
              <Field
                dir="ltr"
                type="file"
                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                id="schoolCertificate"
                name="schoolCertificate"
                title="schoolCertificate"
                placeholder="School Certificate Doc"
                className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                  errors.schoolCertificate && "input-error"
                }`}
                onChange={(event: any) => {
                  let file: File | undefined = event.currentTarget.files[0];

                  let isValid = checkIfFilesAreTooBig(file);
                  if (isValid) {
                    setSchoolCertificate(file);
                    handleChange(event);
                  } else {
                    setFieldError("schoolCertificate", "File is too large");
                  }
                }}
                onBlur={handleBlur}
                value={values.schoolCertificate ?? ""}
              />
              <label className="label-text-alt text-error">
                {errors.schoolCertificate &&
                  touched.schoolCertificate &&
                  errors.schoolCertificate}
              </label>
            </div>

            {/* transcriptDoc */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">
                {t("transcript")} {t("document")}{" "}
                {!props.application && (
                  <span className="ml-1 mr-auto text-red-500">*</span>
                )}
                {props.application && (
                  <GetStorageLinkComponent
                    storageKey={props.application?.attachment?.transcriptDoc}
                  ></GetStorageLinkComponent>
                )}
              </label>
              <Field
                dir="ltr"
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
            {/* <div className="flex flex-col justify-start w-full">
              <label className="label">
                {t("signedContract")} {t("document")}
                {props.application && (
                  <GetStorageLinkComponent
                    storageKey={
                      props.application?.attachment?.signedContractDoc
                    }
                  ></GetStorageLinkComponent>
                )}
              </label>

              <Field
                dir="ltr"
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
            </div> */}

            {/* Reason */}
            {props.application && (
              <div className="flex flex-col justify-start w-full md:col-span-2">
                <label className="label">{t("reasonForUpdate")}</label>
                <Field
                  type="text"
                  name="reasonForUpdate"
                  title="reasonForUpdate"
                  placeholder={`${t("reasonForUpdate")}...`}
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
              {props.application ? t("update") : t("apply")}
            </button>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="cursor-pointer modal">
              <label className="relative modal-box" htmlFor="">
                <h3 className="text-lg font-bold">{t("confirmWithdraw")}</h3>
                <p className="py-4">{t("confirmWithdrawMessage")}</p>
                <div className="gap-3 modal-action">
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
                    {t("withdraw")}
                  </button>
                  <label htmlFor="my-modal" className="btn btn-sm">
                    {t("no")}
                  </label>
                </div>
              </label>
            </label>

            {props.application &&
              (props.application.status === Status.REVIEW ||
                props.application.status === Status.ELIGIBLE) && (
                <label
                  htmlFor="my-modal"
                  className="mx-auto btn btn-ghost hover:bg-error/20 btn-xs w-min text-error md:col-span-2 btn-error"
                >
                  {t("withdraw")}
                </label>
              )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
