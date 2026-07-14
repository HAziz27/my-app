import { useState } from "react";
import { LayoutDashboard, CheckSquare, Users, Settings, Shield, Wifi, Activity, FileText, Lock, Upload } from "lucide-react";

const INITIAL_TASKS = [
  { id: "t1", step: 1, title: "Create Confluence Testing Tracker", assignee: "R. Holloway", dueDate: "Jun 14", status: "completed" },
  { id: "t2", step: 2, title: "Update Auth Code Repository in Local", assignee: "R. Holloway", dueDate: "Jun 14", status: "completed" },
  { id: "t3", step: 3, title: "Create Work Branch", assignee: "R. Holloway", dueDate: "Jun 15", status: "completed" },
  { id: "t4", step: 4, title: "Make Changes", assignee: "R. Holloway", dueDate: "Jun 17", status: "in-progress" },
  { id: "t5", step: 5, title: "Test Locally", assignee: "R. Holloway", dueDate: "Jun 17", status: "todo" },
];

export default function App() {
  // Move tasks into React State so clicking buttons dynamically re-renders the UI
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // Logic to rotate status: Todo -> In Progress -> Completed -> Todo
  const cycleStatus = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          let nextStatus;
          if (task.status === "todo") nextStatus = "in-progress";
          else if (task.status === "in-progress") nextStatus = "completed";
          else nextStatus = "todo";
          
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  // Helper to match text labels and colors natively based on status state
  const getStatusDetails = (status) => {
    switch (status) {
      case "completed":
        return { label: "Completed", bg: "#E2ECE6", color: "#006A4E", textClass: "gray", lineThrough: "line-through" };
      case "in-progress":
        return { label: "In Progress", bg: "#FFF9E6", color: "#B45309", textClass: "inherit", lineThrough: "none" };
      default:
        return { label: "To Do", bg: "#F0F0F0", color: "#666666", textClass: "inherit", lineThrough: "none" };
    }
  };

  return (
    <div className="app-container">
      
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="nav-group">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", color: "white" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "12px", backgroundColor: "#00875A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: "14px", margin: 0, fontWeight: 800 }}>SecureOps</h2>
              <span style={{ fontSize: "10px", color: "#5CA98B", fontWeight: "bold", letterSpacing: "1px" }}>BANKING SUITE</span>
            </div>
          </div>

          <button className="nav-button"><LayoutDashboard size={16} /> Dashboard</button>
          <button className="nav-button active"><CheckSquare size={16} /> Task Workspace</button>
          <button className="nav-button"><Users size={16} /> Team Directory</button>
          <button className="nav-button"><Settings size={16} /> Settings</button>
        </div>

        <div style={{ backgroundColor: "#00261A", padding: "14px", borderRadius: "16px", color: "white" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", color: "#7CB09A" }}>Deploy Auth Changes</div>
          <div style={{ fontSize: "9px", color: "#336852", fontWeight: "black", marginTop: "4px" }}>ACTIVE TRACK</div>
        </div>
      </aside>

      {/* Main Content Window */}
      <div className="main-window">
        <header className="main-header">
          <div>
            <h1 style={{ fontSize: "15px", margin: 0, fontWeight: 900 }}>Task Workspace</h1>
            <p style={{ fontSize: "11px", color: "gray", margin: "4px 0 0 0" }}>Platform Engineering &bull; Deploy Auth Changes</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ backgroundColor: "#E2ECE6", color: "#006A4E", padding: "4px 12px", borderRadius: "50px", fontSize: "11px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
              <Wifi size={12} /> Secure &bull; Connected
            </div>
            <div style={{ fontSize: "12px", fontWeight: "bold" }}>R. Holloway</div>
          </div>
        </header>

        {/* Floating Cards Canvas Layout */}
        <div className="dashboard-grid">
          
          {/* Main List */}
          <div className="workspace-column">
            <div className="floating-card">
              <span style={{ fontSize: "10px", fontWeight: "bold", color: "gray", textTransform: "uppercase" }}>Filter Task Track</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "12px" }}>
                {["Platform Engineering", "Lab A — Core Banking", "Deploy Auth Changes"].map((val) => (
                  <div key={val} style={{ padding: "8px 12px", background: "#F9F9F9", border: "1px solid #EAEAEA", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }}>{val}</div>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: "14px", margin: "8px 0 0 4px", fontWeight: 800 }}>Deployment Checklist</h3>
            
            <div className="task-list">
              {tasks.map((task) => {
                const details = getStatusDetails(task.status);
                return (
                  <div key={task.id} className="task-card">
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ 
                        width: "24px", 
                        height: "24px", 
                        borderRadius: "50%", 
                        backgroundColor: task.status === "completed" ? "#006A4E" : "#F0F0F0", 
                        color: task.status === "completed" ? "white" : "gray", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: "11px", 
                        fontWeight: "bold" 
                      }}>
                        {task.status === "completed" ? "✓" : task.step}
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: details.textClass, textDecoration: details.lineThrough }}>
                          {task.title}
                        </div>
                        <span style={{ fontSize: "11px", color: "gray" }}>{task.assignee} &bull; Due {task.dueDate}</span>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {/* Status Button Toggle pill */}
                      <button 
                        onClick={() => cycleStatus(task.id)}
                        style={{ 
                          fontSize: "10px", 
                          fontWeight: "bold", 
                          padding: "4px 12px", 
                          borderRadius: "50px", 
                          backgroundColor: details.bg, 
                          color: details.color,
                          border: "none",
                          cursor: "pointer",
                          outline: "none"
                        }}
                      >
                        {details.label}
                      </button>
                      
                      <div style={{ width: "32px", height: "32px", borderRadius: "10px", border: "1px solid #EAEAEA", display: "flex", alignItems: "center", justifyContent: "center", color: "gray" }}>
                        {task.status === "completed" ? <Lock size={12} /> : <Upload size={12} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Metrics Panel */}
          <div className="right-panel">
            <div className="floating-card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "100%", fontSize: "10px", fontWeight: "bold", color: "gray" }}><Activity size={12} /> TASK METRICS</div>
              <div className="circle-progress">
                <span style={{ fontSize: "18px", fontWeight: 900 }}>21%</span>
                <span style={{ fontSize: "8px", color: "gray", fontWeight: "bold" }}>DONE</span>
              </div>
              <div className="metrics-pill-grid">
                <div className="stat-pill" style={{ backgroundColor: "#E2ECE6", color: "#006A4E" }}><div style={{ fontWeight: 900 }}>3</div><span style={{ fontSize: "9px" }}>Done</span></div>
                <div className="stat-pill" style={{ backgroundColor: "#FFF9E6", color: "#B45309" }}><div style={{ fontWeight: 900 }}>1</div><span style={{ fontSize: "9px" }}>Active</span></div>
                <div className="stat-pill" style={{ backgroundColor: "#F9F9F9", color: "gray" }}><div style={{ fontWeight: 900 }}>10</div><span style={{ fontSize: "9px" }}>Pending</span></div>
              </div>
            </div>

            <div className="floating-card" style={{ flex: 1 }}>
              <div style={{ fontSize: "10px", fontWeight: "bold", color: "gray", marginBottom: "12px" }}><FileText size={12} /> RECENT ACTIVITY</div>
              <div style={{ fontSize: "12px", color: "#555" }}>
                <p><strong>R. Holloway</strong> set status to active on <i>Make Changes</i></p>
                <span style={{ fontSize: "10px", color: "gray" }}>Today, 09:12 AM</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}