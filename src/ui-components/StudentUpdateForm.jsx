/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Student } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function StudentUpdateForm(props) {
  const {
    id,
    student,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    cpr: undefined,
    fullName: undefined,
    email: undefined,
    phone: undefined,
    gender: undefined,
    schoolName: undefined,
    specialization: undefined,
    placeOfBirth: undefined,
    studentOrderAmongSiblings: undefined,
    householdIncome: undefined,
    addressID: undefined,
    preferredLanguage: undefined,
    graduationDate: undefined,
    Address: {},
    ParentInfo: {},
    parentInfoID: undefined,
    studentAddressId: undefined,
    studentParentInfoId: undefined,
  };
  const [cpr, setCpr] = React.useState(initialValues.cpr);
  const [fullName, setFullName] = React.useState(initialValues.fullName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [schoolName, setSchoolName] = React.useState(initialValues.schoolName);
  const [specialization, setSpecialization] = React.useState(
    initialValues.specialization
  );
  const [placeOfBirth, setPlaceOfBirth] = React.useState(
    initialValues.placeOfBirth
  );
  const [studentOrderAmongSiblings, setStudentOrderAmongSiblings] =
    React.useState(initialValues.studentOrderAmongSiblings);
  const [householdIncome, setHouseholdIncome] = React.useState(
    initialValues.householdIncome
  );
  const [addressID, setAddressID] = React.useState(initialValues.addressID);
  const [preferredLanguage, setPreferredLanguage] = React.useState(
    initialValues.preferredLanguage
  );
  const [graduationDate, setGraduationDate] = React.useState(
    initialValues.graduationDate
  );
  const [Address, setAddress] = React.useState(initialValues.Address);
  const [ParentInfo, setParentInfo] = React.useState(initialValues.ParentInfo);
  const [parentInfoID, setParentInfoID] = React.useState(
    initialValues.parentInfoID
  );
  const [studentAddressId, setStudentAddressId] = React.useState(
    initialValues.studentAddressId
  );
  const [studentParentInfoId, setStudentParentInfoId] = React.useState(
    initialValues.studentParentInfoId
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...studentRecord };
    setCpr(cleanValues.cpr);
    setFullName(cleanValues.fullName);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setGender(cleanValues.gender);
    setSchoolName(cleanValues.schoolName);
    setSpecialization(cleanValues.specialization);
    setPlaceOfBirth(cleanValues.placeOfBirth);
    setStudentOrderAmongSiblings(cleanValues.studentOrderAmongSiblings);
    setHouseholdIncome(cleanValues.householdIncome);
    setAddressID(cleanValues.addressID);
    setPreferredLanguage(cleanValues.preferredLanguage);
    setGraduationDate(cleanValues.graduationDate);
    setAddress(cleanValues.Address);
    setParentInfo(cleanValues.ParentInfo);
    setParentInfoID(cleanValues.parentInfoID);
    setStudentAddressId(cleanValues.studentAddressId);
    setStudentParentInfoId(cleanValues.studentParentInfoId);
    setErrors({});
  };
  const [studentRecord, setStudentRecord] = React.useState(student);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Student, id) : student;
      setStudentRecord(record);
    };
    queryData();
  }, [id, student]);
  React.useEffect(resetStateValues, [studentRecord]);
  const validations = {
    cpr: [],
    fullName: [],
    email: [],
    phone: [],
    gender: [],
    schoolName: [],
    specialization: [],
    placeOfBirth: [],
    studentOrderAmongSiblings: [],
    householdIncome: [],
    addressID: [],
    preferredLanguage: [],
    graduationDate: [],
    Address: [],
    ParentInfo: [],
    parentInfoID: [],
    studentAddressId: [],
    studentParentInfoId: [],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          cpr,
          fullName,
          email,
          phone,
          gender,
          schoolName,
          specialization,
          placeOfBirth,
          studentOrderAmongSiblings,
          householdIncome,
          addressID,
          preferredLanguage,
          graduationDate,
          Address,
          ParentInfo,
          parentInfoID,
          studentAddressId,
          studentParentInfoId,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(
            Student.copyOf(studentRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "StudentUpdateForm")}
    >
      <TextField
        label="Cpr"
        isRequired={false}
        isReadOnly={false}
        defaultValue={cpr}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr: value,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.cpr ?? value;
          }
          if (errors.cpr?.hasError) {
            runValidationTasks("cpr", value);
          }
          setCpr(value);
        }}
        onBlur={() => runValidationTasks("cpr", cpr)}
        errorMessage={errors.cpr?.errorMessage}
        hasError={errors.cpr?.hasError}
        {...getOverrideProps(overrides, "cpr")}
      ></TextField>
      <TextField
        label="Full name"
        isRequired={false}
        isReadOnly={false}
        defaultValue={fullName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName: value,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.fullName ?? value;
          }
          if (errors.fullName?.hasError) {
            runValidationTasks("fullName", value);
          }
          setFullName(value);
        }}
        onBlur={() => runValidationTasks("fullName", fullName)}
        errorMessage={errors.fullName?.errorMessage}
        hasError={errors.fullName?.hasError}
        {...getOverrideProps(overrides, "fullName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        defaultValue={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email: value,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        defaultValue={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone: value,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <SelectField
        label="Gender"
        placeholder="Please select an option"
        isDisabled={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender: value,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      >
        <option
          children="Female"
          value="FEMALE"
          {...getOverrideProps(overrides, "genderoption0")}
        ></option>
        <option
          children="Male"
          value="MALE"
          {...getOverrideProps(overrides, "genderoption1")}
        ></option>
      </SelectField>
      <TextField
        label="School name"
        isRequired={false}
        isReadOnly={false}
        defaultValue={schoolName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName: value,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.schoolName ?? value;
          }
          if (errors.schoolName?.hasError) {
            runValidationTasks("schoolName", value);
          }
          setSchoolName(value);
        }}
        onBlur={() => runValidationTasks("schoolName", schoolName)}
        errorMessage={errors.schoolName?.errorMessage}
        hasError={errors.schoolName?.hasError}
        {...getOverrideProps(overrides, "schoolName")}
      ></TextField>
      <TextField
        label="Specialization"
        isRequired={false}
        isReadOnly={false}
        defaultValue={specialization}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization: value,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.specialization ?? value;
          }
          if (errors.specialization?.hasError) {
            runValidationTasks("specialization", value);
          }
          setSpecialization(value);
        }}
        onBlur={() => runValidationTasks("specialization", specialization)}
        errorMessage={errors.specialization?.errorMessage}
        hasError={errors.specialization?.hasError}
        {...getOverrideProps(overrides, "specialization")}
      ></TextField>
      <TextField
        label="Place of birth"
        isRequired={false}
        isReadOnly={false}
        defaultValue={placeOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth: value,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.placeOfBirth ?? value;
          }
          if (errors.placeOfBirth?.hasError) {
            runValidationTasks("placeOfBirth", value);
          }
          setPlaceOfBirth(value);
        }}
        onBlur={() => runValidationTasks("placeOfBirth", placeOfBirth)}
        errorMessage={errors.placeOfBirth?.errorMessage}
        hasError={errors.placeOfBirth?.hasError}
        {...getOverrideProps(overrides, "placeOfBirth")}
      ></TextField>
      <TextField
        label="Student order among siblings"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        defaultValue={studentOrderAmongSiblings}
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              studentOrderAmongSiblings: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings: value,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.studentOrderAmongSiblings ?? value;
          }
          if (errors.studentOrderAmongSiblings?.hasError) {
            runValidationTasks("studentOrderAmongSiblings", value);
          }
          setStudentOrderAmongSiblings(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "studentOrderAmongSiblings",
            studentOrderAmongSiblings
          )
        }
        errorMessage={errors.studentOrderAmongSiblings?.errorMessage}
        hasError={errors.studentOrderAmongSiblings?.hasError}
        {...getOverrideProps(overrides, "studentOrderAmongSiblings")}
      ></TextField>
      <TextField
        label="Household income"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        defaultValue={householdIncome}
        onChange={(e) => {
          let value = Number(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              householdIncome: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome: value,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.householdIncome ?? value;
          }
          if (errors.householdIncome?.hasError) {
            runValidationTasks("householdIncome", value);
          }
          setHouseholdIncome(value);
        }}
        onBlur={() => runValidationTasks("householdIncome", householdIncome)}
        errorMessage={errors.householdIncome?.errorMessage}
        hasError={errors.householdIncome?.hasError}
        {...getOverrideProps(overrides, "householdIncome")}
      ></TextField>
      <TextField
        label="Address id"
        isRequired={false}
        isReadOnly={false}
        defaultValue={addressID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID: value,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.addressID ?? value;
          }
          if (errors.addressID?.hasError) {
            runValidationTasks("addressID", value);
          }
          setAddressID(value);
        }}
        onBlur={() => runValidationTasks("addressID", addressID)}
        errorMessage={errors.addressID?.errorMessage}
        hasError={errors.addressID?.hasError}
        {...getOverrideProps(overrides, "addressID")}
      ></TextField>
      <SelectField
        label="Preferred language"
        placeholder="Please select an option"
        isDisabled={false}
        value={preferredLanguage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage: value,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.preferredLanguage ?? value;
          }
          if (errors.preferredLanguage?.hasError) {
            runValidationTasks("preferredLanguage", value);
          }
          setPreferredLanguage(value);
        }}
        onBlur={() =>
          runValidationTasks("preferredLanguage", preferredLanguage)
        }
        errorMessage={errors.preferredLanguage?.errorMessage}
        hasError={errors.preferredLanguage?.hasError}
        {...getOverrideProps(overrides, "preferredLanguage")}
      >
        <option
          children="Arabic"
          value="ARABIC"
          {...getOverrideProps(overrides, "preferredLanguageoption0")}
        ></option>
        <option
          children="English"
          value="ENGLISH"
          {...getOverrideProps(overrides, "preferredLanguageoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Graduation date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        defaultValue={graduationDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate: value,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.graduationDate ?? value;
          }
          if (errors.graduationDate?.hasError) {
            runValidationTasks("graduationDate", value);
          }
          setGraduationDate(value);
        }}
        onBlur={() => runValidationTasks("graduationDate", graduationDate)}
        errorMessage={errors.graduationDate?.errorMessage}
        hasError={errors.graduationDate?.hasError}
        {...getOverrideProps(overrides, "graduationDate")}
      ></TextField>
      <SelectField
        label="Address"
        placeholder="Please select an option"
        isDisabled={false}
        value={Address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address: value,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.Address ?? value;
          }
          if (errors.Address?.hasError) {
            runValidationTasks("Address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("Address", Address)}
        errorMessage={errors.Address?.errorMessage}
        hasError={errors.Address?.hasError}
        {...getOverrideProps(overrides, "Address")}
      ></SelectField>
      <SelectField
        label="Parent info"
        placeholder="Please select an option"
        isDisabled={false}
        value={ParentInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo: value,
              parentInfoID,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.ParentInfo ?? value;
          }
          if (errors.ParentInfo?.hasError) {
            runValidationTasks("ParentInfo", value);
          }
          setParentInfo(value);
        }}
        onBlur={() => runValidationTasks("ParentInfo", ParentInfo)}
        errorMessage={errors.ParentInfo?.errorMessage}
        hasError={errors.ParentInfo?.hasError}
        {...getOverrideProps(overrides, "ParentInfo")}
      ></SelectField>
      <TextField
        label="Parent info id"
        isRequired={false}
        isReadOnly={false}
        defaultValue={parentInfoID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID: value,
              studentAddressId,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.parentInfoID ?? value;
          }
          if (errors.parentInfoID?.hasError) {
            runValidationTasks("parentInfoID", value);
          }
          setParentInfoID(value);
        }}
        onBlur={() => runValidationTasks("parentInfoID", parentInfoID)}
        errorMessage={errors.parentInfoID?.errorMessage}
        hasError={errors.parentInfoID?.hasError}
        {...getOverrideProps(overrides, "parentInfoID")}
      ></TextField>
      <TextField
        label="Student address id"
        isRequired={false}
        isReadOnly={false}
        defaultValue={studentAddressId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId: value,
              studentParentInfoId,
            };
            const result = onChange(modelFields);
            value = result?.studentAddressId ?? value;
          }
          if (errors.studentAddressId?.hasError) {
            runValidationTasks("studentAddressId", value);
          }
          setStudentAddressId(value);
        }}
        onBlur={() => runValidationTasks("studentAddressId", studentAddressId)}
        errorMessage={errors.studentAddressId?.errorMessage}
        hasError={errors.studentAddressId?.hasError}
        {...getOverrideProps(overrides, "studentAddressId")}
      ></TextField>
      <TextField
        label="Student parent info id"
        isRequired={false}
        isReadOnly={false}
        defaultValue={studentParentInfoId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              addressID,
              preferredLanguage,
              graduationDate,
              Address,
              ParentInfo,
              parentInfoID,
              studentAddressId,
              studentParentInfoId: value,
            };
            const result = onChange(modelFields);
            value = result?.studentParentInfoId ?? value;
          }
          if (errors.studentParentInfoId?.hasError) {
            runValidationTasks("studentParentInfoId", value);
          }
          setStudentParentInfoId(value);
        }}
        onBlur={() =>
          runValidationTasks("studentParentInfoId", studentParentInfoId)
        }
        errorMessage={errors.studentParentInfoId?.errorMessage}
        hasError={errors.studentParentInfoId?.hasError}
        {...getOverrideProps(overrides, "studentParentInfoId")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
