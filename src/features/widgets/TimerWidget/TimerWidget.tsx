import {TimerForm, TimerList, PlayerButton, Clock} from "@/features/timer";
import {useTimer, } from "@/features/timer/model";

export const TimerWidget = () => {
    const {timerList, isPlay, dispatch} = useTimer();
    const [firstTimer] = timerList

    return (
        <>
            {!isPlay && (
                <>
                    <TimerForm dispatch={dispatch} />
                    <PlayerButton timerList={timerList} dispatch={dispatch} />
                    <TimerList timerList={timerList} dispatch={dispatch} />
                </>
            )}

            {isPlay && firstTimer && (
              <>
                  <Clock timerItem={firstTimer}/>
                  <TimerList timerList={timerList} dispatch={dispatch} />
              </>
            )}
        </>
    )
}