import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { getApi } from "../../api/config/utils";
import { useSubstrate } from "../../api/providers/connectContext";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { web3FromAddress } from '@polkadot/extension-dapp';
import ButtonAction from "../components/ButtonAction";
import AccInfo from "../components/AccInfo";
import FundInfo from "../components/FundInfo";

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

    type Fund = {
        creater: string;
        beneficiary: string;
        deposit: string;
        raised: string;
        start: string;
        end: string;
        goal: string;
        totalvote: string;
    }

    let Funds: any = [
        {
            creater: "creater",
            beneficiary: "beneficiary",
            deposit: "deposit",
            raised: "raised",
            start: "start",
            end: "end",
            goal: "goal",
            totalvote: "totalvote"
        },
        {
            creater: "data",
            beneficiary: "data",
            deposit: "data",
            raised: "data",
            start: "data",
            end: "data",
            goal: "data",
            totalvote: "data"
        }
    ];

    const handleQuery = async () => {
        // change module
        console.log("current Account:", accounts);
        const res = await apiBC.query.fundRaising.funds(0);

        console.log(res.toHuman());
    }

    const onClickAddText = () => {
        setAddText(text);
        setText("");
    }

    return (
        <div>
            Test<br></br>

            <p><ButtonAction link2page={"/"} buttonName={"BACK TO HOMEPAGE"} multi_col={true} /></p> <br></br>
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

            {/* <FundInfo /> */}



        </div >
    )
}
