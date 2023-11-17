import { useEffect } from "react";
import { useLazyGetTattooistByIdQuery } from "@/services";
import { TattooistGallery } from "@/common";
import { useParams } from "react-router-dom";

const ArtistPortfolio = () => {
  const { id } = useParams();
  const [getTattooist, { data: tattooist, isLoading }] =
    useLazyGetTattooistByIdQuery();

  useEffect(() => {
    getTattooist(id);
  }, []);

  return (
    <div className="page overflow-y-scroll">
      <div className="flex w-full items-center my-2">
        {isLoading && <span className="loading loading-dots loading-lg"></span>}
        {tattooist && (
          <TattooistGallery key={tattooist.id} tattooist={tattooist} />
        )}
      </div>
    </div>
  );
};

export default ArtistPortfolio;
