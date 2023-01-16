import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { PageComponent } from "../../components/PageComponent";
import { Application, Status } from "../../src/API";
import ViewApplication from "../../components/applications/ViewApplication";
import { CognitoUser } from "@aws-amplify/auth";
import { ApplicationForm } from "../../components/applications/ApplicationForm";
import { getApplicationData, listAllPrograms } from "../../src/CustomAPI";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

interface Props {
  application: Application | null;
  programs: any;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Auth } = withSSRContext(ctx);
  const { locale } = ctx;

  let authUser = (await Auth.currentAuthenticatedUser()) as
    | CognitoUser
    | undefined;

  const { id } = ctx.query;

  let application = await getApplicationData(`${id}`);

  const programs = await listAllPrograms();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "footer",
        "pageTitles",
        "applicationPage",
      ])),
      application:
        authUser?.getUsername() === application?.studentCPR && application,
      programs: programs,
    },
  };
};

export default function SingleApplicationPage({
  application,
  programs,
}: Props) {
  const { t } = useTranslation("applicationPage");

  const [isEdit, setIsEdit] = useState(false);

  return (
    <PageComponent title={"Application"} authRequired>
      {(application?.status === Status.REVIEW ||
        application?.status === Status.NOT_COMPLETED ||
        application?.status === Status.ELIGIBLE) && (
        <div className="flex justify-end pb-5 px-7">
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={() => setIsEdit(!isEdit)}
            type="button"
          >
            {isEdit ? t("view") : t("edit")}
          </button>
        </div>
      )}
      {application && !isEdit && <ViewApplication application={application} />}

      {application && isEdit && (
        <ApplicationForm application={application} programs={programs} />
      )}

      {!application && (
        <div className="flex flex-col items-center justify-center">
          <div className="prose">
            <h1 className="text-error">{t("accessDenied")}</h1>
          </div>
        </div>
      )}
    </PageComponent>
  );
}
