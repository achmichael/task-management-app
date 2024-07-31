function DashboardHeader({ notifications, username }) {
  return (
    <header className="dashboard-header">
      <h1>Selamat Datang, {username}</h1>
      <div className="notifications">
        <i data-feather="bell"></i>
        <span className="notification-count">{notifications.length}</span>
      </div>
    </header>
  );
}

export default DashboardHeader;
