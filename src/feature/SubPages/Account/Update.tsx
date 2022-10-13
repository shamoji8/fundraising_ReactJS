import * as React from "react";
import { useState } from "react";
import { getApi } from "../../../api/config/utils";
import { useSubstrate } from "../../../api/providers/connectContext";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { web3FromAddress } from '@polkadot/extension-dapp';
import ButtonAction from "../../components/ButtonAction";

export interface IUpdateProps { }

export default function Update(props: IUpdateProps) {
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

  type Account = {
    id: string;
    role: string;
    status: string;
    metadata: string;
    score: string;
  }

  const handleTransaction = async () => {

    if (accounts !== null) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
      const events = new Promise(async (resolve, reject) => {

        //const num = Number(addText);
        //ordered param
        // change module+
        await apiBC.tx.account
          // fixed value
          // dynamic value
          .updateAccount(addText)
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
                  if (section == 'account') {
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
    console.log("current Account:", accounts);
    const res = await apiBC.query.account.accountStorage(accounts[0].address);
    var sampleArea = document.getElementById("sampleArea");
      if (sampleArea) {
        sampleArea.innerHTML = res.toHuman().id;
        const account: Account = {
          id: res.toHuman().id,
          role: res.toHuman().role,
          status: res.toHuman().status,
          metadata: res.toHuman().metadata,
          score: res.toHuman().score,
        }
        console.log(account);
        console.log(res.toHuman().score);
      }
    console.log(res.toHuman());
  }

  const onClickAddText = () => {
    setAddText(text);
    setText("");
  }

  return (
    <div>
      Update<br></br>

      <p><ButtonAction link2page={"/account"} buttonName={"account"} multi_col={true} /></p>
      <br></br>

      <p>Type Metadate</p>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      {/* ↓buttonを追加 */}
      <button onClick={onClickAddText}>追加</button>

      {/*<p>リアルタイム：{text}</p>*/}

      {/* ↓pタグを追加 */}
      <p>ボタンクリック：{addText}</p>

      <div className='register'>
        <Button onClick={handleTransaction}>
          Transaction me
        </Button>
      </div>

      <br></br>

      <div className='register'>
        <Button onClick={handleQuery}>
          Query me
        </Button>
      </div>

      <br></br>

      <div id="sampleArea">サンプル</div>
    </div>
  )
}
