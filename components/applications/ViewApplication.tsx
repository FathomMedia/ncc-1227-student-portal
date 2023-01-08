import Link from "next/link";
import React from "react";
import { Application, Status } from "../../src/API";
import GetStorageLinkComponent from "../get-storage-link-component";

interface Props {
  application: Application;
}

export default function ViewApplication({ application }: Props) {
  return (
    <div className="overflow-x-auto">
      <table dir="ltr" className="table w-full">
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
              <div className="badge badge-warning">
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
              <GetStorageLinkComponent
                storageKey={application.attachment?.cprDoc}
              ></GetStorageLinkComponent>
            </td>
          </tr>
          <tr>
            <td>Acceptance Letter Document</td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.acceptanceLetterDoc}
              ></GetStorageLinkComponent>
            </td>
          </tr>
          <tr>
            <td>Transcript Document</td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.transcriptDoc}
              ></GetStorageLinkComponent>
            </td>
          </tr>
          <tr>
            <td>Signed Contract Document</td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.signedContractDoc}
              ></GetStorageLinkComponent>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
