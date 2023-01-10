import { PageComponent } from "../../components/PageComponent";

import React from "react";
import Link from "next/link";
import { useAppContext } from "../../contexts/AppContexts";
import { Status } from "../../src/API";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "pageTitles",
        "applications",
      ])),
    },
  };
};

export default function ApplicationsPage() {
  const appContext = useAppContext();

  const { t } = useTranslation("applications");

  return (
    <PageComponent title={"Applications"} authRequired>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 [grid-auto-rows:1fr]">
          {appContext.applications
            .sort((a) =>
              a.status === Status.APPROVED
                ? -1
                : a.status === Status.REVIEW || a.status === Status.ELIGIBLE
                ? -0.5
                : 1
            )
            .map((application) => (
              <Link
                href={`../applications/${application.id}`}
                className="duration-200 shadow stats hover:cursor-pointer hover:scale-105"
                key={application.id}
              >
                <div className={`stat border rounded-2xl `}>
                  {/* <div className="stat-title">{t("Status")}</div> */}
                  <div
                    className={` text-center stat-value text-gray-600 text-xl ${
                      (application.status === Status.REVIEW ||
                        application.status === Status.ELIGIBLE) &&
                      "text-warning"
                    } ${
                      application.status === Status.APPROVED && "text-success"
                    } ${
                      (application.status === Status.WITHDRAWN ||
                        application.status === Status.REJECTED) &&
                      "text-red-500"
                    }`}
                  >
                    {t(
                      `${
                        application.status === Status.ELIGIBLE
                          ? Status.REVIEW
                          : application.status
                      }`
                    )}
                  </div>
                  {/* <div className="stat-desc">GPA: {application.gpa}</div> */}
                  <div className="text-center stat-desc">
                    Submit Date:{" "}
                    {Intl.DateTimeFormat("en-US").format(
                      new Date(application.createdAt)
                    )}
                  </div>
                  <div className="divider"></div>
                  <div className="mb-2 -mt-2 text-sm stat-title">
                    Selected Programs
                  </div>

                  {application.programs?.items
                    .sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )
                    .map((program) => (
                      <div key={program?.id} className="stat-desc">
                        {program?.choiceOrder}
                        {"- "}
                        {`${program?.program?.name}-${program?.program?.university?.name}`}
                      </div>
                    ))}
                  <div className="divider"></div>
                  <div className="stat-desc">
                    Attachments:{" "}
                    {application.attachment?.cprDoc === (undefined || null) ||
                    application.attachment?.transcriptDoc ===
                      (undefined || null) ||
                    application.attachment?.acceptanceLetterDoc ===
                      (undefined || null) ||
                    application.attachment?.signedContractDoc ===
                      (undefined || null) ? (
                      <span className="font-bold text-red-500">
                        Not Completed
                      </span>
                    ) : (
                      <span className="font-bold">Completed</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}

          {!appContext.haveActiveApplication && (
            <Link
              href={"../applications/new-application"}
              className="duration-200 shadow stats hover:cursor-pointer hover:scale-105"
            >
              <div className="flex flex-col items-center justify-center stat">
                <div className="prose">
                  <h3>Create new Application</h3>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </PageComponent>
  );
}
