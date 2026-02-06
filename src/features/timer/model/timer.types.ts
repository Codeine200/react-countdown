export interface TimerItem {
    id: string;
    currentTimeInSeconds: number;
    startTimeInSeconds: number;
}

export interface TimerState {
    timerList: TimerItem[];
    isPlay: boolean;
}

export type TimerAction =
    | { type: 'ADD_TIMER'; payload: number }
    | { type: 'REMOVE_TIMER'; payload: string }
    | { type: 'PLAY' }
    | { type: 'TICK' }
    | { type: 'CLEAR' };