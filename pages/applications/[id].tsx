import { API, Storage, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PageComponent } from "../../components/PageComponent";
import { Application, GetApplicationQueryVariables } from "../../src/API";
import { getApplication } from "../../src/graphql/queries";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import ViewApplication from "../../components/applications/ViewApplication";
import { CognitoUser } from "@aws-amplify/auth";
import { ApplicationForm } from "../../components/applications/ApplicationForm";

interface Props {
  application: Application | null;
  programs: any;
}

interface DownloadLinks {
  cprDoc?: string | null;
  acceptanceLetterDoc?: string | null;
  transcriptDoc?: string | null;
  signedContractDoc?: string | null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Auth, API } = withSSRContext(ctx);

  let authUser = (await Auth.currentAuthenticatedUser()) as
    | CognitoUser
    | undefined;

  const { id } = ctx.query;

  let q = `query MyQuery {
    getApplication(id: "${id}") {
            id
            _version
            _deleted
            gpa
            createdAt
            attachmentID
            applicationAttachmentId
            _lastChangedAt
            studentCPR
            status
            updatedAt
            attachment {
              id
              transcriptDoc
              signedContractDoc
              cprDoc
              acceptanceLetterDoc
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            programs {
              items {
                id
                choiceOrder
                program {
                  id
                  name
                  requirements
                  availability
                  university {
                    id
                    name
                  }
                  _version
                  _deleted
                }
                _version
                _deleted
              }
            }
            studentLogs {
              items {
                id
                dateTime
                studentCPR
                snapshot
                reason
                applicationStudentLogsId
                applicationID
                _version
              }
            }
          }
  }
  `;

  const res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;
  let application = res.data?.getApplication as Application;

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
  const data = await getPrograms();

  return {
    props: {
      application:
        authUser?.getUsername() === application.studentCPR && application,
      programs: data.data,
    },
  };
};

export default function SingleApplicationPage({
  application,
  programs,
}: Props) {
  const [isEdit, setIsEdit] = useState(true);

  const [downloadLinks, setDownloadLinks] = useState<DownloadLinks | undefined>(
    undefined
  );

  useEffect(() => {
    getDownLoadLinks();

    async function getDownLoadLinks() {
      let cprDoc = application?.attachment?.cprDoc
        ? await Storage.get(application?.attachment?.cprDoc)
        : null;

      let acceptanceLetterDoc = application?.attachment?.acceptanceLetterDoc
        ? await Storage.get(application?.attachment?.acceptanceLetterDoc)
        : null;
      let transcriptDoc = application?.attachment?.transcriptDoc
        ? await Storage.get(application?.attachment?.transcriptDoc)
        : null;
      let signedContractDoc = application?.attachment?.signedContractDoc
        ? await Storage.get(application?.attachment?.signedContractDoc)
        : null;

      const downloadLinks: DownloadLinks = {
        cprDoc: cprDoc,
        acceptanceLetterDoc: acceptanceLetterDoc,
        transcriptDoc: transcriptDoc,
        signedContractDoc: signedContractDoc,
      };

      setDownloadLinks(downloadLinks);
    }

    return () => {};
  }, [application]);

  return (
    <PageComponent title="Application" authRequired>
      <div className="flex justify-center w-full py-4 mb-6 border border-gray-400 rounded-2xl px-7">
        <button
          className="w-full btn btn-primary"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "View" : "Edit"}
        </button>
      </div>

      {application && downloadLinks && !isEdit && (
        <ViewApplication
          application={application}
          downloadLinks={downloadLinks}
        />
      )}

      {application && isEdit && (
        <ApplicationForm application={application} programs={programs} />
      )}

      {!application && (
        <div className="flex flex-col items-center justify-center">
          <div className="prose">
            <h1 className="text-error">Access denied</h1>
          </div>
        </div>
      )}
    </PageComponent>
  );
}
