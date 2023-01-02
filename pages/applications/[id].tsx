import { Storage, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { PageComponent } from "../../components/PageComponent";
import { Application, Status } from "../../src/API";
import ViewApplication from "../../components/applications/ViewApplication";
import { CognitoUser } from "@aws-amplify/auth";
import { ApplicationForm } from "../../components/applications/ApplicationForm";
import {
  DownloadLinks,
  getApplicationData,
  listAllPrograms,
} from "../../src/CustomAPI";

interface Props {
  application: Application | null;
  programs: any;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Auth } = withSSRContext(ctx);

  let authUser = (await Auth.currentAuthenticatedUser()) as
    | CognitoUser
    | undefined;

  const { id } = ctx.query;

  let application = await getApplicationData(`${id}`);

  const programs = await listAllPrograms();

  return {
    props: {
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
  const [isEdit, setIsEdit] = useState(false);

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
      {(application?.status === Status.REVIEW ||
        application?.status === Status.ELIGIBLE) && (
        <div className="flex justify-center w-full py-4 mb-6 border border-gray-400 rounded-2xl px-7">
          <button
            className="w-full btn btn-primary"
            onClick={() => setIsEdit(!isEdit)}
            type="button"
          >
            {isEdit ? "View" : "Edit"}
          </button>
        </div>
      )}

      {application && downloadLinks && !isEdit && (
        <ViewApplication
          application={application}
          downloadLinks={downloadLinks}
        />
      )}

      {application && isEdit && (
        <ApplicationForm
          application={application}
          programs={programs}
          downloadLinks={downloadLinks}
        />
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
