'use client'

import { ShadcnTemplate } from "@/components/ShadcnTemplate";
import { StyleSelector } from "@/components/StyleSelector";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import { Colors } from "@/lib/types";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Home() {

  const { theme, setTheme } = useTheme();

  setTheme('dark');


  const [lightColors, setLightColors] = useState<Colors>({
    'background': '142.1 70.6% 45.3%',
    'foreground': '240 10% 3.9%',
    'card': '24 9.8% 10%',
    'card-foreground': '0 0% 95%',
    'popover': '0 0% 9%',
  });

  const [darkColors, setDarkColors] = useState<Colors>({
    'background': '142.1 70.6% 45.3%',
    'foreground': '240 10% 3.9%',
    'card': '24 9.8% 10%',
    'card-foreground': '0 0% 95%',
    'popover': '0 0% 9%',
  });




  const handleColors = (colors: Colors) => {

    theme === 'light' ? setLightColors({ ...lightColors, ...colors }) : setDarkColors({ ...darkColors, ...colors })

    Object.entries({ ... (theme === 'light' ? lightColors : darkColors), ...colors }).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
  
  return (
    <div className="md:flex md:w-screen md:h-screen bg-background"
    >
      <TailwindIndicator />
      <StyleSelector setColors={handleColors} />
      <Toaster />


      <ScrollArea className="flex-1 px-6 md:h-full h-[90vh]">
        <ShadcnTemplate />
      </ScrollArea>

    </div>
  );
}
