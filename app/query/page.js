"use client"

import { useState } from "react"
import { Video, Mic, Type, Send, Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function QuerySubmission() {
  const [step, setStep] = useState(1)
  const [queryType, setQueryType] = useState("text")
  const [query, setQuery] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState("")
  const [mediaBlobUrl, setMediaBlobUrl] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleQuerySubmit = async (e) => {
    e.preventDefault()
    setIsRecording(false)
    setSubmitted(true)
    setTicketId(`#TIC${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`)
    setQuery("")
    setQueryType("text")
    setStep(1)
  }

  const handleQueryChange = (value) => {
    setQuery(value)
    if (value.length > 3) {
      setAiSuggestions(["Check account balance", "Update contact information", "Report a lost card"])
    } else {
      setAiSuggestions([])
    }
  }

  const startRecording = () => {
    setIsRecording(true)
    // Add logic to start recording video or audio
  }

  const stopRecording = () => {
    setIsRecording(false)
    // Add logic to stop recording and set mediaBlobUrl
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(URL.createObjectURL(file))
    }
  }

  return (
    <>
      <Navbar />
      <div className="mt-8"></div> {/* Added space after the navbar */}
      <div className="max-w-3xl mx-auto mt-8 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Submit a Query</h1>
        {!submitted ? (
          <Card className="p-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Step {step}: {step === 1 ? "Choose Query Type" : step === 2 ? "Record or Type Query" : "Review & Confirm"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={step.toString()} onValueChange={(value) => setStep(parseInt(value))}>
                <TabsList className="flex justify-center mb-6">
                  <TabsTrigger value="1" className="px-4 py-2 flex items-center">
                    Step 1 {step > 1 && <CheckCircle className="w-5 h-5 ml-2 text-success" />}
                  </TabsTrigger>
                  <TabsTrigger value="2" className="px-4 py-2 flex items-center">
                    Step 2 {step > 2 && <CheckCircle className="w-5 h-5 ml-2 text-success" />}
                  </TabsTrigger>
                  <TabsTrigger value="3" className="px-4 py-2 flex items-center">
                    Step 3 {submitted && <CheckCircle className="w-5 h-5 ml-2 text-success" />}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="1">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <div className="flex justify-center space-x-4 mb-6">
                      <Button
                        type="button"
                        variant={queryType === "video" ? "default" : "outline"}
                        onClick={() => setQueryType("video")}
                        className="flex items-center px-4 py-2"
                      >
                        <Video className="w-5 h-5 mr-2" />
                        Video
                      </Button>
                      <Button
                        type="button"
                        variant={queryType === "audio" ? "default" : "outline"}
                        onClick={() => setQueryType("audio")}
                        className="flex items-center px-4 py-2"
                      >
                        <Mic className="w-5 h-5 mr-2" />
                        Audio
                      </Button>
                      <Button
                        type="button"
                        variant={queryType === "text" ? "default" : "outline"}
                        onClick={() => setQueryType("text")}
                        className="flex items-center px-4 py-2"
                      >
                        <Type className="w-5 h-5 mr-2" />
                        Text
                      </Button>
                    </div>
                    <Button onClick={handleNextStep} className="w-full py-2">
                      Next Step
                    </Button>
                  </motion.div>
                </TabsContent>
                <TabsContent value="2">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    {queryType === "video" && (
                      <div className="bg-muted p-6 rounded-md text-center">
                        <Button
                          type="button"
                          variant={isRecording ? "destructive" : "default"}
                          onClick={isRecording ? stopRecording : startRecording}
                          className="mb-4"
                        >
                          {isRecording ? "Stop Recording" : "Start Video Recording"}
                        </Button>
                        {mediaBlobUrl && (
                          <video controls src={mediaBlobUrl} className="mt-4 w-full rounded-md" />
                        )}
                        <div className="mt-4">
                          <Button onClick={() => document.getElementById('fileInput').click()} className="mb-4">
                            Choose File
                          </Button>
                          <input
                            type="file"
                            id="fileInput"
                            accept="video/*"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                          />
                          {uploadedFile && (
                            <video controls src={uploadedFile} className="mt-4 w-full rounded-md" />
                          )}
                        </div>
                      </div>
                    )}
                    {queryType === "audio" && (
                      <div className="bg-muted p-6 rounded-md text-center">
                        <Button
                          type="button"
                          variant={isRecording ? "destructive" : "default"}
                          onClick={isRecording ? stopRecording : startRecording}
                          className="mb-4"
                        >
                          {isRecording ? "Stop Recording" : "Start Audio Recording"}
                        </Button>
                        {mediaBlobUrl && (
                          <audio controls src={mediaBlobUrl} className="mt-4 w-full rounded-md" />
                        )}
                      </div>
                    )}
                    {queryType === "text" && (
                      <textarea
                        value={query}
                        onChange={(e) => handleQueryChange(e.target.value)}
                        placeholder="Type your query here..."
                        className="w-full p-4 border border-input rounded-md mb-4"
                        rows={6}
                      />
                    )}
                    {aiSuggestions.length > 0 && (
                      <div className="bg-muted p-6 rounded-md mt-4">
                        <h3 className="text-lg font-semibold mb-2">AI Suggestions:</h3>
                        <ul className="list-disc pl-5">
                          {aiSuggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex justify-between mt-6">
                      <Button onClick={handlePreviousStep} className="w-full mr-2 py-2">
                        Previous Step
                      </Button>
                      <Button onClick={handleNextStep} className="w-full ml-2 py-2">
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="3">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <p className="mb-4 text-center">Review your query before submission:</p>
                    <div className="bg-muted p-6 rounded-md mb-4">
                      <p><strong>Query Type:</strong> {queryType}</p>
                      <p><strong>Query:</strong> {query}</p>
                      {mediaBlobUrl && (
                        queryType === "video" ? (
                          <video controls src={mediaBlobUrl} className="mt-4 w-full rounded-md" />
                        ) : (
                          <audio controls src={mediaBlobUrl} className="mt-4 w-full rounded-md" />
                        )
                      )}
                      {uploadedFile && (
                        <video controls src={uploadedFile} className="mt-4 w-full rounded-md" />
                      )}
                    </div>
                    <textarea
                      value={query}
                      onChange={(e) => handleQueryChange(e.target.value)}
                      placeholder="Add any additional notes here..."
                      className="w-full p-4 border border-input rounded-md mb-4"
                      rows={6}
                    />
                    <div className="flex justify-between">
                      <Button onClick={handlePreviousStep} className="w-full mr-2 py-2">
                        Previous Step
                      </Button>
                      <Button onClick={handleQuerySubmit} className="w-full ml-2 py-2 flex items-center justify-start"> {/* Aligned to the left */}
                        <Send className="w-5 h-5 mr-2" />
                        Submit Query
                      </Button>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card className="p-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Query Submitted Successfully</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-center">
                Your query has been received and is being processed. Please use the following ticket ID for future
                reference:
              </p>
              <p className="text-xl font-semibold text-center mb-4">Ticket ID: {ticketId}</p>
              <p className="text-center mb-4">Estimated response time: 24-48 hours</p>
              <div className="flex justify-center">
                <Button onClick={() => setSubmitted(false)} className="py-2 px-4">
                  Submit Another Query
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
