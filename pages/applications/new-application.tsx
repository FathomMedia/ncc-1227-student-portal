import React, { FC } from "react";
import { ApplicationForm } from "../../components/applications/ApplicationForm";
import { PageComponent } from "../../components/PageComponent";
import { GetServerSideProps } from "next";
import { listAllPrograms } from "../../src/CustomAPI";
import { Program } from "../../src/API";
import { useAppContext } from "../../contexts/AppContexts";

export const getServerSideProps: GetServerSideProps = async () => {
  const programs = await listAllPrograms();

  return {
    props: {
      programs: programs,
    },
  };
};

interface Props {
  programs: Program[];
}

const NewApplicationPage: FC<Props> = (props) => {
  const { haveActiveApplication } = useAppContext();
  return (
    <PageComponent title="New Application" authRequired>
      {<ApplicationForm programs={props.programs}></ApplicationForm>}
    </PageComponent>
  );
};

export default NewApplicationPage;
