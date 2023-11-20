import { useEffect } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import Icon from "@mdi/react";
import {
  mdiAlert,
  mdiAlertCircleOutline,
  mdiCheckBold,
  mdiInformation,
} from "@mdi/js";
import { useSelector } from "@/store/hooks";
import { hideAlert } from "@/store/slices/uiSlice";
import { Transition } from "..";

const Alert = () => {
  const dispatch = useDispatch();
  const { currentAlert } = useSelector((state) => state.ui);

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideAlert());
    }, 3500);
  }, [currentAlert]);

  const alertTypeClass = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  }[currentAlert.type];

  const alertIcon = {
    success: mdiCheckBold,
    error: mdiAlertCircleOutline,
    info: mdiInformation,
    warning: mdiAlert,
  }[currentAlert.type];

  return (
    <Transition
      show={currentAlert.show}
      className={clsx(
        "z-20 alert top-16 absolute",
        !currentAlert.show && "pointer-events-none opacity-0",
        alertTypeClass
      )}
      onClick={() => dispatch(hideAlert())}
    >
      <Icon path={alertIcon} size={1} />
      <span>{currentAlert.message}</span>
    </Transition>
  );
};

export default Alert;
