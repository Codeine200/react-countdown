import {TimerForm, TimerList} from "@/features/timer";
import {timerReducer} from "@/features/timer/model";
import {useReducer} from "react";

const initialState = {
    timerList: []
};

export const TimerWidget = () => {
    const [state, dispatch] = useReducer(timerReducer, initialState);

    return (
        <>
            <TimerForm dispatch={dispatch} />
            <TimerList timerList={state.timerList} />
        </>
    )
}