export interface TimerItem {
    id: string;
    seconds: number;
}

export interface TimerState {
    timerList: TimerItem[];
}

export type TimerAction =
    | { type: 'ADD_TIMER'; payload: number }
    | { type: 'REMOVE_TIMER'; payload: string };