import exportToExcel from "../service/Export.js";
import logout from "../api/Logout.js";
function Sidebar({ isOpen }) {

  const handleLogout = async () => {
    try{
      await logout();
    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <ul>
        <li>
          <a href="/dashboard">
            <i data-feather="home"></i> Dashboard
          </a>
        </li>
        <li>
          <a href="#tasks-table">
            <i data-feather="check-square"></i> Tugas
          </a>
        </li>
        <li>
          <a href="">
            <i data-feather="briefcase"></i> Proyek
          </a>
        </li>
        <li>
          <a href="/calendar">
            <i data-feather="calendar"></i> Kalender
          </a>
        </li>
        <li>
          <a onClick={exportToExcel}>
            <i data-feather="bar-chart-2"></i> Export Excel
          </a>
        </li>
        <li>
          <a onClick={handleLogout}>
            <i data-feather="log-out"></i>Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
