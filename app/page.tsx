import { ShadcnTemplate } from "@/components/ShadcnTemplate";
import { StyleSelector } from "@/components/StyleSelector";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="flex w-screen h-screen bg-background">
      <TailwindIndicator/>
      <StyleSelector />


      <ScrollArea className="flex-1 px-6 ">
        <ShadcnTemplate />
      </ScrollArea>

    </div>
  );
}
