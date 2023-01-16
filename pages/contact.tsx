import React from "react";
import { PageComponent } from "../components/PageComponent";
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

const ContactPage = () => {
  return (
    <div>
      <PageComponent title={"Contact us"}>
        <div className="mx-auto prose text-center divide-y">
          <div>
            <h4>Email</h4>
            <p>edutrust@meo.gov.bh</p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>17444444</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>edutrust@meo.gov.bh</p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>17444444</p>
          </div>
          <div>
            <h4>Address</h4>
            <p>Building 000, Road 000, Block 000</p>
            <p>manamaKingdomOfBahrain</p>
          </div>
        </div>
      </PageComponent>
    </div>
  );
};

export default ContactPage;
