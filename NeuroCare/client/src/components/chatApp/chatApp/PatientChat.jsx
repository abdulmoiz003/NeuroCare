import React, { useState, useEffect } from "react"
import axios from "axios"

import { IoIosSend } from "react-icons/io"

import { RiLogoutBoxFill } from "react-icons/ri"




export default function PatientChat() {
  const [neurologists, setNeurologists] = useState([])
  const [selectedNeurologist, setSelectedNeurologist] = useState(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  // Fetch neurologists on component mount
  useEffect(() => {
    const fetchNeurologists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/registered-neurologists")
        setNeurologists(response.data)
      } catch (error) {
        console.error("Error fetching neurologists:", error)
      }
    }
    fetchNeurologists()
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      const senderEmail = localStorage.getItem("patientEmail")

      if (selectedNeurologist && senderEmail) {
        try {
          const response = await axios.get(`http://localhost:5000/getMessage/${selectedNeurologist.email}`, {
            params: { senderEmail }, // Only include senderEmail in params
          })
          console.log("Fetched messages:", response.data)
          if (response.data && response.data.length > 0) {
            setMessages(response.data)
          } else {
            setMessages([]) // Clear messages if none are found
          }
        } catch (error) {
          console.error("Error fetching messages:", error.response?.data || error.message)
        }
      }
    }

    fetchMessages()
  }, [selectedNeurologist,messages])

 


  // Handle message send
  const handleSendMessage = async () => {
    if (message.trim() !== "" && selectedNeurologist) {
   
      
      try {
        const response = await axios.post(`http://localhost:5000/send/${selectedNeurologist.email}`, {
          //   senderEmail: localStorage.getItem("patientEmail"),
          senderEmail: localStorage.getItem("patientEmail"),
          message,
        })
        

        setMessage("") // Clear the input field
        
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  // Logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?")
    if (confirmLogout) {
      window.location.href = "/patient/dashboard"
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* logout */}
      <div className="w-[100%] md:w-[4%] bg-blue-700 text-white flex flex-col  md:justify-end">
        <div className="p-3 align-bottom">
          <button class="bg-transparent hover:font-bold hover:bg-black" onClick={handleLogout}>
            <RiLogoutBoxFill className="text-5xl p-2 hover:bg-grey-600 rounded-full duration-300" />
          </button>
        </div>
      </div>
      {/* Left Sidebar */}
      <div className="md:w-[30%] w-[100%] bg-blue-700 text-white">
        <span className="font-bold text-5xl p-5 pb-8 text-white mb-0 text-left">Chat</span>
        <hr />

        <div style={{ maxHeight: "calc(82vh)" }} className="overflow-auto">
          {neurologists.length > 0 ? (
            neurologists.map((neurologist, index) => (
              <div key={index} className={`flex space-x-4 px-6 py-7 hover:bg-slate-400 duration-300 cursor-pointer ${selectedNeurologist?.email === neurologist.email ? "bg-slate-700" : ""}`} onClick={() => setSelectedNeurologist(neurologist)}>
                <div className="avatar placeholder">
                  <div className=" text-neutral-content md:w-24  rounded-full bg-blue-900">
                    <span className="text-3xl">{neurologist.name.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <h5>{neurologist.name}</h5>
                  <span>{neurologist.email}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="px-6 py-4">No neurologists available.</p>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="md:w-[80%] w-[100%]  bg-blue-300 text-white">
        {selectedNeurologist ? (
          <>
            {/* Header */}
            <div className="flex space-x-4 px-6 py-1 bg-blue-700">
              <div className="avatar placeholder">
                <div className=" text-neutral-content w-24 md:w-24 rounded-full bg-blue-900">
                  <span className="text-3xl md:text-2xl">{selectedNeurologist.name.charAt(0)}</span>
                </div>
              </div>
              <div>
                <h5>{selectedNeurologist.name}</h5>
                <h5>{selectedNeurologist.email}</h5>
              </div>
            </div>

            {/* Messages */}
            <div className="text-center p-2 overflow-auto" style={{ minHeight: "calc(82vh - 8vh)", maxHeight: "calc(74vh)" }}>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className={`chat ${msg.senderEmail === localStorage.getItem("patientEmail") ? "chat-end " : "chat-start"}`}>
                    <div className="chat-bubble">{msg.message}</div>
                  </div>
                ))
              ) : (
                <p>No messages yet.</p>
              )}
            </div>

            {/* Type Message */}
            <div className="flex text-center p-3 space-x-3 h-8vh">
              <div className="w-[90%]">
                <input type="text" placeholder="Type here" className="input input-bordered grow w-full h-full outline-none bg-slate-700" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <button className="w-[6%] text-3xl bg-transparent hover:font-bold hover:bg-black" onClick={handleSendMessage}>
                <IoIosSend />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center p-4">Select a neurologist to start chatting.</div>
        )}
      </div>
    </div>
  )
}
