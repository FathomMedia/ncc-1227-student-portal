import { isEqual } from "lodash";
import { Application, Status } from "./API";

/**
 * It checks if a file is too big
 * @param {File} [file] - The file that is being checked.
 * @returns A boolean value.
 */
export function checkIfFilesAreTooBig(file?: File): boolean {
  let valid = true;
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > 1) {
      valid = false;
    }
  }
  return valid;
}

export function getStatusOrder(status: Status) {
  switch (status) {
    case Status.APPROVED:
      return 1;
    case Status.ELIGIBLE:
      return 0.7;
    case Status.REVIEW:
      return 0.5;
    case Status.NOT_COMPLETED:
      return 0.3;
    case Status.REJECTED:
      return 0.2;
    case Status.WITHDRAWN:
      return 0.1;
  }
}

export interface ApplicationSnapshotInput {
  gpa: number | undefined;

  primaryProgram: {
    id: string | undefined;
    name: string | undefined;
  };

  secondaryProgram: {
    id: string | undefined;
    name: string | undefined;
  };

  attachments: {
    cpr?: string | undefined;
    transcript?: string | undefined;
    acceptance?: string | undefined;
    signedContract?: string | undefined;
  };
}

export interface ApplicationSnapshot {
  gpa?: string;
  primaryProgram?: string;
  secondaryProgram?: string;
  attachments?: {
    cpr?: string;
    transcript?: string;
    acceptance?: string;
    signedContract?: string;
  };
}

export function getStudentApplicationSnapshot(inputData: {
  newApplication: ApplicationSnapshotInput;
  oldApplication?: ApplicationSnapshotInput;
}): string {
  let snapshot: ApplicationSnapshot = inputData.oldApplication
    ? {
        gpa: isEqual(inputData.newApplication.gpa, inputData.oldApplication.gpa)
          ? undefined
          : `Changed ${inputData.oldApplication.gpa} to ${inputData.newApplication.gpa}`,
        primaryProgram: isEqual(
          inputData.newApplication.primaryProgram.id,
          inputData.oldApplication.primaryProgram.id
        )
          ? undefined
          : `Changed ${inputData.oldApplication.primaryProgram.name} to ${inputData.newApplication.primaryProgram.name}`,
        secondaryProgram: isEqual(
          inputData.newApplication.secondaryProgram.id,
          inputData.oldApplication.secondaryProgram.id
        )
          ? undefined
          : `Changed ${inputData.oldApplication.secondaryProgram.name} to ${inputData.newApplication.secondaryProgram.name}`,
        attachments: isEqual(
          inputData.newApplication.attachments,
          inputData.oldApplication.attachments
        )
          ? undefined
          : {
              cpr: inputData.newApplication.attachments.cpr
                ? `Changed ${inputData.oldApplication.attachments.cpr} to ${inputData.newApplication.attachments.cpr}`
                : undefined,
              transcript: inputData.newApplication.attachments.transcript
                ? `Changed ${inputData.oldApplication.attachments.transcript} to ${inputData.newApplication.attachments.transcript}`
                : undefined,
              acceptance: inputData.newApplication.attachments.acceptance
                ? `Changed ${inputData.oldApplication.attachments.acceptance} to ${inputData.newApplication.attachments.acceptance}`
                : undefined,
              signedContract: inputData.newApplication.attachments
                .signedContract
                ? `Changed ${inputData.oldApplication.attachments.signedContract} to ${inputData.newApplication.attachments.signedContract}`
                : undefined,
            },
      }
    : {
        gpa: `Initial submit with GPA ${inputData.newApplication.gpa}`,
        primaryProgram: `Initial submit with Primary Program ${inputData.newApplication.primaryProgram.name}`,
        secondaryProgram: `Initial submit with Secondary Program ${inputData.newApplication.secondaryProgram.name}`,
        attachments: {
          cpr: `Initial submit with CPR ${inputData.newApplication.attachments.cpr}`,
          transcript: `Initial submit with transcript ${inputData.newApplication.attachments.transcript}`,
          acceptance: `Initial submit with acceptance ${inputData.newApplication.attachments.acceptance}`,
          signedContract: `Initial submit with signed contract ${inputData.newApplication.attachments.signedContract}`,
        },
      };

  return JSON.stringify(snapshot);
}
