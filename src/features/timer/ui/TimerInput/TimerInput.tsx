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

        // overwrite
        if (/^[0-9]$/.test(e.key) && cursorPosition < MAX_TIME_LENGTH) {
            e.preventDefault();
            if (time.length >= MAX_TIME_LENGTH) {
                time = replaceChar(time, cursorPosition, e.key);
            } else {
                time = insertChar(time, cursorPosition, e.key);
            }
            setMinutes(clearMinutes(time));
            requestAnimationFrame(() => {
                if (time.length == 2 && cursorPosition != 0) {
                    inputSecondsRef.current?.focus();
                    inputSecondsRef.current?.setSelectionRange(0, 0);
                    return;
                }
                inputMinutesRef.current?.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
            });
        }
    };

    const onchangeSecondHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let time = seconds;
        const cursorPosition = inputSecondsRef.current?.selectionStart || 0;

        console.log('key:', e.key);
        console.log('code:', e.code);
        console.log('nativeEvent:', e.nativeEvent);
        console.log('e:', e);

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

        // overwrite
        if (/^[0-9]$/.test(e.key) && cursorPosition < MAX_TIME_LENGTH) {
            e.preventDefault();
            if (time.length >= MAX_TIME_LENGTH) {
                time = replaceChar(time, cursorPosition, e.key);
            } else {
                time = insertChar(time, cursorPosition, e.key);
            }
            setSeconds(clearSeconds(time));
            requestAnimationFrame(() => {
                inputSecondsRef.current?.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
            });
        }
    };

    const onBlurHandle = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        name == 'minutes' ? setMinutes(formatTime(value)) : setSeconds(formatTime(value));
    }


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
                    />
                    <div className={styles.unit}>seconds</div>
                </div>
            </div>
        </>
    )
}
