"use client"

import { useState } from "react"
import { Clock, CheckCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

const tickets = [
  {
    id: "T001", 
    type: "Account Issue",
    department: "Customer Support",
    status: "Pending",
    estimatedTime: "24 hours",
    description: "Customer unable to access online banking portal"
  },
  {
    id: "T002",
    type: "Loan Inquiry", 
    department: "Loans",
    status: "In Progress",
    estimatedTime: "48 hours",
    description: "Request for information about mortgage refinancing options"
  },
  {
    id: "T003",
    type: "Technical Support",
    department: "IT",
    status: "Resolved", 
    estimatedTime: "Completed",
    description: "Mobile app crashing on startup - Fixed with latest update"
  },
]

export default function ServiceTickets() {
  const [expandedTicket, setExpandedTicket] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 animate-spin" />
      case "In Progress":
        return <RefreshCw className="w-4 h-4 animate-spin" />
      case "Resolved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const filteredTickets = filterStatus === 'all' 
    ? tickets
    : tickets.filter(ticket => ticket.status === filterStatus)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Service Tickets</h1>
          <div className="flex gap-2">
            <Button 
              variant={filterStatus === 'all' ? "default" : "outline"}
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button 
              variant={filterStatus === 'Pending' ? "default" : "outline"}
              onClick={() => setFilterStatus('Pending')}
            >
              Pending
            </Button>
            <Button 
              variant={filterStatus === 'In Progress' ? "default" : "outline"}
              onClick={() => setFilterStatus('In Progress')}
            >
              In Progress
            </Button>
            <Button 
              variant={filterStatus === 'Resolved' ? "default" : "outline"}
              onClick={() => setFilterStatus('Resolved')}
            >
              Resolved
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {filteredTickets.map((ticket) => (
            <Card 
              key={ticket.id}
              className="hover:shadow-lg transition-shadow duration-200 p-4"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-semibold">{ticket.type}</span>
                    <span className="text-sm text-gray-500">#{ticket.id}</span>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${getStatusColor(
                      ticket.status,
                    )}`}
                  >
                    {getStatusIcon(ticket.status)}
                    <span className="ml-2">{ticket.status}</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-base text-gray-700">
                    <span className="font-medium w-28">Department:</span>
                    <span>{ticket.department}</span>
                  </div>
                  <div className="flex items-center text-base text-gray-700">
                    <span className="font-medium w-28">Est. Time:</span>
                    <span>{ticket.estimatedTime}</span>
                  </div>
                  <div className="text-base text-gray-700">
                    <p className="font-medium mb-2">Description:</p>
                    <p>{ticket.description}</p>
                  </div>
                  <div className="flex items-center text-base text-gray-700">
                    <span className="font-medium w-28">Priority:</span>
                    <span>{ticket.priority || "Normal"}</span>
                  </div>
                  <div className="flex items-center text-base text-gray-700">
                    <span className="font-medium w-28">Created On:</span>
                    <span>{ticket.createdOn || "N/A"}</span>
                  </div>
                </div>
                <div className="flex space-x-4 pt-2 border-t">
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={() => setExpandedTicket(ticket.id)}
                  >
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tickets found for the selected status.</p>
          </div>
        )}
      </div>
    </div>
  )
}
