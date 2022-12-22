import { CardInfoComponent } from "./CardInfo";
import logs from "../public/svg/logs.svg";
import search from "../public/svg/search.svg";
import info from "../public/svg/info.svg";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AppContexts";

export const HomeComponent = () => {
  const router = useRouter();
  const { haveActiveApplication } = useAppContext();
  return (
    <div>
      <div className="flex flex-col gap-10 mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-900 ">
          Available Services
        </h1>

        <div className="grid grid-cols-1 gap-10 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {!haveActiveApplication && (
            <CardInfoComponent
              icon={logs}
              title={"Apply for scholarship"}
              description={"Lorem ipsum dolor sit amet, consectetur adipiscin."}
              action={() => router.push("/applications")}
              actionTitle={"Enroll Now"}
            ></CardInfoComponent>
          )}
          <CardInfoComponent
            icon={search}
            title={"Track application"}
            description={"Lorem ipsum dolor sit amet, consectetur adipiscin."}
            action={() => {}}
            actionTitle={"Track"}
          ></CardInfoComponent>
          <CardInfoComponent
            icon={info}
            title={"Information center"}
            description={"Lorem ipsum dolor sit amet, consectetur adipiscin."}
            action={() => {}}
            actionTitle={"Get Info"}
          ></CardInfoComponent>
        </div>
      </div>
    </div>
  );
};
