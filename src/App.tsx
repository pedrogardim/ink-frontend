import "./App.css";
import { useDispatch, useSelector } from "@/store/hooks";
import { incrementByAmount } from "@/store/slices/counterSlice";

function App() {
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.counter);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => dispatch(incrementByAmount(-1))}
      >
        -
      </button>
      {value}
      <button
        className="btn btn-primary"
        onClick={() => dispatch(incrementByAmount(1))}
      >
        +
      </button>
    </>
  );
}

export default App;
