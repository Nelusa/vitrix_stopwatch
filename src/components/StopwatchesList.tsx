import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import Stopwatch from './Stopwatch';
import { addStopwatch, setFocusedStopwatch } from '../features/stopwatchesSlice';
import { v4 as uuidv4 } from 'uuid';

const StopwatchesList = () => {
  const dispatch = useDispatch();
  const stopwatches = useSelector((state: RootState) => state.stopwatches.stopwatches);
  const focusedStopwatchId = useSelector((state: RootState) => state.stopwatches.focusedStopwatchId);

  const addNewStopwatch = () => {
    if (stopwatches.length < 10) {
      dispatch(addStopwatch({ id: uuidv4(), name: '' }));
    } else {
      alert('Maximum number of stopwatches reached (10). Please remove some to add more');
    }
  };

  return (
    <div>
      <button onClick={addNewStopwatch}>Add stopwatch</button>
      <div>
        {stopwatches.map((stopwatch) => (
          <div
            key={stopwatch.id}
            className={`${focusedStopwatchId === stopwatch.id ? 'focused' : ''}`} //change this to TW classes
            onClick={() => dispatch(setFocusedStopwatch(stopwatch.id))}
          >
            <Stopwatch {...stopwatch} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StopwatchesList;
