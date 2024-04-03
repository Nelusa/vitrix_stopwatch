import { useDispatch } from 'react-redux';
import {
  removeStopwatch,
  resetStopwatch,
  toggleStopwatch,
  updateStopwatchName,
} from '../features/stopwatchesSlice';
import {ChangeEvent, useEffect, useState} from "react";
import {formatTime} from "../utils/helpers.ts";

interface StopwatchProps {
  id: string;
  name: string;
  time: number;
  isRunning: boolean;
}

const Stopwatch = ({ id, name, time, isRunning }: StopwatchProps) => {
  const dispatch = useDispatch();
  const [nameEdit, setNameEdit] = useState(name);
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCurrentTime(previousTime => previousTime + 10);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isRunning]);


  /*useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        dispatch(updateStopwatchTime(id));
      }, 10);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, id, dispatch]);*/


  const startStopToggle = () => {
    if (!isRunning) {
      setCurrentTime(time);
    }
    dispatch(toggleStopwatch(id));
  };

  const handleRemove = () => {
    dispatch(removeStopwatch(id));
  };

  const handleReset = () => {
    dispatch(resetStopwatch(id));
    setCurrentTime(0);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameEdit(e.target.value);
  };

  const handleNameUpdate = () => {
    dispatch(updateStopwatchName({ id, name: nameEdit }));
  };

  return (
    <div>
      <input value={nameEdit} onChange={handleNameChange} onBlur={handleNameUpdate} />
      <div>{formatTime(currentTime)}</div>
      <button onClick={startStopToggle}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default Stopwatch;