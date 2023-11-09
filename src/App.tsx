import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "@/common/layout/Header/Header";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Header />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </div>
  );
}

export default App;
