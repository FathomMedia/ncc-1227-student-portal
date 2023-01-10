import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks/use-auth";
import { SignInForm } from "./auth/sign-in-form";

import logo from "../public/svg/logo.svg";
import account from "../public/svg/account.svg";
import background from "../public/images/graduates-university.png";
import Image from "next/image";
import { useAppContext } from "../contexts/AppContexts";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  authRequired?: boolean;
  header?: ReactNode;
}

export const PageComponent: FC<PropsWithChildren<Props>> = (props) => {
  const { isSignedIn, user, signOut } = useAuth();
  const { student, resetContext } = useAppContext();
  const router = useRouter();
  const titleTranslation = useTranslation("pageTitles");
  const footerTranslation = useTranslation("footer");

  async function signUserOut() {
    await signOut().then(() => {
      resetContext();
    });
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col justify-between min-h-screen">
        <div className="relative bg-secondary md:m-10 rounded-b-5xl md:rounded-b-2xl md:rounded-t-2xl ">
          <div
            className="relative object-cover w-full rounded-b-5xl md:rounded-b-2xl overflow-clip md:rounded-t-2xl"
            style={{
              backgroundImage: `url(${background.src})`,
              backgroundSize: "cover",
              backgroundPosition: "50%",
            }}
          >
            <div className="relative flex flex-col items-center w-full gap-3 bg-secondary/80 text-secondary-content p-11 md:p-20 md:pt-10">
              <Image
                className="w-40 md:w-52 btn btn-ghost"
                src={logo}
                alt="logo"
                onClick={() => router.push("/")}
              />
              {user && (
                <div
                  tabIndex={0}
                  className="flex flex-col items-center p-2 rounded-lg hover:cursor-pointer dropdown dropdown-bottom md:dropdown-end md:items-end md:absolute md:right-4 md:top-4 glass"
                >
                  <div className="flex ">
                    <Image className="w-10 p-2 " src={account} alt="account" />
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="block mr-2 stroke-current w-7 aspect-square"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg> */}
                    <div className="">
                      <p>{student?.getStudent?.fullName}</p>
                      <p>{user?.getUsername()}</p>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="p-2 mt-2 shadow dropdown-content text-secondary menu bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link href={"/account"}>
                        {footerTranslation.t("account")}
                      </Link>
                    </li>
                    <li>
                      <div onClick={signUserOut}>
                        {footerTranslation.t("signOut")}
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              <div className="w-full mt-10 md:mt-16">{props.header}</div>
              {!props.header && (
                <div className="prose prose-headings:text-white">
                  <h1 className="font-semibold">
                    {titleTranslation.t(props.title)}
                  </h1>
                </div>
              )}
            </div>
          </div>

          <div className="z-40 pt-20 -mt-10 bg-base-100 p-11">
            {props.authRequired && !isSignedIn ? (
              <div>
                <SignInForm></SignInForm>
              </div>
            ) : (
              props.children
            )}
          </div>
        </div>
        <div className="divide-y divide-secondary-content">
          <footer className="justify-center p-10 md:justify-around footer bg-secondary text-secondary-content">
            <div className="flex flex-col justify-center h-full mx-auto">
              <Image
                className="w-40 md:w-52 btn btn-ghost"
                src={logo}
                alt="logo"
                onClick={() => router.push("/")}
              />
            </div>
            <div className="flex flex-col items-center mx-auto md:items-start">
              <span className="opacity-100 footer-title text-primary">
                {footerTranslation.t("quickLinks")}
              </span>
              <a className="link link-hover">
                {footerTranslation.t("theFund")}
              </a>
              <a className="link link-hover">
                {footerTranslation.t("aboutUs")}
              </a>
              <a className="link link-hover">
                {footerTranslation.t("application")}
              </a>
              <a className="link link-hover">
                {footerTranslation.t("contact")}
              </a>
            </div>
            <div className="flex flex-col items-center mx-auto md:items-start">
              <span className="opacity-100 footer-title text-primary">
                {footerTranslation.t("contactUs")}
              </span>
              <a className="link link-hover">1744 4444</a>
              <a className="link link-hover">edutrust@meo.gov.bh</a>
              <a className="link link-hover">
                Building 000, Road 000, Block 000{" "}
              </a>
              <a className="link link-hover">
                {footerTranslation.t("manamaKingdomOfBahrain")}{" "}
              </a>
            </div>
          </footer>
          <div className="justify-center px-10 py-4 text-center footer bg-secondary text-secondary-content">
            <p>© 2022 isa bin salman education charitable trust</p>
          </div>
        </div>
      </div>
    </>
  );
};
