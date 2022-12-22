import "yup-phone";
import React, { useState } from "react";
import { API, Auth } from "aws-amplify";

import * as mutations from "../../src/graphql/mutations";

import {
  CreateParentInfoMutation,
  CreateParentInfoMutationVariables,
  CreateStudentMutation,
  CreateStudentMutationVariables,
  DeleteParentInfoMutation,
  DeleteParentInfoMutationVariables,
  DeleteStudentMutation,
  DeleteStudentMutationVariables,
} from "../../src/API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { SignUpParams } from "@aws-amplify/auth";
import { ISignUpResult } from "amazon-cognito-identity-js";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/use-auth";
import { useRouter } from "next/router";
import { CreateStudentForm } from "./create-student-form";
import { CreateParentsForm } from "./create-parents-form";

export interface CreateStudentFormValues {
  student: CreateStudentMutationVariables;

  parentInfo: CreateParentInfoMutationVariables;

  password: string;
}

export default function SignUpForm() {
  const auth = useAuth();
  const router = useRouter();

  const [steps, setSteps] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: CreateStudentFormValues = {
    student: {
      input: {
        cpr: "",
        fullName: undefined,
        email: undefined,
        phone: "+973",
        gender: undefined,
        address: undefined,
        schoolName: undefined,
        specialization: undefined,
        placeOfBirth: undefined,
        studentOrderAmongSiblings: undefined,
        householdIncome: undefined,
        preferredLanguage: undefined,
        graduationDate: undefined,
        parentInfoID: undefined,
        _version: undefined,
      },
      condition: undefined,
    },
    parentInfo: {
      input: {
        id: undefined,
        guardianFullName: undefined,
        relation: undefined,
        guardianCPR: undefined,
        address: undefined,
        primaryMobile: "+973",
        secondaryMobile: "+973",
        fatherFullName: undefined,
        fatherCPR: undefined,
        motherFullName: undefined,
        motherCPR: undefined,
        numberOfFamilyMembers: undefined,
        _version: undefined,
      },
      condition: undefined,
    },
    password: "",
  };

  const [createStudentFormValues, setCreateStudentFormValues] =
    useState<CreateStudentFormValues>(initialValues);

  async function createDatabaseParentInfo(
    values: CreateStudentFormValues
  ): Promise<GraphQLResult<CreateParentInfoMutation> | null> {
    let mutationInput: CreateParentInfoMutationVariables = values.parentInfo;

    try {
      const res: GraphQLResult<CreateParentInfoMutation> = (await API.graphql({
        query: mutations.createParentInfo,
        variables: mutationInput,
      })) as GraphQLResult<CreateParentInfoMutation>;

      return res;
    } catch (error) {
      console.log("createDatabaseParentInfo => error", error);
      return null;
    }
  }

  async function createDatabaseStudent(
    values: CreateStudentFormValues
  ): Promise<GraphQLResult<CreateStudentMutation> | null> {
    let mutationInput: CreateStudentMutationVariables = values.student;

    try {
      const res: GraphQLResult<CreateStudentMutation> = (await API.graphql({
        query: mutations.createStudent,
        variables: mutationInput,
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
        username: values.student.input.cpr,
        password: values.password,
        attributes: {
          email: values.student.input.email,
          phone_number: values.student.input.phone,
        },
      };
      const signUpResult = await Auth.signUp(signUpPrams);

      return signUpResult;
    } catch (error) {
      console.log("createCognitoUser => error", error);
      return null;
    }
  }

  async function deleteParentInfo(createdParentInfo: CreateParentInfoMutation) {
    let mutationInputs: DeleteParentInfoMutationVariables = {
      input: {
        id: `${createdParentInfo.createParentInfo?.id}`,
        _version: createdParentInfo.createParentInfo?._version,
      },
    };

    try {
      let res = (await API.graphql({
        query: mutations.deleteParentInfo,
        variables: mutationInputs,
      })) as GraphQLResult<DeleteParentInfoMutation>;

      return res;
    } catch (error) {
      console.log("SignUpForm => deleteParentInfo => error", error);
      return null;
    }
  }

  async function deleteCreatedUser(createdDatabaseUser: CreateStudentMutation) {
    let mutationInputs: DeleteStudentMutationVariables = {
      input: {
        cpr: `${createdDatabaseUser.createStudent?.cpr}`,
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

  async function signUpProcess(data: CreateStudentFormValues) {
    let userAlreadyExists = await auth.checkIfCprExist(
      createStudentFormValues.student.input.cpr.trim()
    );

    if (userAlreadyExists) {
      toast.error("User already exists");
      return;
    }

    const createdParentInfo = await createDatabaseParentInfo(data);

    if (createdParentInfo?.data == null) {
      toast.error("Error creating the user");
      return;
    }

    let temp: CreateStudentFormValues = {
      student: {
        input: {
          cpr: data.student.input.cpr,
          fullName: data.student.input.fullName,
          email: data.student.input.email,
          phone: data.student.input.phone,
          gender: data.student.input.gender,
          schoolName: data.student.input.schoolName,
          specialization: data.student.input.specialization,
          placeOfBirth: data.student.input.placeOfBirth,
          studentOrderAmongSiblings:
            data.student.input.studentOrderAmongSiblings,
          householdIncome: data.student.input.householdIncome,
          preferredLanguage: data.student.input.preferredLanguage,
          graduationDate: data.student.input.graduationDate,
          address: data.student.input.address,
          parentInfoID: createdParentInfo?.data?.createParentInfo?.id,
          _version: data.student.input._version,
        },
        condition: data.student.condition,
      },
      parentInfo: data.parentInfo,
      password: data.password,
    };

    setCreateStudentFormValues(temp);

    const createdDatabaseUser = await createDatabaseStudent(temp);

    if (createdDatabaseUser?.data == null) {
      toast.error("Error creating the user");
      await deleteParentInfo(createdParentInfo.data);
      return;
    }

    const createCognitoUserResult = await createCognitoUser(temp);

    if (createCognitoUserResult?.user) {
      router.push({
        pathname: "/signUp",
        query: { cpr: createStudentFormValues.student.input.cpr },
      });
      toast("email need to be verified");
    } else {
      toast.error("Error creating the user");
      await deleteCreatedUser(createdDatabaseUser.data);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <ul className="mb-6 steps">
        <li className={`step mr-6 ${steps >= 1 && "step-primary"}`}>
          Student Info
        </li>

        <li className={`step  ${steps >= 2 && "step-primary"}`}>
          Parents Info
        </li>
      </ul>
      {steps === 1 && (
        <CreateStudentForm
          student={createStudentFormValues.student}
          password={createStudentFormValues.password}
          submitTitle={"Next Step"}
          onFormSubmit={(values) => {
            let temp: CreateStudentFormValues = {
              student: values.student,

              parentInfo: createStudentFormValues.parentInfo,

              password: values.password,
            };

            setCreateStudentFormValues(temp);
            setSteps(2);

            console.log(temp);
          }}
        ></CreateStudentForm>
      )}
      {steps === 2 && (
        <CreateParentsForm
          parentInfo={createStudentFormValues.parentInfo}
          isLoading={isLoading}
          submitTitle={"Register"}
          onFormSubmit={async (values) => {
            console.log("values", values);

            let temp: CreateStudentFormValues = {
              student: createStudentFormValues.student,

              parentInfo: values,

              password: createStudentFormValues.password,
            };

            setCreateStudentFormValues(temp);
            setIsLoading(true);
            // setSteps(2);
            await toast.promise(signUpProcess(temp), {
              loading: "Creating your account...",
              success: "Account created successfully",
              error: (err) => {
                return `${err}`;
              },
            });
            setIsLoading(false);

            console.log(temp);
          }}
        ></CreateParentsForm>
      )}
    </div>
  );
}