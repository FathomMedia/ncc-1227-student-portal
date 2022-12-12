import Link from "next/link";

export const HomeComponent = () => {
  return (
    <div>
      <div className="mx-auto prose">
        <h1>This is the landing page</h1>
        <p>
          click the following link to{" "}
          <Link className="link link-primary" href={"/signIn"}>
            SignIn
          </Link>
        </p>
        <p>
          click the following link to{" "}
          <Link className="link link-primary" href={"/signUp"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
