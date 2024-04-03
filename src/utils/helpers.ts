export const formatTime = (time: number, showMilliseconds: boolean = true): string => {
  const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(3, '0'); // Upozornění: pro .sss použijte /10 a padStart(2, '0')
  let seconds: string | number = Math.floor((time / 1000) % 60);
  let minutes: string | number = Math.floor((time / (1000 * 60)) % 60);
  let hours: string | number = Math.floor((time / (1000 * 60 * 60)));

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}${showMilliseconds ? "." + milliseconds : ""}`;
};

export const classNames = (...classes: string[] | boolean[] | undefined[] | any) => {
  return classes.filter(Boolean).join(" ");
}
