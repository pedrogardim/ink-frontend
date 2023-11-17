import { useEffect, useState } from "react";
import { useLazyGetTattooistsQuery } from "@/services";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import { TattooistGallery } from "@/common";

const Gallery = () => {
  const [getTattooists, { data: tattooists, isLoading }] =
    useLazyGetTattooistsQuery();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const debounced = setTimeout(() => {
      getTattooists({
        search: searchValue,
        pageSize: 5,
        joinTattooWorks: true,
      });
    }, 350);

    return () => clearTimeout(debounced);
  }, [searchValue]);

  return (
    <div className="page overflow-y-scroll">
      <div className="flex w-full items-center my-2">
        <h1 className="text-3xl font-bold mr-4">Tattooists</h1>
        <div className="relative">
          <Icon path={mdiMagnify} size={1} className="absolute top-3 left-2" />
          <input
            type="text"
            className="input input-bordered pl-9"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-1 w-full items-center justify-center">
        {!isLoading && tattooists && tattooists?.length > 0 && (
          <div className="w-full h-full overflow-y-scroll gap-y-4">
            {tattooists?.map((tattooist) => (
              <TattooistGallery key={tattooist.id} tattooist={tattooist} />
            ))}
          </div>
        )}
        {isLoading && (
          <span className="loading loading-dots loading-lg m-auto"></span>
        )}
        {!isLoading && tattooists?.length === 0 && (
          <span className="text-2xl font-bold m-auto">Tattooist not found</span>
        )}
      </div>
    </div>
  );
};

export default Gallery;
