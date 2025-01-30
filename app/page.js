"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { User, Lock, UserPlus, FileText, Upload, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify" // Import toast for notifications

export default function AuthPage() {
  const [authMethod, setAuthMethod] = useState("login")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    aadhaar: "",
    pan: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef(null)
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate authentication process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    
    // Show toast message based on authentication method
    if (authMethod === "login") {
      toast.success("Login successful!") // Toast for login success
    } else if (authMethod === "register") {
      toast.success("Registration successful!") // Toast for registration success
    }

    // Redirect to dashboard after successful authentication
    router.push("/dashboard")
  }

  const startFacialRecognition = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      setIsCameraActive(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const stopFacialRecognition = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
    }
    setIsCameraActive(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 relative">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.5 }} 
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 z-0"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="z-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome to FinServe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <Button
                variant={authMethod === "login" ? "default" : "outline"}
                onClick={() => setAuthMethod("login")}
                className="rounded-r-none "
              >
                Login
              </Button>
              <Button
                variant={authMethod === "register" ? "default" : "outline"}
                onClick={() => setAuthMethod("register")}
                className="rounded-l-none rounded-r-none"
              >
                Register
              </Button>
              <Button
                variant={authMethod === "facial" ? "default" : "outline"}
                onClick={() => setAuthMethod("facial")}
                className="rounded-l-none"
              >
                Facial Login
              </Button>
            </div>
            <AnimatePresence mode="wait">
              {authMethod === "facial" ? (
                <motion.div
                  key="facial"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {isCameraActive ? (
                    <div className="relative">
                      <video ref={videoRef} autoPlay className="w-full rounded-md" />
                      <Button
                        className="absolute top-2 right-2"
                        variant="destructive"
                        size="sm"
                        onClick={stopFacialRecognition}
                      >
                        Stop Camera
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full bg-black" onClick={startFacialRecognition}>
                      <Camera className="w-5 h-5 mr-2" />
                      Start Facial Recognition
                    </Button>
                  )}
                  <Button className="w-full bg-black" onClick={handleSubmit} disabled={isLoading || !isCameraActive}>
                    {isLoading ? "Processing..." : "Login with Face"}
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key={authMethod}
                  initial={{ opacity: 0, x: authMethod === "register" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: authMethod === "register" ? -50 : 50 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  {authMethod === "register" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center">
                        <UserPlus className="w-5 h-5 mr-2" />
                        <Input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        <Input
                          type="text"
                          name="aadhaar"
                          placeholder="Aadhaar Number"
                          value={formData.aadhaar}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="flex items-center">
                        <Upload className="w-5 h-5 mr-2" />
                        <Input
                          type="text"
                          name="pan"
                          placeholder="PAN Number"
                          value={formData.pan}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </motion.div>
                  )}
                  <Button type="submit" className="w-full bg-black" disabled={isLoading}>
                    {isLoading ? "Processing..." : authMethod === "register" ? "Register" : "Login"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
