import { Loader, Nav, Player, Hero } from "@/components/Intro";
import { Built, Sport, Net, School, Learning, World, Likes, Contact } from "@/components/Sections";
import { Details } from "@/components/Details";
import { WhoList } from "@/components/Who";
import { Motion } from "@/components/Motion";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <Player />
      <main>
        <Hero />
        <WhoList />
        <Built />
        <Sport />
        <Net />
        <School />
        <Learning />
        <World />
        <Likes />
        <Contact />
      </main>
      <Details />
      <Motion />
    </>
  );
}
