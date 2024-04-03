import { useDispatch } from 'react-redux';
import {
  removeStopwatch,
  resetStopwatch,
  toggleStopwatch,
  updateStopwatchName,
} from '../features/stopwatchesSlice';
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {classNames, formatTime} from "../utils/helpers.ts";
import Button from "./Button.tsx";
import Input from "./Input.tsx";
import {TrashIcon} from "@heroicons/react/24/outline";
import { motion } from 'framer-motion';

interface StopwatchProps {
  id: string;
  name: string;
  time: number;
  isRunning: boolean;
  focused: boolean;
}

const bounceInVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const Stopwatch = ({ id, name, time, isRunning, focused }: StopwatchProps) => {
  const dispatch = useDispatch();
  const [nameEdit, setNameEdit] = useState(name);
  const [currentTime, setCurrentTime] = useState(time);
  const [isEditing, setIsEditing] = useState(false);

  const lastUpdateTime = useRef(Date.now());

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if(focused) {
          setCurrentTime(prevTime => prevTime + 10);
        } else {
          const now = Date.now();
          if(now - lastUpdateTime.current >= 1000) {
            setCurrentTime(prevTime => prevTime + 1000);
            lastUpdateTime.current = now;
          }
        }
      }, focused ? 10 : 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, focused]);

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

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    handleNameUpdate();
    setIsEditing(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={bounceInVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={classNames("relative w-full flex flex-col gap-y-1 items-center rounded-2xl px-4 py-6 bg-white border border-4 cursor-pointer", focused ? "border-primary-600 shadow-2xl" : "border-gray-100 shadow-lg hover:border-gray-200 opacity-90")}>
      <Button variant="error-icon" className="absolute right-0 top-0" onClick={handleRemove}>
        <TrashIcon width={16} />
      </Button>
      {isEditing ? (
        <Input
          placeholder="Stopwatch Name"
          value={nameEdit}
          onChange={handleNameChange}
          onBlur={handleInputBlur}
          label="Stopwatch"
          id="stopwatch"
          className="w-2/3"
        />
      ) : (
        <p onDoubleClick={handleDoubleClick} className="w-11/12 py-1.5 text-center">
          {name || "Stopwatch Name"}
        </p>
      )}
      <div className="flex flex-col gap-y-4 w-full">
        <p className="mx-auto text-primary-800 text-3xl text-center font-bold tracking-wider w-48">{formatTime(currentTime, focused)}</p>
        <div className="flex gap-x-2 w-full">
          <Button onClick={startStopToggle} className="flex-grow w-1/2">
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button variant="tertiary" onClick={handleReset} className="flex-grow w-1/2 ">Reset</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Stopwatch;