import type { TimerState, TimerAction, TimerItem } from './timer.types';

export const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
    switch (action.type) {
        case 'ADD_TIMER': {
            const newTimer: TimerItem = {
                id: crypto.randomUUID(),
                currentTimeInSeconds: action.payload,
                startTimeInSeconds: action.payload
            };
            return { ...state, timerList: [...state.timerList, newTimer] };
        }

        case 'REMOVE_TIMER':
            if (state.timerList.length == 1) {
                return {...state, timerList: [], isPlay: false};
            }

            return { ...state, timerList: state.timerList.filter(t => t.id !== action.payload) };

        case "PLAY": {
            return {...state, isPlay: true};
        }

        case 'TICK': {
            if (state.timerList.length === 0) {
                return state;
            }

            const timerList = [...state.timerList];
            let item = timerList.shift();

            while (item && item.currentTimeInSeconds === 0) {
                item = timerList.shift();
            }

            if (!item) {
                return { ...state, timerList: [], isPlay: false };
            }

            item = { ...item, currentTimeInSeconds: item.currentTimeInSeconds - 1 };

            return {
                ...state,
                timerList: [item, ...timerList],
                isPlay: true,
            };
        }

        case 'CLEAR': {
            return {...state, timerList: [], isPlay: false};
        }

        default:
            return state;
    }
};