import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24 bg-purple-101 text-2xl">
      Hello Digiwhistle
      <Button className="drop-shadow-y-elevation-lg " size={"xl"}>
        Shadcn button
      </Button>
      <Button className="drop-shadow-y-elevation-xs" variant={"secondary"} size={"lg"}>
        Shadcn button
      </Button>
      <Button className="drop-shadow-y-elevation-xs" disabled variant={"secondary"} size={"lg"}>
        Shadcn button
      </Button>
      <Button className="drop-shadow-y-elevation-xs " disabled size={"default"}>
        Shadcn button
      </Button>
      <Button className="drop-shadow-y-elevation-xs" variant={"tertiary"} size={"sm"}>
        Shadcn button
      </Button>
      <Button className="drop-shadow-y-elevation-xs" disabled variant={"tertiary"} size={"sm"}>
        Shadcn button
      </Button>
      <Button className="drop-shadow-y-elevation-xs" size={"xs"}>
        Shadcn button
      </Button>
    </main>
  );
}
