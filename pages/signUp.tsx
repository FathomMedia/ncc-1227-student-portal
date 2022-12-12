import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageComponent } from "../components/PageComponent";
import SignUpForm from "../components/sign-up-form";
import { VerifyEmail } from "../components/verify-email";
import { useAuth } from "../hooks/use-auth";

interface Props {}

const SignUpPage: NextPage<Props> = () => {
  const auth = useAuth();
  const router = useRouter();
  const { cpr } = router.query;

  useEffect(() => {
    if (auth.isSignedIn) {
      router.replace("/");
    }

    return () => {};
  }, [auth.isSignedIn, router]);

  return (
    <PageComponent title="Sign Up">
      {!cpr && (
        <div>
          <h1>This is sign up page</h1>
          <SignUpForm></SignUpForm>
        </div>
      )}
      {cpr && (
        <div>
          <h1>This is verify page</h1>
          <VerifyEmail cpr={`${cpr}`}></VerifyEmail>
        </div>
      )}
    </PageComponent>
  );
};

export default SignUpPage;
