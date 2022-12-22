import React from "react";
import { Application, Status } from "../../src/API";

interface Props {
  application: Application;
}

export default function ViewApplication({ application }: Props) {
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
              {Intl.DateTimeFormat("en").format(
                new Date(application.createdAt)
              )}
            </td>
          </tr>

          <tr>
            <td>Status</td>
            <td>
              {application.status === Status.ELIGIBLE
                ? Status.REVIEW
                : application.status}
            </td>
          </tr>

          <tr>
            <td>GPA</td>
            <td>{application.gpa}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
