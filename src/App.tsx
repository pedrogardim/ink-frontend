import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Login, Register, Profile } from "./pages";
import { Header } from "./common";

function App() {
  return (
    <div className="max-w-screen-xl h-screen mx-auto flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
