import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";
import type { AppProps } from "next/app";
import { Amplify, API, Auth, Storage } from "aws-amplify";
import config from "../src/aws-exports";

import { AppProvider } from "../contexts/AppContexts";
import { AuthProvider } from "../hooks/use-auth";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  Amplify.configure({ ...config, ssr: true });
  Auth.configure({ ...config, ssr: true });
  API.configure({ ...config, ssr: true });
  Storage.configure({ ...config, ssr: true });

  const { locale } = useRouter();

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <AuthProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </AuthProvider>
    </div>
  );
}

export default appWithTranslation(App);
