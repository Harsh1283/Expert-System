import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExpertDetailsPage from "./pages/ExpertDetailsPage";
import MyBookingsPage from "./pages/MyBookingsPage";

import { SocketProvider } from "./context/SocketContext";

const App = () => {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/experts/:id"
            element={<ExpertDetailsPage />}
          />

          <Route
            path="/my-bookings"
            element={<MyBookingsPage />}
          />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
};

export default App;