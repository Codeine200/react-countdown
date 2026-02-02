import {TimerInput} from "../TimerInput";

import styles from './TimerForm.module.css';

import plusIcon from '@/app/assets/images/plus.svg';
import type {Dispatch} from "react";
import type {TimerAction} from "../../model";
import {useState} from "react";


interface TimerFormProps {
    dispatch: Dispatch<TimerAction>;
}

export const TimerForm = ({ dispatch }: TimerFormProps) => {
    const [seconds, setSeconds] = useState<number>(0);

    const handleChangeTime = (seconds: number) => {
        setSeconds(seconds);
    };

    const handleAddTimer = () => {
        dispatch({ type: 'ADD_TIMER', payload: seconds });
    };


    return (
        <>
            <div className={styles.timerForm}>
                <TimerInput initialSeconds={60} onChangeTime={handleChangeTime} />
                <button className={styles.plus} onClick={handleAddTimer}><img src={plusIcon} alt="add timer"/></button>
            </div>
        </>
    )
}