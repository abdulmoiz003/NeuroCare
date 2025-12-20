import React, { useState, useEffect, useRef} from "react"
import axios from "axios"
import { Link, useLocation } from "react-router-dom" // Removed useHistory
import CustomCalendar from "../CustomCalendar" // Importing the custom calendar component
import styles from "../styles/AdminDashboard.module.css"

function PieChartComponent() {
  const canvasRef = useRef(null)

  const diseaseData = [
    { label: "Positive", value: 800, color: "#0088FE" },
    { label: "Negative", value: 500, color: "#FF6347" },
  ]

  const [currentAngle, setCurrentAngle] = useState(0) // Track the current angle of the pie chart for animation

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const animateChart = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear previous frame

      const centerX = 220
      const centerY = 100
      const radius = 100

      drawPieChart(ctx, diseaseData, centerX, centerY, radius)
      drawLegend(ctx, diseaseData)

      // Update the angle of the pie chart
      if (currentAngle < 2 * Math.PI) {
        setCurrentAngle(currentAngle + 0.01) // Increment angle gradually
        requestAnimationFrame(animateChart) // Request next frame
      }
    }

    animateChart() // Start the animation
  }, [currentAngle, diseaseData]) // Re-run the effect when currentAngle or diseaseData changes

  const drawPieChart = (ctx, data, centerX, centerY, radius) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let startAngle = 0

    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI
      const currentSliceAngle = Math.min(currentAngle, sliceAngle) // Animate filling only to the current angle

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + currentSliceAngle)
      ctx.closePath()
      ctx.fillStyle = item.color
      ctx.fill()

      // Draw text inside slice
      const midAngle = startAngle + currentSliceAngle / 2
      const textX = centerX + Math.cos(midAngle) * (radius / 2)
      const textY = centerY + Math.sin(midAngle) * (radius / 2)
      ctx.fillStyle = "#fff" // White color for text
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.fillText(item.value, textX, textY)

      startAngle += sliceAngle
    })
  }

  const drawLegend = (ctx, data) => {
    const legendX = 330
    let legendY = 50

    data.forEach((item) => {
      // Draw color box
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, legendY, 20, 20)

      // Draw label text
      ctx.fillStyle = "#000" // Black color for text
      ctx.font = "16px Arial"
      ctx.textAlign = "left"
      ctx.fillText(item.label, legendX + 30, legendY + 15)

      legendY += 30 // Move to the next line for the next legend item
    })
  }

  return (
    <div>
      <h3 className={styles.PieH}>Disease Detections</h3>
      <canvas ref={canvasRef} width={500} height={260}></canvas>
    </div>
  );
}
const BarChartComponent = ({ data }) => {
  const canvasRef = useRef(null)
  const [currentHeights, setCurrentHeights] = useState(new Array(data.length).fill(0)) // Initial heights (start from 0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const chartWidth = 200
    const chartHeight = 200
    const barWidth = 40
    const barSpacing = 10
    const yAxisSpacing = 130

    const maxValue = Math.max(...data.map((item) => item.value))
    const numberOfTicks = 5
    const tickInterval = Math.ceil(maxValue / numberOfTicks)

    let animationFrameId

    const animateBars = (index = 0) => {
      // Check if animation is finished
      if (index >= data.length) return

      const newHeights = [...currentHeights]
      const targetHeight = (data[index].value / maxValue) * chartHeight

      // Gradually increase the current bar height for animation
      if (newHeights[index] < targetHeight) {
        newHeights[index] = Math.min(newHeights[index] + 1, targetHeight)
      }

      setCurrentHeights(newHeights)

      if (newHeights[index] < targetHeight) {
        animationFrameId = requestAnimationFrame(() => animateBars(index)) // Continue animation for the same bar
      } else {
        animateBars(index + 1) // Move to next bar when the current one is finished
      }
    }

    // Start animation
    animateBars()

    // Draw the chart
    const drawChart = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the Y-axis
      ctx.beginPath()
      ctx.moveTo(yAxisSpacing, 0)
      ctx.lineTo(yAxisSpacing, chartHeight)
      ctx.stroke()

      // Draw Y-axis labels and ticks
      for (let i = 0; i <= numberOfTicks; i++) {
        const yPos = chartHeight - (i * chartHeight) / numberOfTicks

        // Draw ticks
        ctx.beginPath()
        ctx.moveTo(yAxisSpacing - 5, yPos)
        ctx.lineTo(yAxisSpacing, yPos)
        ctx.stroke()

        // Draw labels for ticks
        ctx.fillStyle = "#000"
        ctx.font = "14px Arial"
        ctx.textAlign = "right"
        ctx.fillText(i * tickInterval, yAxisSpacing - 10, yPos + 5)
      }

      // Draw the bars with animated heights
      data.forEach((item, index) => {
        const x = yAxisSpacing + 20 + index * (barWidth + barSpacing)
        const y = chartHeight - currentHeights[index]

        // Draw the bar
        ctx.fillStyle = item.color
        ctx.fillRect(x, y, barWidth, currentHeights[index])

        // Draw labels below the bars
        ctx.fillStyle = "#000"
        ctx.font = "14px Arial"
        ctx.textAlign = "center"
        ctx.fillText(item.label, x + barWidth / 2, chartHeight + 20)
      })
    }

    drawChart() // Initial draw of the chart

    return () => cancelAnimationFrame(animationFrameId) // Cleanup on component unmount
  }, [data, currentHeights])

  return (
    <div>
      <h3 className={styles.barchartheading}>System Rating Report</h3>
      <canvas ref={canvasRef} width={500} height={230}></canvas>
    </div>
  );
};

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([])
   
  const disease = [
    { label: "Positive", value: 700, color: "#0088FE" },
    { label: "Negative", value: 500, color: "#FF69B4" },
  ]

  const ratings = [
    { label: "1", value: 15, color: "#FFB6C1" },
    { label: "2", value: 25, color: "#FFD700" },
    { label: "3", value: 40, color: "#FFA500" },
    { label: "4", value: 35, color: "#00BFFF" },
    { label: "5", value: 20, color: "#6495ED" },
  ]

  

  
  useEffect(() => {
    

    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/not-register-neurologists") // Replace with your API endpoint

        setDoctors(response.data)
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }

    fetchDoctors()
  }, [])

  
  

  // Function to approve doctor
  const handleApprove = async (doctor) => {
    try {
      // Update 'approved' field in MongoDB to 'y'
      await axios.put(`http://localhost:5000/api/not-register-neurologists/${doctor._id}`, { approved: "y" })

     
      // Remove approved doctor from table locally
      setDoctors(doctors.filter((doc) => doc._id !== doctor._id))

    
    } catch (error) {
      console.error("Error approving doctor:", error)
    }
  }

  // Function to disapprove doctor (optional)
  const handleDisapprove = async (doctor) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-neurologists/${doctor._id}`)
      // Remove approved doctor from table locally
      setDoctors(doctors.filter((doc) => doc._id !== doctor._id))
    } catch (error) {
      console.error("Error disapproving doctor:", error)
    }

  }

  // Logout confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?")
    if (confirmLogout) {
      // No need for history.push now; you can redirect with a link
      window.location.href = "/" // Alternatively, use a Link to manage redirection
    }
  }

  const location = useLocation(); // Get the current location

  // Helper function to apply the active class
  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  


  return (
    <div className={styles.dashboardContainer}>
      {/* Left Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.neurocareLogoContainer}>
          <img
            src="https://i.ibb.co/g3c6P1s/neurocare-logo.png"
            alt="NeuroCare Logo"
            className={styles.neurocareLogoImage}
          />
        </div>
        <Link to="/admin/dashboard" className={`${styles.sidebarLink} ${getActiveClass('/admin/dashboard')}`}>
          Dashboard
        </Link>
        <Link to="/solutionreport" className={`${styles.sidebarLink} ${getActiveClass('/solutionreport')}`}>
          Sys Solutions Report
        </Link>
        <Link to="/neurologistranking" className={`${styles.sidebarLink} ${getActiveClass('/neurologistranking')}`}>
          Neur Ranking Report
        </Link>
        <Link to="/neurologistratings" className={`${styles.sidebarLink} ${getActiveClass('/neurologistratings')}`}>
          Neurologist Ratings
        </Link>
        <Link to="/systemratings" className={`${styles.sidebarLink} ${getActiveClass('/systemratings')}`}>
          System Ratings
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <img
            src="https://i.ibb.co/fQ7RJ3f/logout.png"
            alt="Logout"
            className={styles.logoutImage}
          />
          Logout
        </button>
      </div>

      {/* Main content section */}
      <div className={styles.mainContent}>
        {/* Top section with welcome message */}
        <div className={styles.topSection}>
          <h1 className={styles.welcomeMessage}>Admin Dashboard</h1>
          
        </div>

        {/* Main dashboard menu */}
        <div className={styles.mainSection}>
          <div className={styles.menuContainer}>
            <div className={styles.gridContainer}>
              <Link to="/admin/registered-patients" className={styles.smallButton}>
                <img src="https://i.ibb.co/dPbHjxk/chat.jpg" alt="Availability Timings" className={styles.buttonImage} />
                <span className={styles.buttonText}>Registered Patients</span>
              </Link>
              <Link to="/admin/registered-neurologists" className={styles.smallButton}>
                <img src="https://i.ibb.co/M2bzvLw/appointment1.jpg" alt="Chats" className={styles.buttonImage} />
                <span className={styles.buttonText}>Registered Neurologists</span>
              </Link>
            </div>

            <div className={styles.doctor_table_container}>
              <h3>Neurologist Requests</h3>
              <table className={styles.tabletable}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.tth}>Name</th>
                    <th className={styles.tth}>Age</th>
                    <th className={styles.tth}>Gender</th>
                    <th className={styles.tth}>Contact</th>
                    <th className={styles.tth}>Email</th>
                    <th className={styles.tth}>PMC Number</th>
                    <th className={styles.tth}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor._id}>
                      <td className={styles.ttd}>{doctor.name}</td>
                      <td className={styles.ttd}>{doctor.age}</td>
                      <td className={styles.ttd}>{doctor.gender}</td>
                      <td className={styles.ttd}>{doctor.phoneNumber}</td>
                      <td className={styles.ttd}>{doctor.email}</td>
                      <td className={styles.ttd}>{doctor.pmcRegistrationNumber}</td>
                      <td className={styles.ttd}>
                        <button className={styles.approve_button} onClick={() => handleApprove(doctor)}>
                          Approve
                        </button>
                        <button className={styles.disapprove_button} onClick={() => handleDisapprove(doctor)}>
                          Disapprove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom charts Section */}
          <div>
            <div>
              <PieChartComponent data={disease} />
            </div>
            <div className={styles.barchart}>
              <BarChartComponent data={ratings} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
