import { useEffect } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import Icon from "@mdi/react";
import {
  mdiAlert,
  mdiAlertCircleCheckOutline,
  mdiCheckBold,
  mdiInformation,
} from "@mdi/js";
import { useSelector } from "@/store/hooks";
import { hideAlert } from "@/store/slices/uiSlice";

const Alert = () => {
  const dispatch = useDispatch();
  const { currentAlert } = useSelector((state) => state.ui);

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideAlert());
    }, 2500);
  }, [currentAlert]);

  if (!currentAlert) return;

  const alertTypeClass = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  }[currentAlert.type];

  const alertIcon = {
    success: mdiCheckBold,
    error: mdiAlertCircleCheckOutline,
    info: mdiInformation,
    warning: mdiAlert,
  }[currentAlert.type];

  return (
    <div className={clsx("absolute top-16 alert", alertTypeClass)}>
      <Icon path={alertIcon} size={1} />
      <span>{currentAlert.message}</span>
    </div>
  );
};

export default Alert;
