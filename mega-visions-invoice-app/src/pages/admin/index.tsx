import { Link, Location, Outlet, To, useLocation } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import Avatar from "../../components/avatar";
import { NAVLINKS } from "../../components/sidebar/data";
import { Key } from "react";

function AdminLayout() {
  const location = useLocation();
  return (
    <section className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start">
        {/* Main page navbar */}
        <div className="w-full flex items-center justify-between py-2 px-2">
          {/* Drawer button */}
          <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button">
            <AlignJustify />
          </label>
          {/* User information section */}
          <div className="max-lg:hidden">
            <Avatar />
          </div>
        </div>
        {/* Page content here */}
        {/* Outlet */}
        <div className="w-full p-5  h-full">
          <Outlet />
        </div>
      </div>
      {/* Drawer sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-primary-700 text-white min-h-full w-80 p-4">
          {/* Header */}
          <div className="px-4 py-5">
            <h1 className="text-xl font-semibold text-white">
              MegaVisions Shop
            </h1>
          </div>
          {/* Sidebar content here */}
          {renderNavLinks(NAVLINKS, location)}
          <li>
            <div className="lg:hidden">
              <Avatar />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

// Sidelinks function
const renderNavLinks = (navLinks: any[], location: Location<any>) => {
  return navLinks.map(
    (
      link: {
        href: To;
        hasSubmenu: boolean;
        title: string;
        subMenu: [];
      },
      index: Key | null | undefined
    ) => {
      const isActive = location.pathname === link.href;

      if (!link.hasSubmenu) {
        return (
          <li key={index}>
            <Link
              to={link.href}
              className={`text-base ${isActive ? "active" : ""}`}
            >
              {link.title}
            </Link>
          </li>
        );
      } else {
        return (
          <li key={index} className="py-3">
            <details>
              <summary className="text-base">{link.title}</summary>
              <ul>{renderNavLinks(link.subMenu, location)}</ul>
            </details>
          </li>
        );
      }
    }
  );
};

export default AdminLayout;
