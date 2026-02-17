import {useEffect, useRef, useState} from 'react'
import { MAX_TIME_LENGTH } from '@/features/timer/lib/constants';
import { replaceChar } from '@/utils/helpers/string/replaceChar';
import { insertChar } from '@/utils/helpers/string/insertChar';
import {clearMinutes, clearSeconds, formatTime} from '@/features/timer/lib/formatTime';

import styles from './TimerInput.module.css';
import type {TimerInputProps} from "./TimerInputProps.ts";
import {getFormatTimeBySeconds, getSeconds} from "../../lib/formatTime.ts";

export const TimerInput = ({ initialSeconds, onChangeTime }: TimerInputProps) => {
    const [minutes, setMinutes] = useState<string>('')
    const [seconds, setSeconds] = useState<string>('')
    const inputMinutesRef = useRef<HTMLInputElement | null>(null);
    const inputSecondsRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const [minutes, seconds] = getFormatTimeBySeconds(initialSeconds);
        setMinutes(formatTime(String(minutes)));
        setSeconds(formatTime(String(seconds)));
    }, [initialSeconds]);

    useEffect(() => {
        onChangeTime(getSeconds(minutes, seconds));
    }, [minutes, seconds, onChangeTime]);

    const onchangeMinutesHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let time = minutes;
        const cursorPosition = inputMinutesRef.current?.selectionStart || 0;

        // BACKSPACE
        if (e.key === 'Backspace') {
            e.preventDefault();
            if (cursorPosition === 0) return;
            const newValue = time.slice(0, cursorPosition - 1) + time.slice(cursorPosition);
            setMinutes(newValue);
            requestAnimationFrame(() => {
                inputMinutesRef.current?.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            });
            return;
        }

        // DELETE
        if (e.key === 'Delete') {
            e.preventDefault();
            const newValue = time.slice(0, cursorPosition) + time.slice(cursorPosition + 1);
            setMinutes(newValue);
            requestAnimationFrame(() => {
                inputMinutesRef.current?.setSelectionRange(cursorPosition, cursorPosition);
            });
            return;
        }
    };

    const handleMinutesBeforeInput = (e: any) => {
        const time = minutes;
        const cursorPosition = inputMinutesRef.current?.selectionStart || 0;

        const inputEvent = e.nativeEvent as InputEvent;
        const char = inputEvent.data;

        if (!char || !/^[0-9]$/.test(char)) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        let newTime: string;

        if (time.length >= MAX_TIME_LENGTH) {
            newTime = replaceChar(time, cursorPosition, char);
        } else {
            newTime = insertChar(time, cursorPosition, char);
        }

        setMinutes(clearMinutes(newTime));

        requestAnimationFrame(() => {
            if (time.length == 2 && cursorPosition != 0) {
                inputSecondsRef.current?.focus();
                inputSecondsRef.current?.setSelectionRange(0, 0);
                return;
            }
            inputMinutesRef.current?.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        });
    };

    const onchangeSecondHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let time = seconds;
        const cursorPosition = inputSecondsRef.current?.selectionStart || 0;

        // BACKSPACE
        if (e.key === 'Backspace') {
            e.preventDefault();
            if (cursorPosition === 0) return;
            const newValue = time.slice(0, cursorPosition - 1) + time.slice(cursorPosition);
            setSeconds(newValue);
            requestAnimationFrame(() => {
                inputSecondsRef.current?.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            });
            return;
        }

        // DELETE
        if (e.key === 'Delete') {
            e.preventDefault();
            const newValue = time.slice(0, cursorPosition) + time.slice(cursorPosition + 1);
            setSeconds(newValue);
            requestAnimationFrame(() => {
                inputSecondsRef.current?.setSelectionRange(cursorPosition, cursorPosition);
            });
            return;
        }
    };

    const onBlurHandle = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        name == 'minutes' ? setMinutes(formatTime(value)) : setSeconds(formatTime(value));
    }

    const handleSecondBeforeInput = (e: any) => {
        const time = seconds;
        const cursorPosition = inputSecondsRef.current?.selectionStart || 0;

        const inputEvent = e.nativeEvent as InputEvent;
        const char = inputEvent.data;

        if (!char || !/^[0-9]$/.test(char)) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        let newTime: string;

        if (time.length >= MAX_TIME_LENGTH) {
            newTime = replaceChar(time, cursorPosition, char);
        } else {
            newTime = insertChar(time, cursorPosition, char);
        }

        setSeconds(clearSeconds(newTime));

        requestAnimationFrame(() => {
            inputSecondsRef.current?.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        });
    };


    return (
        <>
            <div className={styles.timerInput}>
                <div className={styles.part}>
                    <input ref={inputMinutesRef}
                           onBlur={onBlurHandle}
                           onChange={() => {}}
                           type="text"
                           name="minutes"
                           onKeyDown={onchangeMinutesHandler}
                           value={minutes}
                           className={styles.number}
                           onBeforeInput={handleMinutesBeforeInput}
                           inputMode="numeric"
                    />
                    <div className={styles.unit}>minutes</div>
                </div>
                <div className={styles.colon}>:</div>
                <div className={styles.part}>
                    <input ref={inputSecondsRef}
                           onBlur={onBlurHandle}
                           onChange={() => {}}
                           type="text"
                           name="seconds"
                           onKeyDown={onchangeSecondHandler}
                           value={seconds}
                           className={styles.number}
                           onBeforeInput={handleSecondBeforeInput}
                           inputMode="numeric"
                    />
                    <div className={styles.unit}>seconds</div>
                </div>
            </div>
        </>
    )
}
