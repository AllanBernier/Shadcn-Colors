'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useTheme } from "next-themes"
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
  html {
    --color-text: black;
    --color-background: white;
    --color-primary: rebeccapurple;
  }
`;

export const StyleSelector = () => {
  const { setTheme } = useTheme();


  
  return (

    <div className="md:block hidden w-96 p-4 border-r ">
      <div className='flex justify-between'>
        <h2 className="text-xl font-bold mb-4">Customize</h2>
        <div className='flex items-center space-x-2'>
          <Switch id="dark-mode" onCheckedChange={(e) => { setTheme(e ? 'dark' : 'light') }} />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>
      <p className="text-sm mb-4">Pick a style and color for your components.</p>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Color</h3>
        <div className="grid grid-cols-3 gap-2">
          {['Zinc', 'Slate', 'Stone', 'Gray', 'Neutral', 'Red', 'Rose', 'Orange', 'Green', 'Blue', 'Yellow', 'Violet'].map((color) => (
            <Button key={color} variant="outline" size="sm" className={color === 'Green' ? 'bg-green-500' : ''}>{color}</Button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Radius</h3>
        <div className="grid grid-cols-5 gap-2">
          {['0', '0.3', '0.5', '0.75', '1.0'].map((radius) => (
            <Button key={radius} variant="outline" size="sm" className={radius === '1.0' ? 'bg-gray-700' : ''}>{radius}</Button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Custom</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className='col-span-2'>Global</Button>
          <Button variant="outline" size="sm" className='col-span-2'>Random</Button>

          <Button variant="outline" size="sm" className='bg-primary hover:bg-primary/90'>Primary</Button>
          <Button variant="outline" size="sm" className='bg-primary-foreground hover:bg-primary-foreground/90'>Foreground</Button>

          <Button variant="outline" size="sm" className='bg-card hover:bg-card/90 '>Card</Button>
          <Button variant="outline" size="sm" className='bg-card-foreground hover:bg-card-foreground/90 '>Foreground</Button>

          <Button variant="outline" size="sm" className='bg-background hover:bg-background/90'>Background</Button>
          <Button variant="outline" size="sm" className='bg-back hover:bg-back/90'>Foreground</Button>

          <Button variant="outline" size="sm" className='bg-primary hover:bg-primary/90'>Muted</Button>
          <Button variant="outline" size="sm" className='bg-primary hover:bg-primary/90'>Foreground</Button>

        </div>
      </div>
    </div>
  )
}
