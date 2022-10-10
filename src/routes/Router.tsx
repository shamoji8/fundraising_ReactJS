import { Route, Routes } from "react-router-dom";
import HomePage from "../feature/MainPages/Homepage";
import Account from "../feature/MainPages/Account";
import Rating from "../feature/MainPages/Rating";
import Admin from "../feature/MainPages/Admin";
import Register from "../feature/SubPages/Account/Register";
import Update from "../feature/SubPages/Account/Update";
import ApproveSysman from "../feature/SubPages/Account/Admin/Approve_Sysman";
import RevokeUser from "../feature/SubPages/Account/Admin/Revoke_User";
import Evalutation from "../feature/SubPages/Rating/Evaluation";
import CheckScore from "../feature/SubPages/Rating/Check_score";
import Regist from "../feature/MainPages/Regist";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/Rating" element={<Rating />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Update" element={<Update />} />
      <Route path="/Approve_Sysman" element={<ApproveSysman />} />
      <Route path="/Revoke_User" element={<RevokeUser />} />
      <Route path="/Evaluation" element={<Evalutation />} />
      <Route path="/Check_Score" element={<CheckScore />} />
      <Route path="/Regist" element={<Regist />} />
    </Routes>
  );
}

export default Router;
