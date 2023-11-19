import { useEffect } from "react";
import { useLazyGetTattooistByIdQuery } from "@/services";
import { TattooistGallery } from "@/common";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "@/store/hooks";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

const ArtistPortfolio = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [getTattooist, { data: tattooist, isLoading }] =
    useLazyGetTattooistByIdQuery();

  useEffect(() => {
    getTattooist(id);
  }, []);

  return (
    <>
      <div className="page overflow-y-scroll">
        <div className="flex w-full items-center my-2 justify-center flex-1 flex-col">
          {isLoading && (
            <span className="loading loading-dots loading-lg"></span>
          )}
          {tattooist && (
            <div className="flex-1 w-full">
              <TattooistGallery key={tattooist.id} tattooist={tattooist} />
            </div>
          )}
          {!tattooist && !isLoading && (
            <>
              <span className="text-2xl font-bold mb-4">
                Tattooist not found
              </span>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/gallery")}
              >
                Back to gallery
              </button>
            </>
          )}
        </div>
      </div>
      {user?.role === "tattooist" && user?.id === +(id as string) && (
        <button
          className="absolute btn btn-circle btn-lg btn-primary bottom-8 right-8"
          onClick={() => navigate("/appointments/new")}
        >
          <Icon path={mdiPlus} className="text-base-800" size={1.4} />
        </button>
      )}
    </>
  );
};

export default ArtistPortfolio;
