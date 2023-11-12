import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Register, Profile, Home } from "./pages";
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
      </Routes>
    </div>
  );
}

export default App;
