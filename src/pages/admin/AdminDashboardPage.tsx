import React, { useState, useEffect } from "react";
import {
  getBookings,
  updateBookingStatus,
  getSupportRequests,
  updateSupportRequestStatus,
  scheduleTechnician,
} from "../../services/api";
import ScheduleTechForm from "./ScheduleTechForm";
interface Booking {
  _id: string;
  propertyName: string;
  guestName?: string;
  checkInDate: string;
  checkOutDate: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

interface SupportRequest {
  _id: string;
  propertyId: string;
  issue: string;
  status: "Open" | "In Progress" | "Closed";
  createdAt: string;
}

// Reusable Stat Card component
const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
  </div>
);

// Reusable Status Badge component
const StatusBadge = ({ status }: { status: string }) => {
  const colorMap: Record<string, string> = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
    Open: "bg-red-100 text-red-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Closed: "bg-gray-200 text-gray-800",
  };
  return (
    <span
      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
        colorMap[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

const AdminDashboardPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenScheduler = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setIsScheduling(true);
  };
  const handleScheduleSubmit = async (visitData: {
    technicianName: string;
    scheduledAt: Date;
    notes: string;
  }) => {
    if (!selectedTicketId) return;
    try {
      await scheduleTechnician(selectedTicketId, visitData);
      alert("Technician scheduled successfully and guest has been notified.");
      setIsScheduling(false);
      setSelectedTicketId(null);
      fetchSupportRequests(); // Refresh list to show updated status
    } catch (error) {
      alert("Failed to schedule technician.");
      console.error(error);
    }
  };
  const fetchSupportRequests = async () => {
    try {
      const data = await getSupportRequests();
      setSupportRequests(data);
    } catch (error) {
      console.error("Failed to fetch support requests:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchSupportRequests();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: "Confirmed" | "Cancelled"
  ) => {
    try {
      await updateBookingStatus(id, status);
      fetchBookings();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Could not update booking status.");
    }
  };

  const handleUpdateSupportStatus = async (id: string, status: string) => {
    try {
      await updateSupportRequestStatus(id, status);
      fetchSupportRequests();
    } catch (error) {
      console.error("Failed to update support request status:", error);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Overview of your properties and bookings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={bookings.length} />
        <StatCard title="Active Listings" value={15} />
        <StatCard title="Average Rating" value="4.8" />
      </div>

      {/* Bookings Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {b.propertyName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(b.checkInDate).toLocaleDateString()} –{" "}
                      {new Date(b.checkOutDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-6 py-4 text-sm space-x-3">
                      {b.status === "Pending" && (
                        <button
                          onClick={() => handleUpdateStatus(b._id, "Confirmed")}
                          className="text-green-600 hover:text-green-900 font-semibold"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status !== "Cancelled" && (
                        <button
                          onClick={() => handleUpdateStatus(b._id, "Cancelled")}
                          className="text-red-600 hover:text-red-900 font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Support Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-black divide-gray-200">
              {supportRequests.map((r) => (
                <tr key={r._id}>
                  <td className="px-6 py-4 text-sm text-gray-800">{r.issue}</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {r.status}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    {(r.status === "Open" || r.status === "In Progress") && (
                      <button
                        onClick={() => handleOpenScheduler(r._id)}
                        className="text-blue-600 hover:text-blue-900 font-semibold"
                      >
                        Schedule Tech
                      </button>
                    )}
                    {r.status !== "Closed" && (
                      <button
                        onClick={() =>
                          handleUpdateSupportStatus(r._id, "Closed")
                        }
                        className="text-red-600 hover:text-red-900 font-semibold"
                      >
                        Close Ticket
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isScheduling && selectedTicketId && (
        <ScheduleTechForm
          isSaving={false} /* you can wire this up for better UX */
          onClose={() => setIsScheduling(false)}
          onSubmit={handleScheduleSubmit}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
