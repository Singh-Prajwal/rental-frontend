import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/Homepage";
import StaysPage from "./pages/StaysPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import TripDetailPage from "./pages/TripDetailPage";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyTripsPage from "./pages/MyTripsPage";
import AdminRoute from "./components/auth/AdminRoute";
import AdminPropertiesPage from "./pages/admin/AdminPropertiesPage";
import PublicOnlyRoute from "./components/auth/PublicOnlyRoute";

function App() {
  return (
    <div className="w-315 min-h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-grow bg-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/stays" element={<StaysPage />} />
          <Route path="/stays/:propertyId" element={<PropertyDetailPage />} />

          {/* --- NEW: PROTECTED PUBLIC ROUTES --- */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected Routes for Logged-in Users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/trips" element={<MyTripsPage />} />
            <Route path="/trips/:bookingId" element={<TripDetailPage />} />
            <Route
              path="/book/:propertyId/confirm"
              element={<CheckoutPage />}
            />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="properties" element={<AdminPropertiesPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
