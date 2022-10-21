import React from 'react';
import { useEffect, useState, useRef } from 'react';
import "../cssInfo.css";
import { useNavigate } from 'react-router-dom';
import { getApi } from "../../api/config/utils";
import { useSubstrate } from "../../api/providers/connectContext";
import { responsiveFontSizes } from '@mui/material';

interface Props {
    data: [];
}

const ShowMap: React.FC<Props> = (props) => {
    const {data} = props;
    const { getExtension, accounts } = useSubstrate();

    const [apiBC, setApiBC] = React.useState<any>();
    const callApi = async () => {
        const api = await getApi();

        setApiBC(api);
    };

    return (
        <div>
            {
                <table border={1}>
                    <tbody>
                        {
                            data?.map((data: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td key={"id"}>{data.id}</td>
                                        <td key={"role"}>{data.role}</td>
                                        <td key={"status"}>{data.status}</td>
                                        <td key={"metadata"}>{data.metadata}</td>
                                        <td key={"score"}>{data.score}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            }

        </div>
    )
}

export default ShowMap