import { PageComponent } from "../components/PageComponent";

import { NextPage } from "next";
import { SignInForm } from "../components/auth/sign-in-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";

interface Props {}

const SignInPage: NextPage<Props> = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isSignedIn) {
      router.replace("/");
    }

    return () => {};
  }, [auth.isSignedIn, router]);

  return (
    <PageComponent title="Sign In">
      <SignInForm></SignInForm>
    </PageComponent>
  );
};

export default SignInPage;