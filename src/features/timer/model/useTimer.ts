import {useEffect, useReducer} from "react";
import {timerReducer} from "./timer.reducer.ts";
import {initialState} from "./timer.state.ts";

export const useTimer = () => {
    const [state, dispatch] = useReducer(timerReducer, initialState);
    const {timerList, isPlay} = state;

    useEffect(() => {
        if (!isPlay) {
            return;
        }
        const timer = setInterval(() => {dispatch({ type: 'TICK'})}, 1000);
        return () => {clearInterval(timer);}
    }, [isPlay]);

    return {timerList, isPlay, dispatch};
}