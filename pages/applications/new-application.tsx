import React, { FC } from "react";
import { ApplicationForm } from "../../components/applications/ApplicationForm";
import { PageComponent } from "../../components/PageComponent";
import { GraphQLResult } from "@aws-amplify/api-graphql";

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { API, graphqlOperation } from "aws-amplify";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  async function getPrograms() {
    let q = `
    query ListAllPrograms {
      listPrograms {
        items {
          id
          name
          requirements
          universityID
          universityProgramsId
          updatedAt
          createdAt
          availability
          _version
          _lastChangedAt
          _deleted
          university {
            id
            _deleted
            _version
            name
          }
        }
      }
    }
    `;

    let res = (await API.graphql(graphqlOperation(q))) as GraphQLResult; // your fetch function here

    return res;
  }
  const res = await getPrograms();

  return {
    props: {
      programs: res.data,
    },
  };
};

interface Props {
  programs: any;
}

const NewApplicationPage: FC<Props> = (props) => {
  return (
    <PageComponent title="New Application" authRequired>
      <ApplicationForm programs={props.programs}></ApplicationForm>
    </PageComponent>
  );
};

export default NewApplicationPage;
