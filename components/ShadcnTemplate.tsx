'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'
import { Calendar } from './ui/calendar'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { ChevronDown, MinusIcon, MoreHorizontal, PlusCircle, PlusIcon, Send, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Input } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Progress } from './ui/progress'
import { Label } from './ui/label'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]



const goals = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]


const barChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
}

interface Payment {
  id: number;
  status: 'Success' | 'Processing' | 'Failed';
  email: string;
  amount: number;
}

const initialPayments: Payment[] = [
  { id: 1, status: 'Success', email: 'ken99@yahoo.com', amount: 316.00 },
  { id: 2, status: 'Success', email: 'abe45@gmail.com', amount: 242.00 },
  { id: 3, status: 'Processing', email: 'monserrat44@gmail.com', amount: 837.00 },
  { id: 4, status: 'Success', email: 'silas22@gmail.com', amount: 874.00 },
  { id: 5, status: 'Failed', email: 'carmella@hotmail.com', amount: 721.00 },
]

export const ShadcnTemplate = () => {
  const [date, setDate] = useState<Date[]>([new Date()])
  const [goal, setGoal] = useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi, how can I help you today?", sender: 'agent' },
    { id: 2, text: "Hey, I'm having trouble with my account.", sender: 'user' },
    { id: 3, text: "What seems to be the problem?", sender: 'agent' },
    { id: 4, text: "I can't log in.", sender: 'user' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };

  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [filter, setFilter] = useState('')
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const filteredPayments = payments.filter(payment =>
    payment.email.toLowerCase().includes(filter.toLowerCase())
  )

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }



  return (
    <div className="grid xl:grid-cols-2 gap-6 py-6">

      <div className='flex flex-col gap-6 h-full'>
        <div className='grid sm:grid-cols-2 gap-6'>

          {/* Line Chart */}
          <Card className="w-full h-full bg-card">
            <CardHeader>
              <CardTitle>Line Chart</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>


          {/* Bar Chart */}
          <Card className="w-full h-full bg-card">
            <CardHeader>
              <CardTitle>Bar Chart - Multiple</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>


        {/* Payments */}
        <Card className="w-full mx-auto ">
          <CardHeader>
            <CardTitle>Payments</CardTitle>
            <CardDescription>Manage your payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <Input
                className="w-64 "
                placeholder="Filter emails..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Amount</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${payment.status === 'Success' ? 'bg-green-500' :
                            payment.status === 'Processing' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                        />
                        {payment.status}
                      </div>
                    </TableCell>
                    <TableCell>{payment.email}</TableCell>
                    <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm ">
                {selectedRows.length} of {filteredPayments.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button variant="outline" className="">
                  Previous
                </Button>
                <Button variant="outline" className="">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='grid sm:grid-cols-2 gap-6'>

          {/* This week */}
          <Card className='w-full'>
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>

          {/* This month */}
          <Card className='w-full'>
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-4xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={12} aria-label="12% increase" />
            </CardFooter>
          </Card>

        </div>

      </div>


      <div className='flex flex-col gap-6 h-full'>
        {/* messages */}
        <Card className="w-full mx-auto">
          <CardHeader className="flex flex-row items-center gap-4 p-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sofia Davis" />
              <AvatarFallback className='bg-primary text-primary-foreground'>SD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Sofia Davis</h2>
              <p className="text-sm ">m@example.com</p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-lg p-2 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-input'}`}>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  className="flex-1 border-0 focus:ring-0 bg-input"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  size="icon"
                  className="rounded-full"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goal Card */}
        <Card className="w-full h-full bg-card">

          <CardContent className="p-0 w-full">
            <CardHeader>
              <CardTitle>Move Goal</CardTitle>
              <CardDescription>Set your daily activity goal.</CardDescription>
            </CardHeader>

            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(-10)}
                  disabled={goal <= 200}
                >
                  <MinusIcon className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {goal}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    Calories/day
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(10)}
                  disabled={goal >= 400}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <div className="mt-3 h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={goals}>
                    <Bar
                      dataKey="goal"
                      style={
                        {
                          fill: "hsl(var(--primary))",
                          opacity: 0.9,
                        } as React.CSSProperties
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <CardFooter className='w-full gap-6 justify-end p-2'>
              <Button className='w-full'>Submit</Button>
              <Button className='w-full' variant="outline">Cancel</Button>
            </CardFooter>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Stock</CardTitle>
            <CardDescription>
              Lipsum dolor sit amet, consectetur adipiscing elit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">SKU</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-[100px]">Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-001</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-1" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-1" type="number" defaultValue="100" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-1" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-1" type="number" defaultValue="99.99" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup type="single" defaultValue="s" variant="outline">
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-002</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-2" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-2" type="number" defaultValue="143" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-2" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-2" type="number" defaultValue="99.99" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup type="single" defaultValue="m" variant="outline">
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-003</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-3" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-3" type="number" defaultValue="32" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-3" className="sr-only">
                      Stock
                    </Label>
                    <Input id="price-3" type="number" defaultValue="99.99" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup type="single" defaultValue="s" variant="outline">
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <Button size="sm" variant="ghost" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Variant
            </Button>
          </CardFooter>
        </Card>

      </div>

    </div>
  )
}
