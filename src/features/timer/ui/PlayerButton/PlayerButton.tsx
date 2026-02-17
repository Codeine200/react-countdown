import type {Dispatch} from "react";
import type {TimerAction, TimerItem} from "../../model";

import styles from "./PlayerButton.module.css";
import playIcon from  '@/app/assets/images/play.svg';

interface PlayerButtonProps {
    timerList: TimerItem[];
    dispatch: Dispatch<TimerAction>;
}
export const PlayerButton = ({timerList, dispatch}: PlayerButtonProps) => {
    if (timerList.length == 0) {
        return ;
    }

    return (
        <>
            <button className={styles.play} onClick={() => {dispatch({ type: 'PLAY'})}}>
                <img src={playIcon} alt="play"/>
                <div>start timer{timerList.length > 1 && 's'}</div>
            </button>
        </>
    )
}