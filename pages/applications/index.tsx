import { PageComponent } from "../../components/PageComponent";

import React from "react";
import Link from "next/link";
import { useAppContext } from "../../contexts/AppContexts";
import { Status } from "../../src/API";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { ApplicationCard } from "../../components/applications/ApplicationCard";
import { getStatusOrder } from "../../src/HelperFunctions";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "footer",
        "pageTitles",
        "applications",
        "signIn",
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
            .sort((a, b) => {
              if (a.status && b.status) {
                if (getStatusOrder(b.status) > getStatusOrder(a.status))
                  return 1;
                if (getStatusOrder(b.status) < getStatusOrder(a.status))
                  return -1;
              }
              return 0;
            })
            .map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}

          {!appContext.haveActiveApplication && (
            <Link
              href={"../applications/new-application"}
              className="duration-200 shadow stats hover:cursor-pointer hover:scale-105"
            >
              <div className="flex flex-col items-center justify-center stat">
                <div className="prose">
                  <h3>{t("createNewApplication")}</h3>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </PageComponent>
  );
}
