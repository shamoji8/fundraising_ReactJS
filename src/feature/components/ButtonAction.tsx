import React from 'react';
import "../cssInfo.css";
import { useNavigate } from 'react-router-dom';

interface Props {
    link2page: string;
    buttonName: string;
    multi_col: boolean;
}

const ButtonAction: React.FC<Props> = (props) => {
    const {link2page, buttonName, multi_col} = props;
    const navigate = useNavigate();

    const redirect = (link:string) => {     
        navigate(link);
    };


    if (multi_col) {
        return (
            /*<div className='button-scroll' onClick={() => {redirect(link2page);}}>*/
            <div className='button' onClick={() => {redirect(link2page);}}>
                {buttonName}
            </div>
        )
    }
    else {
        return (
            <button onClick={() => {redirect(link2page);}}>
                {buttonName}
            </button>
        )
    }
}

export default ButtonAction