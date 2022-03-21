import { msToTime } from "./timers";

export function logger(text: string) {
  const currentTime = new Date();
  const timer = `${
    currentTime.getHours() >= 10
      ? currentTime.getHours()
      : currentTime.getHours() < 10 && currentTime.getHours() > 0
      ? `0${currentTime.getHours()}`
      : "00"
  }:${
    currentTime.getMinutes() >= 10
      ? currentTime.getMinutes()
      : currentTime.getMinutes() < 10 && currentTime.getMinutes() > 0
      ? `0${currentTime.getMinutes()}`
      : "00"
  }:${
    currentTime.getSeconds() >= 10
      ? currentTime.getSeconds()
      : currentTime.getSeconds() < 10 && currentTime.getSeconds() > 0
      ? `0${currentTime.getSeconds()}`
      : "00"
  }`;
  const log = `[${timer}] ${text}`;
  return log;
}
