import React, { useState } from "react";
import { Storage } from "aws-amplify";
import Link from "next/link";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation("applicationPage");

  return (
    <div>
      {storageKey &&
        (!link ? (
          <button
            disabled={isLoading}
            type="button"
            className={`btn btn-ghost btn-sm text-primary hover:bg-primary/20 ${
              isLoading && "loading"
            }`}
            onClick={() => getLink(storageKey)}
          >
            {isLoading ? t("loading") : t("getLink")}
          </button>
        ) : (
          <Link className="link link-success" target="_blank" href={link}>
            {t("view")} {t("document")}
          </Link>
        ))}
      {!storageKey && (
        <div className="text-error">{t("documentNotSubmitted")}</div>
      )}
    </div>
  );
}
