import { PageComponent } from "../components/PageComponent";

import { NextPage } from "next";
import { SignInForm } from "../components/sign-in-form";

interface Props {}

const SignInPage: NextPage<Props> = () => {
  return (
    <PageComponent title="Sign In">
      <SignInForm></SignInForm>
    </PageComponent>
  );
};

export default SignInPage;
