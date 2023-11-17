import type { TattooWork } from "@/types/tattoowork";
import { mdiClose, mdiRing, mdiWater } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";

interface TattooWorkDetailsProps {
  tattooWork: TattooWork;
  onClose?: () => void;
}

const TattooWorkDetails = ({ tattooWork, onClose }: TattooWorkDetailsProps) => {
  const { imageUrl, tattooist, description, type } = tattooWork;
  return (
    <div
      className={clsx(
        "fixed h-full w-full top-0 left-0 z-50",
        "flex bg-black",
        "bg-no-repeat bg-center bg-contain"
      )}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {onClose && (
        <button
          className="btn btn-circle absolute right-4 top-4"
          onClick={onClose}
        >
          <Icon path={mdiClose} size={1.2} />
        </button>
      )}
      <div
        className="absolute h-1/3 w-full bottom-0"
        style={{
          background: "linear-gradient(transparent,  black)",
        }}
      >
        <div className="max-w-screen-md mx-auto flex flex-col items-start justify-end h-full py-8 px-4">
          <div className="flex items-center mb-4">
            <img
              className="h-9 w-9 rounded-full bg-base-300 mr-4"
              src={tattooist.profilePicUrl}
            />
            <span className="text-2xl font-bold">
              {`${tattooist.firstName} ${tattooist.lastName}`}
            </span>
          </div>
          <span className="text-xl line-clamp-2 mb-2">{description}</span>
          <div className="flex">
            <span className="font-bold text-gray-500 mr-4">Type</span>
            <div className="flex items-center flex-grow-0">
              <span className="font-bold capitalize mr-1">{type}</span>
              <Icon path={type === "tattoo" ? mdiWater : mdiRing} size={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TattooWorkDetails;
