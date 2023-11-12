import { useDispatch } from "@/store/hooks";
import { showAlert } from "@/store/slices/uiSlice";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() =>
          dispatch(showAlert({ type: "success", message: "Alert works!" }))
        }
      >
        Show Alert
      </button>
    </div>
  );
};

export default Home;
