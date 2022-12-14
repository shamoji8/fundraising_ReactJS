import * as React from "react";
import ButtonAction from "../components/ButtonAction";

interface IHomePageProps {}

const Rating: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
  <div>
    <p>Rating</p>

    <br></br>

    <p><ButtonAction link2page={"/"} buttonName={"BACK TO HOMEPAGE"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Evaluation"} buttonName={"Evaluation"} multi_col={true}/></p> <br></br>
    <p><ButtonAction link2page={"/Check_Score"} buttonName={"Check Score"} multi_col={true}/></p> <br></br>
  </div>
  )
};

export default Rating;

