/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { AdminLog } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function AdminLogUpdateForm(props) {
  const {
    id,
    adminLog,
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
    applicationID: undefined,
    adminID: undefined,
    dateTime: undefined,
    snapshot: undefined,
  };
  const [applicationID, setApplicationID] = React.useState(
    initialValues.applicationID
  );
  const [adminID, setAdminID] = React.useState(initialValues.adminID);
  const [dateTime, setDateTime] = React.useState(initialValues.dateTime);
  const [snapshot, setSnapshot] = React.useState(initialValues.snapshot);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...adminLogRecord };
    setApplicationID(cleanValues.applicationID);
    setAdminID(cleanValues.adminID);
    setDateTime(cleanValues.dateTime);
    setSnapshot(cleanValues.snapshot);
    setErrors({});
  };
  const [adminLogRecord, setAdminLogRecord] = React.useState(adminLog);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(AdminLog, id) : adminLog;
      setAdminLogRecord(record);
    };
    queryData();
  }, [id, adminLog]);
  React.useEffect(resetStateValues, [adminLogRecord]);
  const validations = {
    applicationID: [{ type: "Required" }],
    adminID: [{ type: "Required" }],
    dateTime: [],
    snapshot: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hour12: false,
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          applicationID,
          adminID,
          dateTime,
          snapshot,
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
            AdminLog.copyOf(adminLogRecord, (updated) => {
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
      {...getOverrideProps(overrides, "AdminLogUpdateForm")}
    >
      <TextField
        label="Application id"
        isRequired={true}
        isReadOnly={false}
        defaultValue={applicationID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationID: value,
              adminID,
              dateTime,
              snapshot,
            };
            const result = onChange(modelFields);
            value = result?.applicationID ?? value;
          }
          if (errors.applicationID?.hasError) {
            runValidationTasks("applicationID", value);
          }
          setApplicationID(value);
        }}
        onBlur={() => runValidationTasks("applicationID", applicationID)}
        errorMessage={errors.applicationID?.errorMessage}
        hasError={errors.applicationID?.hasError}
        {...getOverrideProps(overrides, "applicationID")}
      ></TextField>
      <TextField
        label="Admin id"
        isRequired={true}
        isReadOnly={false}
        defaultValue={adminID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationID,
              adminID: value,
              dateTime,
              snapshot,
            };
            const result = onChange(modelFields);
            value = result?.adminID ?? value;
          }
          if (errors.adminID?.hasError) {
            runValidationTasks("adminID", value);
          }
          setAdminID(value);
        }}
        onBlur={() => runValidationTasks("adminID", adminID)}
        errorMessage={errors.adminID?.errorMessage}
        hasError={errors.adminID?.hasError}
        {...getOverrideProps(overrides, "adminID")}
      ></TextField>
      <TextField
        label="Date time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        defaultValue={dateTime && convertToLocal(new Date(dateTime))}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationID,
              adminID,
              dateTime: value,
              snapshot,
            };
            const result = onChange(modelFields);
            value = result?.dateTime ?? value;
          }
          if (errors.dateTime?.hasError) {
            runValidationTasks("dateTime", value);
          }
          setDateTime(new Date(value).toISOString());
        }}
        onBlur={() => runValidationTasks("dateTime", dateTime)}
        errorMessage={errors.dateTime?.errorMessage}
        hasError={errors.dateTime?.hasError}
        {...getOverrideProps(overrides, "dateTime")}
      ></TextField>
      <TextField
        label="Snapshot"
        isRequired={false}
        isReadOnly={false}
        defaultValue={snapshot}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationID,
              adminID,
              dateTime,
              snapshot: value,
            };
            const result = onChange(modelFields);
            value = result?.snapshot ?? value;
          }
          if (errors.snapshot?.hasError) {
            runValidationTasks("snapshot", value);
          }
          setSnapshot(value);
        }}
        onBlur={() => runValidationTasks("snapshot", snapshot)}
        errorMessage={errors.snapshot?.errorMessage}
        hasError={errors.snapshot?.hasError}
        {...getOverrideProps(overrides, "snapshot")}
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
