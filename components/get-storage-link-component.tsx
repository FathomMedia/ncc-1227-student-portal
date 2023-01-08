import React, { useState } from "react";
import { Storage } from "aws-amplify";
import Link from "next/link";

interface Props {
  storageKey: string | undefined | null;
}

export default function GetStorageLinkComponent({ storageKey }: Props) {
  const [link, setLink] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getLink(key: string) {
    setIsLoading(true);
    let link = await Storage.get(key);
    setLink(link);
    setIsLoading(false);
  }

  return (
    <div>
      {storageKey &&
        (!link ? (
          <button
            disabled={isLoading}
            className={`btn btn-ghost btn-sm text-primary hover:bg-primary/20 ${
              isLoading && "loading"
            }`}
            onClick={() => getLink(storageKey)}
          >
            {isLoading ? "Loading..." : "Get Link"}
          </button>
        ) : (
          <Link className="link link-success" target="_blank" href={link}>
            View Document
          </Link>
        ))}
      {!storageKey && <div className="text-error">Document Not Submitted</div>}
    </div>
  );
}
