import { HomeComponent } from "../components/Home";
import { PageComponent } from "../components/PageComponent";

export default function Home() {
  return (
    <PageComponent title="Home">
      <HomeComponent></HomeComponent>
    </PageComponent>
  );
}
