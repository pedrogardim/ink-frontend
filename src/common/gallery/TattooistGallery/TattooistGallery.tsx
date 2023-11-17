import { User } from "@/types/user";
import TattooWorkItem from "./partials/TattooWorkItem";
import { useState } from "react";
import { TattooWorkDetails } from "..";
import { Link } from "react-router-dom";

const TattooistGallery = ({ tattooist }: { tattooist: User }) => {
  const [selectedTatooWork, setSelectedTattooWork] = useState<number | null>();
  const tattooWork = tattooist.tattooWorks.find(
    (e) => e.id === selectedTatooWork
  );
  return (
    <>
      <div className="my-4 flex-1" key={tattooist.id}>
        <div className="flex items-center gap-x-5 mb-4">
          <img
            src={tattooist.profilePicUrl}
            className="rounded-full shadow-2xl bg-base-300 h-20 w-20"
          />
          <Link
            to={`/gallery/${tattooist.id}`}
            className="text-2xl font-bold"
          >{`${tattooist.firstName} ${tattooist.lastName}`}</Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {tattooist.tattooWorks.map((tattooWork) => (
            <TattooWorkItem
              tattooWork={{ ...tattooWork, tattooist }}
              key={tattooWork.id}
              selected={selectedTatooWork === tattooWork.id}
              onClick={() =>
                setSelectedTattooWork((p) =>
                  p === tattooWork.id ? null : tattooWork.id
                )
              }
            />
          ))}
        </div>
      </div>
      {tattooWork && (
        <TattooWorkDetails
          tattooWork={{
            ...tattooWork,
            tattooist,
          }}
          onClose={() => setSelectedTattooWork(null)}
        />
      )}
    </>
  );
};

export default TattooistGallery;
