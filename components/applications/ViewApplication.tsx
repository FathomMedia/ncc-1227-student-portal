import Link from "next/link";
import React from "react";
import { Application, Status } from "../../src/API";

interface Props {
  application: Application;
  downloadLinks: {
    cprDoc?: string | null;
    acceptanceLetterDoc?: string | null;
    transcriptDoc?: string | null;
    signedContractDoc?: string | null;
  };
}

export default function ViewApplication({ application, downloadLinks }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Created at</td>
            <td>
              {Intl.DateTimeFormat("en", {
                timeStyle: "short",
                dateStyle: "medium",
              }).format(new Date(application.createdAt))}
            </td>
          </tr>

          <tr>
            <td>Status</td>
            <td>
              <div className="badge badge-info">
                {application.status === Status.ELIGIBLE
                  ? Status.REVIEW
                  : application.status}
              </div>
            </td>
          </tr>

          <tr>
            <td>GPA</td>
            <td>{application.gpa}</td>
          </tr>

          <tr>
            <td>Primary Program</td>
            <td>{`${
              application.programs?.items?.sort(
                (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
              )[0]?.program?.name
            }-${
              application.programs?.items?.sort(
                (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
              )[0]?.program?.university?.name
            }`}</td>
          </tr>
          <tr>
            <td>Secondary Program</td>
            <td>{`${
              application.programs?.items?.sort(
                (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
              )[1]?.program?.name
            }-${
              application.programs?.items?.sort(
                (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
              )[0]?.program?.university?.name
            }`}</td>
          </tr>
          <tr>
            <td>CPR Document</td>
            <td>
              {downloadLinks.cprDoc ? (
                <Link
                  className="link link-primary"
                  href={downloadLinks.cprDoc}
                  target="_blank"
                >
                  View CPR
                </Link>
              ) : (
                "Document Not Available"
              )}
            </td>
          </tr>
          <tr>
            <td>Acceptance Letter Document</td>
            <td>
              {downloadLinks.acceptanceLetterDoc ? (
                <Link
                  className="link link-primary"
                  href={downloadLinks.acceptanceLetterDoc}
                  target="_blank"
                >
                  View Acceptance Letter
                </Link>
              ) : (
                "Document Not Available"
              )}
            </td>
          </tr>
          <tr>
            <td>Transcript Document</td>
            <td>
              {downloadLinks.transcriptDoc ? (
                <Link
                  className="link link-primary"
                  href={downloadLinks.transcriptDoc}
                  target="_blank"
                >
                  View Transcript
                </Link>
              ) : (
                "Document Not Available"
              )}
            </td>
          </tr>
          <tr>
            <td>Signed Contract Document</td>
            <td>
              {downloadLinks.signedContractDoc ? (
                <Link
                  className="link link-primary"
                  href={downloadLinks.signedContractDoc}
                  target="_blank"
                >
                  View Signed Contract
                </Link>
              ) : (
                <span className="text-error">Document Not Available</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
