/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Student } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type StudentUpdateFormInputValues = {
    cpr?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    gender?: string;
    schoolName?: string;
    specialization?: string;
    placeOfBirth?: string;
    studentOrderAmongSiblings?: number;
    householdIncome?: number;
    addressID?: string;
    preferredLanguage?: string;
    graduationDate?: string;
    Address?: string;
    ParentInfo?: string;
    parentInfoID?: string;
    studentAddressId?: string;
    studentParentInfoId?: string;
};
export declare type StudentUpdateFormValidationValues = {
    cpr?: ValidationFunction<string>;
    fullName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    schoolName?: ValidationFunction<string>;
    specialization?: ValidationFunction<string>;
    placeOfBirth?: ValidationFunction<string>;
    studentOrderAmongSiblings?: ValidationFunction<number>;
    householdIncome?: ValidationFunction<number>;
    addressID?: ValidationFunction<string>;
    preferredLanguage?: ValidationFunction<string>;
    graduationDate?: ValidationFunction<string>;
    Address?: ValidationFunction<string>;
    ParentInfo?: ValidationFunction<string>;
    parentInfoID?: ValidationFunction<string>;
    studentAddressId?: ValidationFunction<string>;
    studentParentInfoId?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StudentUpdateFormOverridesProps = {
    StudentUpdateFormGrid?: FormProps<GridProps>;
    cpr?: FormProps<TextFieldProps>;
    fullName?: FormProps<TextFieldProps>;
    email?: FormProps<TextFieldProps>;
    phone?: FormProps<TextFieldProps>;
    gender?: FormProps<SelectFieldProps>;
    schoolName?: FormProps<TextFieldProps>;
    specialization?: FormProps<TextFieldProps>;
    placeOfBirth?: FormProps<TextFieldProps>;
    studentOrderAmongSiblings?: FormProps<TextFieldProps>;
    householdIncome?: FormProps<TextFieldProps>;
    addressID?: FormProps<TextFieldProps>;
    preferredLanguage?: FormProps<SelectFieldProps>;
    graduationDate?: FormProps<TextFieldProps>;
    Address?: FormProps<SelectFieldProps>;
    ParentInfo?: FormProps<SelectFieldProps>;
    parentInfoID?: FormProps<TextFieldProps>;
    studentAddressId?: FormProps<TextFieldProps>;
    studentParentInfoId?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StudentUpdateFormProps = React.PropsWithChildren<{
    overrides?: StudentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    student?: Student;
    onSubmit?: (fields: StudentUpdateFormInputValues) => StudentUpdateFormInputValues;
    onSuccess?: (fields: StudentUpdateFormInputValues) => void;
    onError?: (fields: StudentUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: StudentUpdateFormInputValues) => StudentUpdateFormInputValues;
    onValidate?: StudentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StudentUpdateForm(props: StudentUpdateFormProps): React.ReactElement;
