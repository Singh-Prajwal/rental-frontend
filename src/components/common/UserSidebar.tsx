import React from "react";
import { NavLink } from "react-router-dom";

// A helper for styling the links
const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
    isActive
      ? "bg-orange-100 text-brand-primary font-semibold"
      : "hover:bg-gray-100 text-gray-700"
  }`;

// Icons for each link
const TripsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const UserSidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0">
      <div className="p-4 space-y-2">
        <NavLink to="/trips" end className={getLinkClass}>
          <TripsIcon /> <span>Trips</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default UserSidebar;
