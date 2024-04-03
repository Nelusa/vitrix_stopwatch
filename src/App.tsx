import StopwatchesList from "./components/StopwatchesList.tsx";
import {addStopwatch} from "./features/stopwatchesSlice.ts";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store.ts";
import Button from "./components/Button.tsx";
import {PlusCircleIcon} from "@heroicons/react/24/outline";

function App() {
  const dispatch = useDispatch();
  const stopwatches = useSelector((state: RootState) => state.stopwatches.stopwatches);

  const addNewStopwatch = () => {
    if (stopwatches.length < 10) {
      dispatch(addStopwatch({ id: uuidv4(), name: '' }));
    } else {
      alert('Maximum number of stopwatches reached (10). Please remove some to add more');
    }
  };

  return (
    <main className="flex flex-col items-center py-16 px-6 space-y-12 max-h-screen w-11/12 mx-auto">
      <div className="flex flex-col items-center gap-y-4">
        <Button size="large" variant="secondary" onClick={addNewStopwatch} endIcon={<PlusCircleIcon width={24} fill="white" className="text-gray-800"/> }>Add stopwatch</Button>
        {stopwatches.length > 0 && (
          <div className="text-gray-500 italic leading-6">
            <p>Double click to change name of stopwatch ✏️</p>
            <p>Click on the stopwatch you want to focus ⏱️</p>
          </div>
        )}
      </div>
      <StopwatchesList />
    </main>
  )
}

export default App
