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
  Landing,
} from "./pages";
import { Header, Alert } from "./common";
import { useReduxNavigate } from "./hooks";
import { useSelector } from "./store/hooks";

function App() {
  const { user } = useSelector((state) => state.user);
  useReduxNavigate();
  return (
    <div className="relative max-w-screen-xl h-screen mx-auto flex flex-col">
      <Header />
      <Alert />
      <Routes>
        <Route path="/" element={!user ? <Landing /> : <Home />} />
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
