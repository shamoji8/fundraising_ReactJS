import { Route, Routes } from "react-router-dom";
import HomePage from "../feature/homepage";
import Register from "../feature/register";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Router;
