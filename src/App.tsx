import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Register,
  Profile,
  Home,
  Appointments,
  Gallery,
  ArtistPortfolio,
  Admin,
} from "./pages";
import { Header, Alert } from "./common";

function App() {
  return (
    <div className="relative max-w-screen-xl h-screen mx-auto flex flex-col">
      <Header />
      <Alert />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointments/:id?" element={<Appointments />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<ArtistPortfolio />} />
        <Route path="/admin/:entity?" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
