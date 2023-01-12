import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import { Application, Status } from "../../src/API";
import { useTranslation } from "react-i18next";

import cross from "../../public/svg/cross.svg";
import check from "../../public/svg/check.svg";
import glasses from "../../public/svg/glasses.svg";

interface IApplicationCard {
  application: Application;
}

export const ApplicationCard: FC<IApplicationCard> = ({ application }) => {
  const { t } = useTranslation("applications");
  return (
    <div className="relative duration-200 hover:cursor-pointer hover:scale-105">
      <Link
        href={`../applications/${application.id}`}
        className={`pt-6 shadow card  ${
          (application.status === Status.REVIEW ||
            application.status === Status.ELIGIBLE) &&
          "bg-warning"
        } ${application.status === Status.APPROVED && "bg-success"} ${
          application.status === Status.REJECTED && "bg-red-500"
        } ${application.status === Status.WITHDRAWN && "bg-gray-500"}`}
        key={application.id}
      >
        <div className="p-4 bg-white min-h-[15rem] pt-10 card gap-4 flex flex-col justify-between">
          {/* Status */}
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-semibold">
              {t(
                `${
                  application.status === Status.ELIGIBLE
                    ? Status.REVIEW
                    : application.status
                }`
              )}
            </h3>
            <div className=" stat-desc">
              Submit Date:{" "}
              {Intl.DateTimeFormat("en-US").format(
                new Date(application.createdAt)
              )}
            </div>
          </div>
          {/* Programs */}
          <div>
            <div className="mb-2 -mt-2 text-sm stat-title">
              Selected Programs
            </div>
            {application.programs?.items
              .sort((a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0))
              .map((program) => (
                <div key={program?.id} className="stat-desc">
                  {program?.choiceOrder}
                  {"- "}
                  {`${program?.program?.name}-${program?.program?.university?.name}`}
                </div>
              ))}
          </div>
          {/* Attachments */}
          <div>
            <div className="flex gap-2 mb-2 -mt-2 text-sm stat-title">
              Uploaded Attachments{" "}
              {application.attachment?.cprDoc === (undefined || null) ||
                application.attachment?.transcriptDoc === (undefined || null) ||
                application.attachment?.acceptanceLetterDoc ===
                  (undefined || null) ||
                (application.attachment?.signedContractDoc ===
                  (undefined || null) && (
                  <span className="text-error">Not Completed</span>
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <div
                className={`badge  badge-ghost ${
                  !application.attachment?.cprDoc &&
                  "badge-error !badge-outline"
                }`}
              >
                CPR
              </div>
              <div
                className={`badge  badge-ghost ${
                  !application.attachment?.transcriptDoc &&
                  "badge-error !badge-outline"
                }`}
              >
                Transcript
              </div>
              <div
                className={`badge  badge-ghost ${
                  !application.attachment?.acceptanceLetterDoc &&
                  "badge-error !badge-outline"
                }`}
              >
                Acceptance Letter
              </div>
              <div
                className={`badge  badge-ghost ${
                  !application.attachment?.signedContractDoc &&
                  "badge-error !badge-outline"
                }`}
              >
                Signed Contract
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div
        className={`absolute   flex items-center justify-center w-12 h-12 border-2 border-white rounded-full top-2 left-2 ${
          (application.status === Status.REVIEW ||
            application.status === Status.ELIGIBLE) &&
          "bg-warning"
        } ${application.status === Status.APPROVED && "bg-success"} ${
          application.status === Status.REJECTED && "bg-red-500"
        } ${application.status === Status.WITHDRAWN && "bg-gray-500"}`}
      >
        {(application.status === Status.REVIEW ||
          application.status === Status.ELIGIBLE) && (
          <Image
            className="object-contain w-5 aspect-square"
            src={glasses}
            alt="icon"
          ></Image>
        )}
        {application.status === Status.APPROVED && (
          <Image
            className="object-contain w-4 aspect-square"
            src={check}
            alt="icon"
          ></Image>
        )}
        {(application.status === Status.WITHDRAWN ||
          application.status === Status.REJECTED) && (
          <Image
            className="object-contain w-4 aspect-square"
            src={cross}
            alt="icon"
          ></Image>
        )}
      </div>
    </div>
  );
};
