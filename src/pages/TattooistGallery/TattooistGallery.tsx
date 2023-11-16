import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { useLazyGetTattooistsQuery } from "@/services";
import Icon from "@mdi/react";
import { mdiMagnify, mdiSearchWeb } from "@mdi/js";

const TattooistGallery = () => {
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

      <div className=" flex-1 w-full flex-col items-stretch overflow-y-scroll gap-y-4">
        {tattooists?.map((tattooist) => (
          <div className="my-4" key={tattooist.id}>
            <div className="flex items-center gap-x-5 mb-4">
              <img
                src={tattooist.profilePicUrl}
                className="rounded-full shadow-2xl bg-base-300 h-20 w-20"
              />
              <span className="text-2xl font-bold">{`${tattooist.firstName} ${tattooist.lastName}`}</span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {tattooist.tattooWorks.map((e) => (
                <div
                  key={e.id}
                  className="aspect-square bg-base-300 bg-center bg-cover hover:brightness-75 transition cursor-pointer"
                  style={{ backgroundImage: `url(${e.imageUrl})` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TattooistGallery;
