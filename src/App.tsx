import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "@/common/layout/Header/Header";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="max-w-screen-xl h-screen mx-auto flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
