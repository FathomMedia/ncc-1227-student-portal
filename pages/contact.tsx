import React from "react";
import { PageComponent } from "../components/PageComponent";

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
