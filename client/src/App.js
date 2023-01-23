import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Accueil from "./Pages/Accueil";
import Register from "./Pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Message from "./Pages/Message.js";
 import Apropos from "./Pages/Apropos.js";
import UserListe from "./Pages/UserListe ";
import "./index.css";
import Profile from "./Pages/Profile.js"
function App() {
  return (
    <Router>
      {/* <Spinnerr /> */}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/Apropos" element={<Apropos />} />
        <Route path="/UserListe" element={<UserListe />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
