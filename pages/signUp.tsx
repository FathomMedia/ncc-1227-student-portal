import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SignUpForm from "../components/auth/sign-up-form";
import { VerifyEmail } from "../components/auth/verify-email";
import { PageComponent } from "../components/PageComponent";

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
          <SignUpForm></SignUpForm>
        </div>
      )}
      {cpr && (
        <div>
          <VerifyEmail cpr={`${cpr}`}></VerifyEmail>
        </div>
      )}
    </PageComponent>
  );
};

export default SignUpPage;