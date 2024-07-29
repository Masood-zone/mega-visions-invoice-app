import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <section className="flex items-start">
      {/* Sidebar */}
      <div>Sidebar</div>
      {/* Outlet */}
      <div>
        <Outlet />
      </div>
    </section>
  );
}

export default AdminLayout;
