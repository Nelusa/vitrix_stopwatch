import { useDispatch } from 'react-redux';
import {removeStopwatch, toggleStopwatch, updateStopwatchTime} from '../features/stopwatchesSlice';
import {useEffect} from "react";

interface StopwatchProps {
  id: string;
  name: string;
  time: number;
  isRunning: boolean;
}

const Stopwatch = ({ id, name, time, isRunning }: StopwatchProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        dispatch(updateStopwatchTime(id));
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, id, dispatch]);


  const startStopToggle = () => {
    dispatch(toggleStopwatch(id));
  };

  const handleRemove = () => {
    dispatch(removeStopwatch(id));
  };

  const formatTime = (time: number): string => {
    const milliseconds = Math.floor((time % 1000) / 100)
    let seconds: string | number = Math.floor((time / 1000) % 60)
    let minutes: string | number = Math.floor((time / (1000 * 60)) % 60)
    let hours: string | number = Math.floor((time / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div>
      <div>{name}</div>
      <div>{formatTime(time)}</div>
      <button onClick={startStopToggle}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleRemove} >Remove</button>
    </div>
  );
};

export default Stopwatch;