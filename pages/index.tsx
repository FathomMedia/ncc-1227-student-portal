import { useRouter } from "next/router";
import { HomeComponent } from "../components/Home";
import { PageComponent } from "../components/PageComponent";
import { useAppContext } from "../contexts/AppContexts";
import { useAuth } from "../hooks/use-auth";

export default function Home() {
  const router = useRouter();
  const auth = useAuth();
  const { haveActiveApplication } = useAppContext();
  return (
    <PageComponent
      title="Home"
      header={
        <div className="mx-auto prose md:mx-0 md:mr-auto prose-p:text-white prose-headings:text-white">
          <div className="flex flex-col text-center md:text-start">
            <h1 className="mb-1 font-semibold md:border-l-8 md:pl-4">
              Enroll for 2023
            </h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscin.</p>
            <div className="flex flex-col gap-3 mx-auto md:flex-row md:mx-0">
              <button
                type="button"
                className="w-full text-white md:w-auto btn btn-primary"
                onClick={() => router.push("/applications")}
              >
                {haveActiveApplication ? "Track Applications" : "Enroll Now"}
              </button>
              <button
                type="button"
                className="w-full md:w-auto btn btn-outline btn-primary"
                onClick={() =>
                  auth.isSignedIn ? auth.signOut() : router.push("/signIn")
                }
              >
                {auth.isSignedIn ? "Sign Out" : "Login"}
              </button>
            </div>
          </div>
        </div>
      }
    >
      <HomeComponent></HomeComponent>
    </PageComponent>
  );
}
