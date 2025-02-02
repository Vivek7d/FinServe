"use client"

import { useState, useEffect } from "react"
import { TrendingUp, AlertTriangle, DollarSign, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { LineChart, BarChart, PieChart, AreaChart, Line, Bar, Pie, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts'; // Importing chart components

export default function Insights() {
  const [insights, setInsights] = useState([])

  useEffect(() => {
    // Simulate fetching data from an API or server
    const fetchedInsights = [
      {
        title: "Savings Growth",
        description: "Your savings have grown by 15% this year. Keep up the good work!",
        icon: TrendingUp,
        data: [{ name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 5000 }] // Sample data for line chart
      },
      {
        title: "Expense Tracking",
        description: "You have reduced your monthly expenses by 10%. Great job on budgeting!",
        icon: DollarSign,
        data: [{ name: 'Rent', value: 2000 }, { name: 'Food', value: 1500 }, { name: 'Utilities', value: 500 }] // Sample data for bar chart
      },
      {
        title: "Investment Performance",
        description: "Your investments have outperformed the market by 5% this quarter.",
        icon: CreditCard,
        data: [{ name: 'Stocks', value: 3000 }, { name: 'Bonds', value: 2000 }, { name: 'Real Estate', value: 1500 }] // Sample data for pie chart
      },
      {
        title: "Projected Growth",
        description: "Your projected growth over the next quarter looks promising.",
        icon: TrendingUp,
        data: [{ name: 'Apr', value: 4500 }, { name: 'May', value: 3500 }, { name: 'Jun', value: 6000 }] // Sample data for area chart
      },
    ]
    setInsights(fetchedInsights)
  }, [])

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto mt-12">
      <h1 className="text-3xl font-bold text-center mb-8">Financial Insights & Recommendations</h1>
      <div className="grid grid-cols-1 text-center md:grid-cols-2 gap-8 mb-12">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{insight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex  items-start p-4 bg-muted rounded-md">
                <insight.icon className="w-6 h-6 mr-4 text-primary " />
                <div>
                  <p className="text-sm text-center text-muted-foreground">{insight.description}</p>
                </div>
              </div>
              {/* Render different types of graphs based on the insight */}
              {index === 0 && (
                <LineChart width={300} height={200} data={insight.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              )}
              {index === 1 && (
                <BarChart width={300} height={200} data={insight.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              )}
              {index === 2 && (
                <PieChart width={300} height={200}>
                  <Pie data={insight.data} dataKey="value" nameKey="name" fill="#8884d8" label />
                  <Tooltip />
                </PieChart>
              )}
              {index === 3 && (
                <AreaChart width={300} height={200} data={insight.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 bg-warning/20 p-4 rounded-md">
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-warning" />
          <p className="text-warning-foreground">
            Remember: These insights are based on your financial activities. Always consider your current financial situation before making any decisions.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}