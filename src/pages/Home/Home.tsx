import { useDispatch } from "@/store/hooks";
import { setRedirectsTo } from "@/store/slices/uiSlice";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(setRedirectsTo("/login"))}>
        Show Alert
      </button>
    </div>
  );
};

export default Home;
