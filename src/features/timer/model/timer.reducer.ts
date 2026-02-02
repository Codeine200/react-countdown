import { TimerState, TimerAction, TimerItem } from './timer.types';

export const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
    switch (action.type) {
        case 'ADD_TIMER': {
            const newTimer: TimerItem = {
                id: crypto.randomUUID(),
                seconds: action.payload,
            };
            return { ...state, timerList: [...state.timerList, newTimer] };
        }

        case 'REMOVE_TIMER':
            return { ...state, timerList: state.timerList.filter(t => t.id !== action.payload) };

        default:
            return state;
    }
};