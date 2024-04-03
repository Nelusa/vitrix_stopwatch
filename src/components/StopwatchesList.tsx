import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import Stopwatch from './Stopwatch';
import { setFocusedStopwatch } from '../features/stopwatchesSlice';

const StopwatchesList = () => {
  const dispatch = useDispatch();
  const stopwatches = useSelector((state: RootState) => state.stopwatches.stopwatches);
  const focusedStopwatchId = useSelector((state: RootState) => state.stopwatches.focusedStopwatchId);

  if (stopwatches.length === 0) {
    return <p className="text-center text-gray-500 text-lg">No stopwatches added yet 🤷🏻‍♀️</p>;
  }

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-10 mx-auto">
      {stopwatches.map((stopwatch) => (
        <div
          key={stopwatch.id}
          onClick={() => dispatch(setFocusedStopwatch(stopwatch.id))}
        >
          <Stopwatch {...stopwatch} focused={stopwatch.id === focusedStopwatchId} />
        </div>
      ))}
    </div>
  );
};

export default StopwatchesList;
