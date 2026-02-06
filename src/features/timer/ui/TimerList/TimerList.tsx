import type {TimerAction, TimerItem} from "../../model";
import type {Dispatch} from "react";
import {TimerDisplayItem} from "@/features/timer";

type TimerListProps = {
    timerList: TimerItem[];
    dispatch: Dispatch<TimerAction>;
};

export const TimerList = ({ timerList, dispatch }: TimerListProps) => {
    return (
        <>
            {timerList.map(timer => (
                <TimerDisplayItem timerItem={timer} dispatch={dispatch} key={timer.id} />
            ))}
        </>
    )
}