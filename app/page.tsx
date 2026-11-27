import { Loader, Nav, Player, Hero } from "@/components/Intro";
import { Words, Built, Sport, Net, School, Learning, World, Likes, Contact } from "@/components/Sections";
import { Details } from "@/components/Details";
import { Motion } from "@/components/Motion";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <Player />
      <main>
        <Hero />
        <Words />
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
