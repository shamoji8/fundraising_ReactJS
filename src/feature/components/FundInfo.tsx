import React from 'react';
import { useEffect, useState, useRef } from 'react';
import "../cssInfo.css";
import { useNavigate } from 'react-router-dom';
import { getApi } from "../../api/config/utils";
import { useSubstrate } from "../../api/providers/connectContext";
import { responsiveFontSizes } from '@mui/material';

interface Props {
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
    }
];


const FundInfo: React.FC<Props> = (props) => {

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

    const renderFlgRef = useRef(false)

    let len;

    useEffect(() => {
        (async () => {
            //const res = await apiBC.query.fundRaising.funds
            const index = await apiBC.query.fundRaising.fundCount()
            let num:number = index.toHuman()
            len = num;

            for (let i = 0; i < num; i++) {
                const tmp = await apiBC.query.fundRaising.funds(i)
                Funds.push(tmp.toHuman());
                // ↓ ???
                console.log(i);
                console.log("check");
                console.log(Funds.length);
            }
        })()
    })
    //const index = apiBC.query.fundRaising.fundCount();
    return (
        <div>
            {
                <table border={1}>
                    {Funds.map((fund: any) => {
                        return (
                            <tr>
                                <td >{fund.creater}</td>
                                <td >{fund.deposit}</td>
                                <td >{fund.raised}</td>
                                <td >{fund.start}</td>
                                <td >{fund.end}</td>
                                <td >{fund.goal}</td>
                                <td >{fund.totalvote}</td>
                            </tr>
                        )
                    })}
                </table>
            }
        </div>
    )


}

export default FundInfo