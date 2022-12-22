import { API } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { PageComponent } from "../../components/PageComponent";
import { Application, GetApplicationQueryVariables } from "../../src/API";
import { getApplication } from "../../src/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";

// export const getServerSideProps: GetServerSideProps = async (context) => {

//     return {
//         props: {}
//     }
// }

interface Props {
  application: Application | null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  let mutationInput: GetApplicationQueryVariables = {
    id: `${id}`,
  };

  const res = (await API.graphql({
    query: getApplication,
    variables: mutationInput,
  })) as GraphQLResult<any>;

  return {
    props: {
      application: res.data?.getApplication as Application,
    },
  };
};

export default function SingleApplicationPage({ application }: Props) {
  return (
    <PageComponent title="Application" authRequired>
      <div>SingleApplicationPage</div>
      <div className="stat-title">{application?.createdAt}</div>
      <div className="stat-value">{application?.status}</div>
      <div className="stat-desc">{application?.gpa}</div>
    </PageComponent>
  );
}
