import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "@/store/hooks";
import { setRedirectsTo } from "@/store/slices/uiSlice";

const useReduxNagivate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { redirectsTo } = useSelector((state) => state.ui);

  useEffect(() => {
    if (!redirectsTo || pathname === redirectsTo) return;
    navigate(redirectsTo);
    dispatch(setRedirectsTo(null));
  }, [redirectsTo, pathname, navigate]);
};

export default useReduxNagivate;
