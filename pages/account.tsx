import React from "react";
import ViewAccount from "../components/account/ViewAccount";
import { PageComponent } from "../components/PageComponent";
import { useAppContext } from "../contexts/AppContexts";

export default function AccountPage() {
  const { studentAsStudent } = useAppContext();

  return (
    <PageComponent title="Account">
      {studentAsStudent && (
        <ViewAccount student={studentAsStudent}></ViewAccount>
      )}
    </PageComponent>
  );
}
