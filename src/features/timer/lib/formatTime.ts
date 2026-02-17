import {MAX_TIME_LENGTH} from "./constants.ts";

export function formatTime(time:string):string {
    if (time.length < MAX_TIME_LENGTH) {
        return  String(time).padStart(2, '0');
    }
    return time;
}

export function fixDisplaySecondsTime(time:string):string {
    if (time.length == MAX_TIME_LENGTH && Number(time.substring(0, 1)) > 5) {
        return "5" + time.substring(1, 2);
    }

    return time;
}

export function clearMinutes(time:string):string {
    const minutes = time.replace(/\D/g, '');
    if(minutes.length >= MAX_TIME_LENGTH) {
        return minutes.substring(0, MAX_TIME_LENGTH);
    }
    return minutes;
}

export function clearSeconds(time:string):string {
    const seconds = time.replace(/\D/g, '');
    if (seconds.length == MAX_TIME_LENGTH) {
        return fixDisplaySecondsTime(seconds);
    }
    return seconds.substring(0, MAX_TIME_LENGTH);
}

export function getFormatTimeBySeconds(seconds:number):number[] {
    return [Math.floor(seconds / 60), seconds % 60];
}

export function getSeconds(minutes:string, seconds:string):number {
    return parseInt(minutes)*60 + parseInt(seconds);
}