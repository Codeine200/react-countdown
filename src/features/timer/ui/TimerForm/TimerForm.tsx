import {TimerInput} from "../TimerInput";

import styles from './TimerForm.module.css';

import plusIcon from '@/app/assets/images/plus.svg';
import {useEffect, useReducer, useState} from 'react';

import { timerReducer } from '@/features/timer/model';
import type {TimerAction, TimerState} from "../../model";

const initialState = {
    timerList: []
};

export const TimerForm = () => {
    const [state, dispatch] = useReducer<React.Reducer<TimerState, TimerAction>>(timerReducer, initialState);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        console.log('Timer list updated:', state.timerList);
    }, [state.timerList]);

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