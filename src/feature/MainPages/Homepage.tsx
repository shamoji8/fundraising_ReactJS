import * as React from "react";
import ButtonAction from "../components/ButtonAction";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
  <div>
    <p>Homepage</p>

    <br></br>

    {/*<p><ButtonAction link2page={"/"} buttonName={"BACK TO HOMEPAGE"} multi_col={true}/></p> <br></br>*/}
    <p><ButtonAction link2page={"/Account"} buttonName={"Account"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Rating"} buttonName={"Rating"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Fundraising"} buttonName={"Fundraising"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Test"} buttonName={"Test"} multi_col={true}/></p> <br></br>

    {/*<p><ButtonAction link2page={"/Regist"} buttonName={"Regist"} multi_col={true}/></p>*/}
  </div>
  )
};

export default HomePage;
