import * as React from "react";
import { getApi } from "../api/config/utils";
import { useSubstrate } from "../api/providers/connectContext";

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  const { getExtension, accounts } = useSubstrate();

  const [apiBC, setApiBC] = React.useState<any>();
  const callApi = async () => {
    const api = await getApi();

    setApiBC(api);
  };

  React.useEffect(() => {
    callApi();
    getExtension();
  }, []);

  return <div>Register</div>;
}
