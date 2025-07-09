import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Place from "./pages/Place";
import axios from "axios";
import Account from "./pages/Account";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";

axios.defaults.baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api"
    : "https://hotelbnb-vng7.onrender.com/api";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage/:action?/:id?" element={<Account />} />
          <Route path="/place/:id" element={<Place />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
