import { PageComponent } from "../../components/PageComponent";

import React from "react";
import Link from "next/link";
import { useAppContext } from "../../contexts/AppContexts";
import { Status } from "../../src/API";

export default function ApplicationsPage() {
  const appContext = useAppContext();

  return (
    <PageComponent title={"Applications"} authRequired>
      <div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 [grid-auto-rows:1fr]">
          {appContext.applications.map((application) => (
            <Link
              href={`../applications/${application.id}`}
              className="duration-200 shadow stats hover:cursor-pointer hover:scale-105"
              key={application.id}
            >
              <div className="stat ">
                <div className="stat-title">Status</div>
                <div
                  className={`stat-value ${
                    application.status === Status.REVIEW && "text-info"
                  } ${
                    application.status === Status.APPROVED && "text-success"
                  } ${
                    (application.status === Status.CANCELED ||
                      application.status === Status.WITHDRAWN ||
                      application.status === Status.REJECTED) &&
                    "text-error"
                  }`}
                >
                  {application.status}
                </div>
                <div className="stat-desc">GPA: {application.gpa}</div>
                <div className="stat-desc">
                  Submit Date:{" "}
                  {Intl.DateTimeFormat("en-US").format(
                    new Date(application.createdAt)
                  )}
                </div>
                <div className="divider"></div>
                <div className="mb-2 -mt-2 stat-title">Selected Programs</div>

                {application.programs?.items
                  .sort((a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0))
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
                    <span className="text-error">Not Completed</span>
                  ) : (
                    <span className="text-success">Not Completed</span>
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
