import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ApplicationForm } from "../../components/applications/ApplicationForm";
import { PageComponent } from "../../components/PageComponent";
import { useAppContext } from "../../contexts/AppContexts";

export default function NewApplicationPage() {
  const { haveActiveApplication } = useAppContext();
  const { push } = useRouter();

  useEffect(() => {
    if (haveActiveApplication) {
      push("/");
    }

    return () => {};
  }, [haveActiveApplication, push]);

  return (
    <PageComponent title="New Application">
      <ApplicationForm></ApplicationForm>
    </PageComponent>
  );
}
