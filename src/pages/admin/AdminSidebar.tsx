// src/components/admin/AdminSidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

// Icons
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);
const PropertiesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
    isActive
      ? "bg-orange-100 text-brand-primary"
      : "hover:bg-gray-200 text-gray-700"
  }`;

const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white shadow-md">
      <div className="p-4 flex items-center space-x-3 border-b border-gray-200">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=128&h=128&fit=crop"
          alt="Emily Carter"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">Emily Carter</p>
          <p className="text-xs text-gray-500">Property Manager</p>
        </div>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink to="/admin/dashboard" className={getLinkClass}>
          <DashboardIcon />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/properties" className={getLinkClass}>
          <PropertiesIcon />
          <span>Properties</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
