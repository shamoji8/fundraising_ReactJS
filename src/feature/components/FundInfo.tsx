import React from 'react';
import { useEffect, useState, useRef } from 'react';
import "../cssInfo.css";
import { useNavigate } from 'react-router-dom';
import { getApi } from "../../api/config/utils";
import { useSubstrate } from "../../api/providers/connectContext";
import { responsiveFontSizes } from '@mui/material';

interface Props {
}

interface Fund {
    creater: string;
    beneficiary: string;
    deposit: string;
    raised: string;
    start: string;
    end: string;
    goal: string;
    totalvote: string;
}

type Funds = Fund[];

const FundInfo: React.FC<Props> = (props) => {

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
        let res: Funds = [
            {
                creater: "creater",
                beneficiary: "beneficiary",
                deposit: "deposit",
                raised: "raised",
                start: "start time",
                end: "end time",
                goal: "goal",
                totalvote: "totalvotes"
            }
        ];
        // const tmp = await apiBC.query.fundRaising.funds(0);
        // console.log("res:", tmp.toHuman());
        for (let i = 0; i < num; i++) {
            const tmp = await apiBC.query.fundRaising.funds(i)
            res.push(tmp.toHuman());

        }

        if(res.length == 1) {
            res.push({
                creater: "N/A",
                beneficiary: "N/A",
                deposit: "N/A",
                raised: "N/A",
                start: "N/A",
                end: "N/A",
                goal: "N/A",
                totalvote: "N/A"
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
                                        <td key={"Creator"}>{fund.creater}</td>
                                        <td key={"Deposit"}>{fund.deposit}</td>
                                        <td key={"Raised"}>{fund.raised}</td>
                                        <td key={"Start"}>{fund.start}</td>
                                        <td key={"End"}>{fund.end}</td>
                                        <td key={"Goal"}>{fund.goal}</td>
                                        <td key={"Totalvote"}>{fund.totalvote}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            }
        </div>
    )


}

export default FundInfo