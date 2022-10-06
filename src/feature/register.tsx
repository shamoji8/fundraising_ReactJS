import * as React from "react";
import { useState } from "react";
import { getApi } from "../api/config/utils";
import { useSubstrate } from "../api/providers/connectContext";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { web3FromAddress } from '@polkadot/extension-dapp';
import ButtonAction from "./components/ButtonAction";

export interface IRegisterProps { }

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

  const [text, setText] = useState("");

  /* ↓state変数「addText」を定義 */
  const [addText, setAddText] = useState("");

  const handleTransaction = async () => {

    if (accounts !== null) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
      const events = new Promise(async (resolve, reject) => {

        const num = Number(addText);
        //ordered param
        // change module+
        await apiBC.tx.templateModule
          // fixed value
          // dynamic value
          .doSomething(num)
          .signAndSend(
            accounts[0].address,
            { signer: injector?.signer },
            ({ status, events, dispatchError }: any) => {
              if (dispatchError) {
                if (dispatchError.isModule) {
                  // for module errors, we have the section indexed, lookup
                  const decoded = apiBC.registry.findMetaError(dispatchError.asModule);
                  const { docs, name, section } = decoded;
                  const res = 'Error'.concat(':', section, '.', name);
                  //console.log(`${section}.${name}: ${docs.join(' ')}`);
                  resolve(res);
                } else {
                  // Other, CannotLookup, BadOrigin, no extra info
                  //console.log(dispatchError.toString());
                  resolve(dispatchError.toString());
                }
              } else {
                events.forEach(({ event, phase }: any) => {
                  const { data, method, section } = event;
                  //console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                  if (section == 'templateModule') {
                    const res = 'Success'.concat(':', section, '.', method);
                    resolve(res);
                  }
                });
              }
            }
          );
      });
      console.log(await events);
    }

  }

  const handleQuery = async () => {
    // change module
    const res = await apiBC.query.templateModule.something();
    console.log(res.toHuman());

  }

  const onClickAddText = () => {
    setAddText(text);
    setText("");
  }

  return (
  <div>
    Register<br></br>

    <p><ButtonAction link2page={"/"} buttonName={"BACK TO HOMEPAGE"} multi_col={false}/></p>

    <input
      value={text}
      onChange={(event) => setText(event.target.value)}
    />

    {/* ↓buttonを追加 */}
    <button onClick={onClickAddText}>追加</button>

    <p>リアルタイム：{text}</p>

    {/* ↓pタグを追加 */}
    <p>ボタンクリック：{addText}</p>

    <Button onClick={handleTransaction}>
      Transaction me
    </Button>

    <Button onClick={handleQuery}>
      Query me
    </Button>
  </div>
  )
}
