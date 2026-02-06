import type { TimerItem, TimerAction } from '@/features/timer/model';
import type {Dispatch} from "react";

import removeIcon from '@/app/assets/images/waste-basket.svg'
import {getFormatTimeBySeconds, formatTime} from "@/features/timer/lib/formatTime.ts";

import styles from './TimerDisplayItem.module.css';

interface TimerDisplayItemProps {
    timerItem: TimerItem;
    dispatch: Dispatch<TimerAction>;
}

export const TimerDisplayItem = ({ timerItem, dispatch }: TimerDisplayItemProps) => {
    const [minutes, seconds] = getFormatTimeBySeconds(timerItem.currentTimeInSeconds);

    return (
        <div className={styles.timerItemContainer}>
            <div className={styles.display}>{formatTime(String(minutes))} : {formatTime(String(seconds))}</div>
            <button onClick={() => dispatch({ type: 'REMOVE_TIMER', payload: timerItem.id } )}><img src={removeIcon} alt="remove"/></button>
        </div>
    );
};