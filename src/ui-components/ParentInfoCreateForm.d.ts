/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ParentInfoCreateFormInputValues = {
    guardianFullName?: string;
    relation?: string;
    guardianCPR?: string;
    primaryMobile?: string;
    secondaryMobile?: string;
    fatherFullName?: string;
    fatherCPR?: string;
    motherFullName?: string;
    motherCPR?: string;
    numberOfFamilyMembers?: number;
    Address?: string;
    parentInfoAddressId?: string;
};
export declare type ParentInfoCreateFormValidationValues = {
    guardianFullName?: ValidationFunction<string>;
    relation?: ValidationFunction<string>;
    guardianCPR?: ValidationFunction<string>;
    primaryMobile?: ValidationFunction<string>;
    secondaryMobile?: ValidationFunction<string>;
    fatherFullName?: ValidationFunction<string>;
    fatherCPR?: ValidationFunction<string>;
    motherFullName?: ValidationFunction<string>;
    motherCPR?: ValidationFunction<string>;
    numberOfFamilyMembers?: ValidationFunction<number>;
    Address?: ValidationFunction<string>;
    parentInfoAddressId?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ParentInfoCreateFormOverridesProps = {
    ParentInfoCreateFormGrid?: FormProps<GridProps>;
    guardianFullName?: FormProps<TextFieldProps>;
    relation?: FormProps<TextFieldProps>;
    guardianCPR?: FormProps<TextFieldProps>;
    primaryMobile?: FormProps<TextFieldProps>;
    secondaryMobile?: FormProps<TextFieldProps>;
    fatherFullName?: FormProps<TextFieldProps>;
    fatherCPR?: FormProps<TextFieldProps>;
    motherFullName?: FormProps<TextFieldProps>;
    motherCPR?: FormProps<TextFieldProps>;
    numberOfFamilyMembers?: FormProps<TextFieldProps>;
    Address?: FormProps<SelectFieldProps>;
    parentInfoAddressId?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ParentInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: ParentInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ParentInfoCreateFormInputValues) => ParentInfoCreateFormInputValues;
    onSuccess?: (fields: ParentInfoCreateFormInputValues) => void;
    onError?: (fields: ParentInfoCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: ParentInfoCreateFormInputValues) => ParentInfoCreateFormInputValues;
    onValidate?: ParentInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function ParentInfoCreateForm(props: ParentInfoCreateFormProps): React.ReactElement;
