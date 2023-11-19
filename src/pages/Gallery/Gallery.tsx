import { useEffect, useState } from "react";
import { useLazyGetTattooistsQuery } from "@/services";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import { TattooistGallery } from "@/common";
import { User } from "@/types/user";

const Gallery = () => {
  const [getTattooists, { data, isLoading }] = useLazyGetTattooistsQuery();
  const [searchValue, setSearchValue] = useState("");
  const [tattooists, setTattooists] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    if (page === 1) return;
    const getMore = async () => {
      const res = await getTattooists({
        search: searchValue,
        page,
        pageSize: 5,
        joinTattooWorks: true,
      });
      const users = res.data as User[];
      if (users.length < 5) setCanLoadMore(false);
      setTattooists((prev) => [...prev, ...users]);
    };
    getMore();
  }, [page]);

  useEffect(() => {
    const debounced = setTimeout(async () => {
      setCanLoadMore(true);
      setPage(1);
      const res = await getTattooists({
        search: searchValue,
        pageSize: 5,
        joinTattooWorks: true,
      });
      const users = res.data as User[];
      if (users.length < 5) setCanLoadMore(false);
      setTattooists(users);
    }, 350);

    return () => clearTimeout(debounced);
  }, [searchValue]);

  return (
    <div className="page overflow-y-scroll">
      <div className="flex flex-col w-full my-2 gap-y-3">
        <h1 className="text-3xl font-bold mr-4">Artists</h1>
        <span>
          Explore the portfolio of our talented artists for inspiration and
          discover the perfect design to bring your tattoo vision to life.
        </span>
        <div className="relative">
          <Icon path={mdiMagnify} size={1} className="absolute top-3 left-2" />
          <input
            type="text"
            className="input input-bordered pl-9"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col w-full items-center justify-center">
        {!isLoading && tattooists && tattooists?.length > 0 && (
          <>
            <div className="w-full h-full overflow-y-scroll gap-y-4">
              {tattooists?.map((tattooist) => (
                <TattooistGallery key={tattooist.id} tattooist={tattooist} />
              ))}
            </div>
            <div className="flex my-4">
              {canLoadMore && (
                <button
                  className="btn btn-outline"
                  onClick={() => setPage((p) => p + 1)}
                >
                  Load more
                </button>
              )}
            </div>
          </>
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
