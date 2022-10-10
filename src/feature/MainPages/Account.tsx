import * as React from "react";
import ButtonAction from "../components/ButtonAction";

interface IAccountProps {}

const Account: React.FunctionComponent<IAccountProps> = (props) => {
  return (
  <div>
    <p>Account</p>

    <br></br>

    <p><ButtonAction link2page={"/"} buttonName={"BACK TO HOMEPAGE"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Register"} buttonName={"Register"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Update"} buttonName={"Update"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Admin"} buttonName={"Admin"} multi_col={true}/></p> <br></br>
  </div>
  )
};

export default Account;