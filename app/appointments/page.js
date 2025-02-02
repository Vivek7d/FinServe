"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Search, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Poppins } from 'next/font/google';
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/navbar";

const financialAdvisors = [
  {
    id: 1,
    name: "Mr. John Doe",
    specialty: "Investment Planning",
    rating: 4.8,
    reviews: 120,
    bio: "Expert in investment planning and portfolio management with 10+ years of experience.",
  },
  {
    id: 2,
    name: "Ms. Sarah Lee",
    specialty: "Tax Consultation",
    rating: 4.5,
    reviews: 85,
    bio: "Experienced tax consultant specializing in individual and business taxation.",
  },
  {
    id: 3,
    name: "Mr. Alex Brown",
    specialty: "Retirement Planning",
    rating: 4.7,
    reviews: 95,
    bio: "Provides retirement planning and wealth management services for long-term financial stability.",
  },
  {
    id: 4,
    name: "Ms. Emily White",
    specialty: "Estate Planning",
    rating: 4.9,
    reviews: 60,
    bio: "Specializes in estate planning and wealth transfer strategies.",
  },
  {
    id: 5,
    name: "Mr. Michael Green",
    specialty: "Financial Analysis",
    rating: 4.6,
    reviews: 75,
    bio: "Expert in financial analysis and risk management with a focus on investment strategies.",
  },
  {
    id: 6,
    name: "Ms. Laura Black",
    specialty: "Insurance Consultation",
    rating: 4.4,
    reviews: 50,
    bio: "Provides insurance consultation and risk assessment services.",
  },
];

const timeSlots = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "01:00 PM - 02:00 PM",
];

const feedbackSessions = [
  { id: 1, advisor: "Mr. John Doe", date: "May 15, 2023" },
  { id: 2, advisor: "Ms. Sarah Lee", date: "May 10, 2023" },
];

const poppins = Poppins({
  weight: ["100", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);

  const handleAdvisorDropdown = (event) => {
    setSelectedAdvisor(event.target.value);
  };

  const filteredAdvisors = financialAdvisors.filter((advisor) =>
    advisor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setAvailableTimeSlots(timeSlots);
  }, [selectedAdvisor]);

  const handleBookAppointment = () => {
    if (selectedAdvisor && selectedDate && selectedTime) {
      const advisor = financialAdvisors.find(
        (a) => a.id === parseInt(selectedAdvisor)
      );
      const newAppointment = {
        id: appointments.length + 1,
        advisor: advisor.name,
        date: selectedDate,
        time: selectedTime,
      };
      setAppointments([...appointments, newAppointment]);
      setSelectedAdvisor("");
      setSelectedDate("");
      setSelectedTime("");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <>
    <Navbar />
    <div className={`${poppins.className} min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Banking Appointment Services
        </h1>

        <Tabs defaultValue="find-advisors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="find-advisors">Find Financial Advisors</TabsTrigger>
            <TabsTrigger value="schedule-appointments">Schedule Appointments</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="find-advisors">
            <Card>
              <CardHeader>
                <CardTitle>Find a Financial Advisor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col sm:flex-row gap-4">
                  <Input
                    type="text"
                    placeholder="Search advisors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow"
                  />
                  <select className="flex-grow sm:w-auto border rounded-md py-2 px-4 bg-white">
                    <option value="">All Specialties</option>
                    <option value="investment">Investment Planning</option>
                    <option value="tax">Tax Consultation</option>
                    <option value="retirement">Retirement Planning</option>
                  </select>
                  <Button className="w-full sm:w-auto">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredAdvisors.map((advisor) => (
                    <Card key={advisor.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src="/placeholder.svg?height=48&width=48"
                              alt={advisor.name}
                            />
                            <AvatarFallback>
                              {advisor.name.split(" ")[0][0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {advisor.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {advisor.specialty}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">
                          {advisor.bio}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-semibold">
                              {advisor.rating} ({advisor.reviews} reviews)
                            </span>
                          </div>
                          <Button size="sm">Book Appointment</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule-appointments">
            <Card>
              <CardHeader>
                <CardTitle>Schedule an Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <select
                      className="flex-grow border rounded-md py-2 px-4 bg-white"
                      value={selectedAdvisor}
                      onChange={(e) => setSelectedAdvisor(e.target.value)}
                    >
                      <option value="">Select Advisor</option>
                      {financialAdvisors.map((advisor) => (
                        <option key={advisor.id} value={advisor.id}>
                          {advisor.name}
                        </option>
                      ))}
                    </select>

                    <select
                      className="flex-grow border rounded-md py-2 px-4 bg-white"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      disabled={!selectedAdvisor}
                    >
                      <option value="">Select Time Slot</option>
                      {availableTimeSlots.map((slot, index) => (
                        <option key={index} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>

                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="flex-grow border rounded-md py-2 px-4 bg-white"
                    />
                  </div>

                  <Button
                    onClick={handleBookAppointment}
                    className="w-full py-2 bg-black hover:text-black text-white rounded-md"
                  >
                    Book Appointment
                  </Button>

                  {appointments.length > 0 && (
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-4 text-center">
                        Your Appointments
                      </h2>
                      <div className="space-y-4">
                        {appointments.map((appointment) => (
                          <Card key={appointment.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    {appointment.advisor} Appointment
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    <Calendar className="inline mr-2 h-4 w-4" />{" "}
                                    {appointment.date}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    <Clock className="inline mr-2 h-4 w-4" />{" "}
                                    {appointment.time}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Session Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {feedbackSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {session.advisor} Session
                            </h3>
                            <p className="text-sm text-gray-500">
                              <User className="inline mr-2 h-4 w-4" />{" "}
                              {session.advisor}
                              <Calendar className="inline ml-4 mr-2 h-4 w-4" />{" "}
                              {session.date}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="h-6 w-6 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                        </div>
                        <Textarea
                          className="w-full p-2 border rounded-md"
                          rows={4}
                          placeholder="Share your thoughts about the session..."
                        />
                        <Button className="mt-4">Submit Feedback</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
}
