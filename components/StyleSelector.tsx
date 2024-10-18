'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useTheme } from "next-themes"
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Colors } from '@/lib/types'
import { defaultColors } from '@/lib/ThemesColors'
import { hexToHsl } from '@/lib/ColorFormat'
import { cn } from '@/lib/utils'
import { ColorPicker } from './ui/color-picker'


export const StyleSelector = ({ setColors }: { setColors(colors: Colors): void }) => {
  const { theme, setTheme } = useTheme();
  const [raduis, setRaduis] = useState('1.0');
  const [defaultColor, setDefaultColor] = useState('Blue');

  const [customColors, setCustomColors] = useState({
    '--background': '#FFFFFF',
    '--primary': '#FFFFFF',
    '--card': '#FFFFFF',
    '--input': '#FFFFFF',
    '--primary-foreground': '#FFFFFF',
    '--muted-foreground': '#FFFFFF',
  });



  const handleRaduis = (e: string) => {
    setRaduis(e);
    setColors({ '--radius': `${e}rem` });
  }

  const handleColor = (color: string) => {
    setDefaultColor(color);
    setColors(defaultColors[color][theme]);
  }

  const toggleTheme = (theme: string) => {
    setTheme(theme);
    if (defaultColor != "") {
      setColors(defaultColors[defaultColor][theme]);
    }
  }

  const handleCustom = (key: string, value:string) => {
    setCustomColors({ ...customColors, [key]: value });

    setColors({[key]: hexToHsl(value) });
  }



  return (

    <div className="md:block hidden w-96 p-4 border-r">
      <div className='flex justify-between'>
        <h2 className="text-xl font-bold mb-4">Customize</h2>
      </div>
      <p className="text-sm mb-4">Pick a style and color for your components.</p>

      <div className="mb-4">
        <div className='flex justify-between'>
          <h3 className="font-semibold mb-2">Color</h3>

          {/* <div className='flex items-center space-x-2'>
            <Switch id="dark-mode" onCheckedChange={(e) => { toggleTheme(e ? 'dark' : 'light') }} />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div> */}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button className='hidden bg-zinc-500 bg-slate-500 bg-stone-500 bg-gray-500 bg-neutral-500 bg-red-500 bg-rose-500 bg-orange-500 bg-green-500 bg-blue-500 bg-yellow-500 bg-violet-500'></Button>
          {['Zinc', 'Slate', 'Stone', 'Gray', 'Neutral', 'Red', 'Rose', 'Orange', 'Green', 'Blue', 'Yellow', 'Violet'].map((color) => (
            <Button onClick={() => handleColor(color)} key={color} variant="outline" size="sm" className={cn(`bg-${color.toLowerCase()}-500  hover:bg-${color.toLowerCase()}-500/10`, color === defaultColor && `border-white border-2`)}>{color}</Button>
          ))}
        </div>
      </div>



      <div className="mb-4">
        <h3 className="font-semibold mb-2">Radius</h3>
        <div className="grid grid-cols-5 gap-2">
          {['0', '0.3', '0.5', '0.75', '1.0'].map((r) => (
            <Button onClick={() => handleRaduis(r)} key={r} variant="outline" size="sm" className={r === raduis ? 'bg-primary hover:bg-primary text-primary-foreground' : ''}>{r}</Button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Random</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className='hover:bg-white hover:text-black bg-white text-black col-span-2'>Generate</Button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Custom</h3>
        <div className="grid grid-cols-2 gap-2">

          <ColorPicker
            variant="outline" size="sm"
            value={customColors['--background']} onChange={(value) =>handleCustom('--background', value)} text='Background'
          />
          <ColorPicker
            variant="outline" size="sm"
            value={customColors['--card']} onChange={(value) =>handleCustom('--card', value)} text='Card'
          />
          <ColorPicker
            variant="outline" size="sm"
            value={customColors['--primary']} onChange={(value) =>handleCustom('--primary', value)} text='Primary'
          />
          <ColorPicker
            variant="outline" size="sm"
            value={customColors['--input']} onChange={(value) =>handleCustom('--input', value)} text='Input'
          />
          <ColorPicker
            variant="outline" size="sm"
            value={customColors['--muted-foreground']} onChange={(value) =>handleCustom('--muted-foreground', value)} text='Muted'
          />
          <ColorPicker
            variant="outline" size="sm"
            value={customColors['--primary-foreground']} onChange={(value) =>handleCustom('--primary-foreground', value)} text='Text'
          />


        </div>
      </div>
    </div>
  )
}
