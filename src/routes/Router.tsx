import { Route, Routes } from "react-router-dom";
import HomePage from "../feature/homepage";
import Account from "../feature/account";
import Rating from "../feature/rating";
import Register from "../feature/register";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/rating" element={<Rating />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Router;
