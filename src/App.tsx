import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "@/common/layout/Header/Header";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <div className="max-w-screen-xl h-screen mx-auto flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
