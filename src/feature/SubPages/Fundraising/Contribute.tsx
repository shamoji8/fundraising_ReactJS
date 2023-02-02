import * as React from "react";
import { useState } from "react";
import { getApi } from "../../../api/config/utils";
import { useSubstrate } from "../../../api/providers/connectContext";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { web3FromAddress } from '@polkadot/extension-dapp';
import ButtonAction from "../../components/ButtonAction";
import FlagInfo from "../../components/FlagInfo";
import { ToastContainer, toast } from 'react-toastify';


export interface IContributeProps { }

export default function Evaluation(props: IContributeProps) {
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

  const [text1, setText1] = useState("");

  /* ↓state変数「addText1」を定義 */
  const [addText1, setAddText1] = useState("");

  const [text2, setText2] = useState("");

  /* ↓state変数「addText」を定義 */
  const [addText2, setAddText2] = useState("");

  const handleTransaction = async () => {

    if (accounts !== null) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
      const events = new Promise(async (resolve, reject) => {

        //const num = Number(addText);
        //ordered param
        // change module+
        await apiBC.tx.fundRaising
          // fixed value
          // dynamic value
          .contribute(addText1, addText2)
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

      const notification = (await events) as string;
      if (notification.includes("Success")) {
        toast.success(notification);
      } else {
        toast.error(notification);
      }
    }

  }

  const handleQuery = async () => {
    // change module
    console.log("current Account:", accounts);
    const res = await apiBC.query.account.accountStorage(accounts[0].address);
    console.log(res.toHuman());
  }

  const onClickAddText1 = () => {
    setAddText1(text1);
    setText1("");
  }

  const onClickAddText2 = () => {
    setAddText2(text2);
    setText2("");
  }

  return (
    <div>
      <ToastContainer />
      Contribute<br></br>

      <p><ButtonAction link2page={"/Fundraising"} buttonName={"Fundraising"} multi_col={true} /></p>
      <br></br>

      <p>Enter the fundindex and value you want to contribute</p>
      <br></br>
      <p>FundIndex</p>
      <input
        value={text1}
        onChange={(event) => setText1(event.target.value)}
      />

      {/* ↓buttonを追加 */}
      <button onClick={onClickAddText1}>追加</button>

      {/*<p>リアルタイム：{text}</p>*/}

      {/* ↓pタグを追加 */}
      <p>ボタンクリック：{addText1}</p>

      <br></br>
      <p>Value</p>
      <input
        value={text2}
        onChange={(event) => setText2(event.target.value)}
      />

      {/* ↓buttonを追加 */}
      <button onClick={onClickAddText2}>追加</button>

      {/* ↓pタグを追加 */}
      <p>ボタンクリック：{addText2}</p>

      <br></br>

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

      <FlagInfo flag = {true}/>
    </div>
  )
}