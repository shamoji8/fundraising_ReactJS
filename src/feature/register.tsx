import * as React from "react";
import { getApi } from "../api/config/utils";

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  const [apiBC, setApiBC] = React.useState<any>();
  const callApi = async () => {
    const api = await getApi();

    setApiBC(api);
  };

  React.useEffect(() => {
    callApi();
  }, []);

  return <div>Register</div>;
}
