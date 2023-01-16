import React, { useState } from "react";
import ViewAccount from "../components/account/ViewAccount";
import ViewParentInfo from "../components/account/ViewParentInfo";
import { PageComponent } from "../components/PageComponent";
import { useAppContext } from "../contexts/AppContexts";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "footer",
        "pageTitles",
      ])),
    },
  };
};

export default function AccountPage() {
  const { studentAsStudent } = useAppContext();

  const [isStudentInfo, setIsStudentInfo] = useState(true);

  return (
    <PageComponent title="Account">
      <div className="flex flex-col justify-center">
        <div className="mx-auto mb-6 tabs">
          <a
            onClick={() => setIsStudentInfo(true)}
            className={`tab tab-bordered ${isStudentInfo && " tab-active"}`}
          >
            Student Info
          </a>
          <a
            onClick={() => setIsStudentInfo(false)}
            className={`tab tab-bordered ${!isStudentInfo && " tab-active"}`}
          >
            Parents Info
          </a>
        </div>
        {studentAsStudent && isStudentInfo && (
          <ViewAccount student={studentAsStudent}></ViewAccount>
        )}
        {studentAsStudent && studentAsStudent.ParentInfo && !isStudentInfo && (
          <ViewParentInfo
            parentInfo={studentAsStudent.ParentInfo}
          ></ViewParentInfo>
        )}
      </div>
    </PageComponent>
  );
}
