import * as React from "react";
import ButtonAction from "./components/ButtonAction";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
  <div>
    <p>Homepage</p>

    <br></br>

    <p><ButtonAction link2page={"/"} buttonName={"BACK TO HOMEPAGE"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/register"} buttonName={"Register"} multi_col={true}/></p>
  </div>
  )
};

export default HomePage;
