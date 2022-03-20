export function msToTime(ms: number) {
  let seconds = ms / 1000;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${hours >= 10 ? hours : hours < 10 && hours > 0 ? `0${hours}` : "00"}:${
    minutes >= 10 ? minutes : minutes < 10 && minutes > 0 ? `0${minutes}` : "00"
  }:${seconds >= 10 ? seconds : seconds < 10 && seconds > 0 ? `0${seconds}` : "00"}`;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
