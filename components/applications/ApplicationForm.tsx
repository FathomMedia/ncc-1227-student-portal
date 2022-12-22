import { Formik, Form, Field } from "formik";
import { FC, useEffect, useState } from "react";
import * as yup from "yup";
import { useAppContext } from "../../contexts/AppContexts";
import { useAuth } from "../../hooks/use-auth";
import { API, Storage } from "aws-amplify";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";

import {
  CreateApplicationMutation,
  CreateApplicationMutationVariables,
  CreateAttachmentMutation,
  CreateAttachmentMutationVariables,
  CreateProgramChoiceMutation,
  CreateProgramChoiceMutationVariables,
} from "../../src/API";
import { Status } from "../../src/models";
import { toast } from "react-hot-toast";
import {
  createApplication,
  createAttachment,
  createProgramChoice,
} from "../../src/graphql/mutations";
import { useRouter } from "next/router";

export interface CreateApplicationFormValues {
  application: CreateApplicationMutationVariables;
  primaryProgram: CreateProgramChoiceMutationVariables;
  secondaryProgram: CreateProgramChoiceMutationVariables;
  attachment: CreateAttachmentMutationVariables;
}

interface FormValues {
  gpa: number | undefined;
  primaryProgramID: string | undefined;
  secondaryProgramID: string | undefined;
  cprDoc: File | undefined;
  acceptanceLetterDoc: File | undefined;
  transcriptDoc: File | undefined;
  signedContractDoc: File | undefined;
}

enum DocType {
  CPR,
  ACCEPTANCE,
  TRANSCRIPT,
  SIGNED_CONTRACT,
}

export const ApplicationForm: FC = () => {
  const { user } = useAuth();
  const { push } = useRouter();
  const { student } = useAppContext();

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

  const [programs, setPrograms] = useState<any>(undefined);

  const initialValues: FormValues = {
    gpa: undefined,
    primaryProgramID: undefined,
    secondaryProgramID: undefined,
    cprDoc: undefined,
    acceptanceLetterDoc: undefined,
    transcriptDoc: undefined,
    signedContractDoc: undefined,
  };

  useEffect(() => {
    getPrograms();

    /**
     * The function gets all the programs from the database and sets the state of the programs to the
     * data that was retrieved
     */
    async function getPrograms() {
      let q = `
      query ListAllPrograms {
        listPrograms {
          items {
            id
            name
            requirements
            universityID
            universityProgramsId
            updatedAt
            createdAt
            availability
            _version
            _lastChangedAt
            _deleted
            university {
              id
              _deleted
              _version
              name
            }
          }
        }
      }
      `;

      let res = (await API.graphql(graphqlOperation(q))) as GraphQLResult;
      setPrograms(res.data);
    }

    return () => {};
  }, []);

  /**
   * It takes a file and a document type, and uploads the file to the AWS S3 bucket, and returns the
   * key of the file
   * @param {File} file - File - The file to be uploaded
   * @param {DocType} type - DocType - this is an enum that I have defined in my code.
   * @returns The key of the file uploaded to the storage bucket.
   */
  async function uploadFile(file: File, type: DocType) {
    try {
      let res = await Storage.put(
        `Student${student?.getStudent?.cpr}/${student?.getStudent?.cpr}#${DocType[type]}`,
        file,
        {
          contentType: file.type,
        }
      );
      console.log("upload res", res);
      return res.key;
    } catch (error) {
      console.log("Error uploading file: ", error);
      return null;
    }
  }

  /**
   * It checks if a file is too big
   * @param {File} [file] - The file that is being checked.
   * @returns A boolean value.
   */
  function checkIfFilesAreTooBig(file?: File): boolean {
    let valid = true;
    if (file) {
      const size = file.size / 1024 / 1024;
      if (size > 1) {
        valid = false;
      }
    }
    return valid;
  }

  /**
   * It takes in a mutation variable object, and returns a promise that resolves to a GraphQL result
   * object
   * @param {CreateAttachmentMutationVariables} mutationVars - CreateAttachmentMutationVariables
   * @returns The data from the mutation.
   */
  async function createAttachmentInDB(
    mutationVars: CreateAttachmentMutationVariables
  ): Promise<CreateAttachmentMutation | undefined> {
    let res = (await API.graphql({
      query: createAttachment,
      variables: mutationVars,
    })) as GraphQLResult<CreateAttachmentMutation>;

    return res.data;
  }

  /**
   * It takes in a mutation variable object, and returns a promise that resolves to a mutation object
   * @param {CreateApplicationMutationVariables} mutationVars - CreateApplicationMutationVariables
   * @returns The data from the mutation.
   */
  async function createApplicationInDB(
    mutationVars: CreateApplicationMutationVariables
  ): Promise<CreateApplicationMutation | undefined> {
    let res = (await API.graphql({
      query: createApplication,
      variables: mutationVars,
    })) as GraphQLResult<CreateApplicationMutation>;

    return res.data;
  }

  /**
   * It takes in a variable of type CreateProgramChoiceMutationVariables and returns a promise of type
   * CreateProgramChoiceMutation or undefined
   * @param {CreateProgramChoiceMutationVariables} mutationVars - CreateProgramChoiceMutationVariables
   * @returns The data from the mutation.
   */
  async function createProgramChoiceInDB(
    mutationVars: CreateProgramChoiceMutationVariables
  ): Promise<CreateProgramChoiceMutation | undefined> {
    console.log(mutationVars);
    let res = (await API.graphql({
      query: createProgramChoice,
      variables: mutationVars,
    })) as GraphQLResult<CreateProgramChoiceMutation>;

    return res.data;
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
      .then((res) => {
        console.log("Create program choice res", res);
        push("/applications");
      })
      .catch((err) => {
        console.log("Create program choice error", err);
        toast.error("Something went wrong");
      });
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          gpa: yup.number().min(70).max(100).required(),
          primaryProgramID: yup.string().required(),
          secondaryProgramID: yup.string().required(),
          cprDoc: yup.mixed().required(),
          acceptanceLetterDoc: yup.mixed().required(),
          transcriptDoc: yup.mixed().required(),
        })}
        onSubmit={async (values, actions) => {
          console.log({ values, actions });

          let storageKeys = await toast.promise(
            Promise.all([
              cprDoc && uploadFile(cprDoc, DocType.CPR),
              acceptanceLetterDoc &&
                uploadFile(acceptanceLetterDoc, DocType.ACCEPTANCE),
              transcriptDoc && uploadFile(transcriptDoc, DocType.TRANSCRIPT),
              signedContractDoc &&
                uploadFile(signedContractDoc, DocType.SIGNED_CONTRACT),
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

          await toast.promise(createApplicationProcess(createValues), {
            loading: "Creating application...",
            success: "Application created successfully",
            error: "Application creation failed",
          });

          // let userAlreadyExists = await auth.checkIfCprExist(
          //   values.cpr.trim()
          // );

          // if (userAlreadyExists) {
          //   toast.error("User already exists");
          //   return;
          // }

          // const createdDatabaseUser = await createDatabaseStudent(values);
          // if (createdDatabaseUser?.data == null) {
          //   toast.error("Error creating the user");
          //   return;
          // }

          // const createCognitoUserResult = await createCognitoUser(values);

          // if (createCognitoUserResult?.user) {
          //   router.push({ pathname: "/signUp", query: { cpr: values.cpr } });
          //   toast("email need to be verified");
          // } else {
          //   toast.error("Error creating the user");
          //   await deleteCreatedUser(createdDatabaseUser.data);
          // }

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
                  <option selected disabled value={undefined}>
                    Select
                  </option>
                  {programs?.listPrograms?.items.map(
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
                  <option selected disabled value={undefined}>
                    Select
                  </option>
                  {programs?.listPrograms?.items.map(
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
                <span className="ml-1 mr-auto text-red-500">*</span>{" "}
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
                <span className="ml-1 mr-auto text-red-500">*</span>
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
                <span className="ml-1 mr-auto text-red-500">*</span>
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
              <label className="label">Signed Contract Document</label>
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

            {/* Submit */}
            <button
              className="my-3 text-white btn btn-primary md:col-span-2"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Apply
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
