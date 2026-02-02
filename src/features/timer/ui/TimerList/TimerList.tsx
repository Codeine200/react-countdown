import type {TimerItem} from "../../model";

type TimerListProps = {
    timerList: TimerItem[];
};

export const TimerList = ({ timerList }: TimerListProps) => {

    return (
        <>
            {timerList.map(timer => (
                <div key={timer.id}>{timer.seconds}</div>
            ))}
        </>
    )
}