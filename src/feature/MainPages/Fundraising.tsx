import * as React from "react";
import ButtonAction from "../components/ButtonAction";

interface IFundraisingProps {}

const Fundraising: React.FunctionComponent<IFundraisingProps> = (props) => {
  return (
  <div>
    <p>Fundraising</p>

    <br></br>

    <p><ButtonAction link2page={"/"} buttonName={"BACK TO HOMEPAGE"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Contribute"} buttonName={"Contribute"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Create"} buttonName={"Create"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Dispense"} buttonName={"Dispense"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Dissolve"} buttonName={"Dissolve"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Vote"} buttonName={"Vote"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Withdraw"} buttonName={"Withdraw"} multi_col={true}/></p> <br></br>
  </div>
  )
};

export default Fundraising;