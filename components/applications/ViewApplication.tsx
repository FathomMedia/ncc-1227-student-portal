import React from "react";
import { useTranslation } from "react-i18next";
import { Application, Status } from "../../src/API";
import GetStorageLinkComponent from "../get-storage-link-component";

interface Props {
  application: Application;
}

export default function ViewApplication({ application }: Props) {
  const { t } = useTranslation("applicationPage");
  return (
    <div className="overflow-x-auto">
      <table dir="ltr" className="table w-full">
        <thead>
          <tr>
            <th>{t("field")}</th>
            <th>{t("value")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t("submitDate")}</td>
            <td>
              {Intl.DateTimeFormat("en", {
                timeStyle: "short",
                dateStyle: "medium",
              }).format(new Date(application.createdAt))}
            </td>
          </tr>

          <tr>
            <td>{t("Status")}</td>
            <td>
              <div className="badge badge-warning">
                {t(
                  `${
                    application.status === Status.ELIGIBLE
                      ? Status.REVIEW
                      : application.status
                  }`
                )}
              </div>
            </td>
          </tr>

          <tr>
            <td>{t("GPA")}</td>
            <td>{application.gpa}</td>
          </tr>

          <tr>
            <td>{t("primaryProgram")}</td>
            <td className="flex flex-col">
              <div>
                {`${
                  application.programs?.items?.sort(
                    (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                  )[0]?.program?.name
                }-${
                  application.programs?.items?.sort(
                    (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                  )[0]?.program?.university?.name
                }`}
              </div>
              {application.programs?.items?.sort(
                (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
              )[0]?.program?.requirements && (
                <div className="stat-desc">
                  {`Requirements: ${
                    application.programs?.items?.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[0]?.program?.requirements
                  }`}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>{t("secondaryProgram")}</td>
            <td className="flex flex-col">
              <div>
                {`${
                  application.programs?.items?.sort(
                    (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                  )[1]?.program?.name
                }-${
                  application.programs?.items?.sort(
                    (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                  )[1]?.program?.university?.name
                }`}
              </div>
              {application.programs?.items?.sort(
                (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
              )[0]?.program?.requirements && (
                <div className="stat-desc">
                  {`Requirements: ${
                    application.programs?.items?.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[0]?.program?.requirements
                  }`}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {t("CPR")} {t("document")}
            </td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.cprDoc}
              ></GetStorageLinkComponent>
            </td>
          </tr>
          <tr>
            <td>
              {t("schoolCertificate")} {t("document")}
            </td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.schoolCertificate}
              ></GetStorageLinkComponent>
            </td>
          </tr>
          <tr>
            <td>
              {t("transcript")} {t("document")}
            </td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.transcriptDoc}
              ></GetStorageLinkComponent>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
