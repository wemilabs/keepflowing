import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}
