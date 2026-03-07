import styles from "./Clock.module.css";
import {formatTime, getFormatTimeBySeconds} from "../../lib/formatTime.ts";
import type {TimerItem} from "../../model";
import {useEffect, useRef} from "react";

interface ClockProps {
    timerItem: TimerItem;
}

function getCurrentDegPosition(timerItem: TimerItem): number {
    return timerItem.startTimeInSeconds
        ? 360 * (timerItem.startTimeInSeconds - timerItem.currentTimeInSeconds) / timerItem.startTimeInSeconds
        : 0;
}

export const Clock = ({timerItem}: ClockProps) => {
    const [minutes, seconds] = getFormatTimeBySeconds(timerItem.currentTimeInSeconds);
    const clock = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const deg = getCurrentDegPosition(timerItem);
        if (clock.current) { // when 5% of the time is left
            const color = (deg <= 342) ? '#4caf50' : '#D32F2F';
            clock.current.style.background = `conic-gradient(${color} 0deg ${deg}deg, #e0e0e0 ${deg}deg 360deg)`;
        }
    }, [timerItem.currentTimeInSeconds]);

    return (
        <div ref={clock} className={styles.clock}>{formatTime(String(minutes))} : {formatTime(String(seconds))}</div>
    )
}