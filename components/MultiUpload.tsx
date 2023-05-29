import React, { ChangeEvent, useState } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { checkIfFilesAreTooBig } from "../src/HelperFunctions";
import { useTranslation } from "react-i18next";
import { Field } from "formik";
import GetStorageLinkComponent from "./get-storage-link-component";

interface Props {
  onFiles: (files: File[]) => void;
  isInvalid: (isInvalid: boolean) => void;
  accept?: Accept | undefined;
  maxSize?: number;
  handleChange: (event: any) => void;
  value: any;
  filedName: string;
  title: string;
  storageKeys?: (string | null)[] | null | undefined;
}

export default function MultiUpload(props: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const { t } = useTranslation("account");
  const [filesRejected, setFilesRejected] = useState<FileRejection[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept ?? {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
      "image/x-eps": [".eps"],
      "application/msword": [".docx", ".doc"],
    },
    validator: maxSizeValidator,
  });

  function maxSizeValidator(file: File) {
    return checkIfFilesAreTooBig(file, props.maxSize)
      ? null
      : {
          code: "File is too big",
          message: `Maximum size of file is ${props.maxSize ?? 2}  MB`,
        };
  }

  function onDrop<T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[]
  ): void {
    setFiles(acceptedFiles);
    setFilesRejected(fileRejections);
    props.isInvalid(fileRejections.length > 0);
    props.onFiles(acceptedFiles);
  }

  function handleCleanFiles(): void {
    setFiles([]);
    setFilesRejected([]);
    props.isInvalid(false);
  }

  return (
    <div>
      <label className="label">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start gap-1">
            <p>{props.title}</p>
            <span className=" text-red-500">*</span>
          </div>
          <button
            className="btn btn-ghost btn-xs ml-auto"
            type="button"
            onClick={() => {
              handleCleanFiles();
            }}
          >
            {t('clear')}
          </button>
        </div>
      </label>
      {(props.storageKeys ?? [])?.length > 0 && (
        <div className="flex flex-col mb-3 p-3 rounded-lg bg-gray-200">
          <div className="flex flex-wrap gap-2 items-center">
            {props.storageKeys?.map((doc, index) => (
              <div key={index} className="">
                <GetStorageLinkComponent
                  storageKey={doc}
                  showName
                ></GetStorageLinkComponent>
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        {...getRootProps()}
        className={`flex flex-col justify-start w-full p-4 border border-dashed rounded-lg border-secondary ${
          filesRejected.length > 0 && "border-error"
        }`}
      >
        <Field
          dir="ltr"
          name={props.filedName}
          title={props.filedName}
          {...getInputProps()}
          onChange={(event: any) => {
            props.handleChange(event);
          }}
          value={props.value}
        />
        <div className="flex justify-center mb-4 text-center ">
          {isDragActive ? (
            <p>{t('dropTheFilesHere')}</p>
          ) : (
            <p>{t('dragDropSomeFilesHereOr')}</p>
          )}
        </div>

        {(files || filesRejected) && (
          <div className="flex flex-wrap gap-3 text-sm text-secondary">
            {files.map((file: File, index) => (
              <div
                className="flex flex-col justify-start px-3 py-2 bg-gray-200 border border-gray-300 rounded-md"
                key={index}
              >
                <p>{file.name}</p>
                <p className="text-xs">
                  Size: {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            ))}

            {filesRejected.map((file: FileRejection, index) => (
              <div
                className="flex flex-col gap-1 px-3 py-2 bg-red-200 border border-red-300 rounded-md text-error"
                key={index}
              >
                <p>{file.file.name}</p>
                <div className="flex flex-col gap-1">
                  {file.errors.map((e, i) => (
                    <p className="text-xs" key={i}>
                      Size: {(file.file.size / 1024 / 1024).toFixed(1)} MB -{" "}
                      {e.message}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
