import React from 'react';
import { useEffect, useState, useRef } from 'react';
import "../cssInfo.css";
import { useNavigate } from 'react-router-dom';
import { getApi } from "../../api/config/utils";
import { useSubstrate } from "../../api/providers/connectContext";
import { responsiveFontSizes } from '@mui/material';

interface Props {
    flag: boolean;
}

interface Fund {
    fundnum: string;
    creater: string;
    beneficiary: string;
    deposit: string;
    raised: string;
    start: string;
    end: string;
    goal: string;
    totalvote: string;
    voteflag: boolean;
}

type Funds = Fund[];

const FlagInfo: React.FC<Props> = (props) => {
    const { flag } = props;

    const { getExtension, accounts } = useSubstrate();

    const [apiBC, setApiBC] = React.useState<any>();
    const [listFunds, setListFunds] = React.useState<Funds>();
    const callApi = async () => {
        const api = await getApi();

        setApiBC(api);
    };
    const getFund = async (): Promise<Funds> => {
        //const res = await apiBC.query.fundRaising.funds
        const index = await apiBC.query.fundRaising.fundCount()
        let num: number = index.toHuman()
        console.log("num:", num);
        let res: Funds = [];
        if (flag) {
            res.push(
                {
                    fundnum: "fundindex",
                    creater: "creater",
                    beneficiary: "beneficiary",
                    deposit: "deposit",
                    raised: "raised",
                    start: "start time",
                    end: "end time",
                    goal: "goal",
                    totalvote: "totalvotes",
                    voteflag: true,
                }
            )
        } else {
            res.push(
                {
                    fundnum: "fundindex",
                    creater: "creater",
                    beneficiary: "beneficiary",
                    deposit: "deposit",
                    raised: "raised",
                    start: "start time",
                    end: "end time",
                    goal: "goal",
                    totalvote: "totalvotes",
                    voteflag: false,
                }
            )
        }
        // const tmp = await apiBC.query.fundRaising.funds(0);
        // console.log("res:", tmp.toHuman());
        for (let i = 0; i < num; i++) {
            const tmp = await apiBC.query.fundRaising.funds(i)
            const _flag = tmp.toHuman().voteflag;
            if (flag != _flag) continue;
            res.push(tmp.toHuman());
            console.log(typeof tmp.toHuman())
        }

        if (res.length == 1) {
            res.push({
                fundnum: "N/A",
                creater: "N/A",
                beneficiary: "N/A",
                deposit: "N/A",
                raised: "N/A",
                start: "N/A",
                end: "N/A",
                goal: "N/A",
                totalvote: "N/A",
                voteflag: false
            });
        }
        return res;
    };

    const listFund = async () => {
        let fund = await getFund();

        setListFunds(fund);
    }
    React.useEffect(() => {
        callApi();
        // getExtension();
        // getFund();
        listFund()
    }, [apiBC]);

    console.log('listfunc', listFunds)

    // React.useEffect(() => {

    //     getFund();
    // }, []);

    // useEffect(() => {


    //     console.log(Funds);
    // });
    //const index = apiBC.query.fundRaising.fundCount();

    return (


        <div>
            {
                <table border={1}>
                    <tbody>
                        {
                            listFunds?.map((fund: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td key={"fundnum"}>{fund.fundnum}</td>
                                        <td key={"Creator"}>{fund.creater}</td>
                                        <td key={"Deposit"}>{fund.deposit}</td>
                                        <td key={"Raised"}>{fund.raised}</td>
                                        <td key={"Start"}>{fund.start}</td>
                                        <td key={"End"}>{fund.end}</td>
                                        <td key={"Goal"}>{fund.goal}</td>
                                        <td key={"Totalvote"}>{fund.totalvote}</td>
                                        {/* <td key={"Voteflag"}>{fund.voteflag}</td> */}
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            }
        </div>
    )


}

export default FlagInfo