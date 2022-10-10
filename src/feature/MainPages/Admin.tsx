import * as React from "react";
import ButtonAction from "../components/ButtonAction";

interface IAdminProps {}

const Admin: React.FunctionComponent<IAdminProps> = (props) => {
  return (
  <div>
    <p>Admin</p>

    <br></br>

    <p><ButtonAction link2page={"/Account"} buttonName={"BACK TO ACCOUNT"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Approve_Sysman"} buttonName={"Approve Sysman"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Revoke_User"} buttonName={"Revoke User"} multi_col={true}/></p> <br></br>
  </div>
  )
};

export default Admin;