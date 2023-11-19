import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiArrowRight, mdiDelete, mdiPencil } from "@mdi/js";
import { PaginationResponse } from "@/types/pagination";
import type { TattooWork } from "@/types/tattoowork";

interface TattooWorkTableProps {
  tattooWorks: PaginationResponse<TattooWork>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setEditingItem: React.Dispatch<React.SetStateAction<number | null>>;
}

const tattooWorksColums = [
  "ID",
  "Preview",
  "Description",
  "Tattooist",
  "Type",
  "Created / Updated At",
  "Edit",
  "Delete",
];

const TattooWorkTable = ({
  tattooWorks,
  setPage,
  setEditingItem,
}: TattooWorkTableProps) => {
  const handlePrevPage = () => {
    setPage((p) => (p === 1 ? p : p - 1));
  };
  const handleNextPage = () => {
    if (tattooWorks.pageIndex === tattooWorks.totalPages) return;
    setPage((p) => p + 1);
  };
  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="flex-1 flex-shrink-1 overflow-scroll w-full">
        <table className="table table-zebra mb-2 flex-1 w-full rounded-xl overflow-hidden">
          {/* head */}
          <thead>
            <tr>
              {tattooWorksColums.map((e) => (
                <th key={e}>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {tattooWorks.items.map((tattooWork) => (
              <tr key={tattooWork.id}>
                <td>{tattooWork.id}</td>
                <td>
                  <img src={tattooWork.imageUrl} className="h-16" />
                </td>
                <td>
                  <div className="flex items-center gap-3 w-32">
                    <div className="line-clamp-2">{tattooWork.description}</div>
                  </div>
                </td>
                <td>
                  <div className="overflow-x-scroll">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={tattooWork.tattooist?.profilePicUrl}
                            alt={tattooWork.tattooist?.firstName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {`${tattooWork.tattooist?.firstName} ${tattooWork.tattooist?.lastName} (${tattooWork.tattooist?.id})`}
                        </div>
                        <div className="text-sm opacity-50">
                          {tattooWork.tattooist?.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{tattooWork.type}</td>
                <td>
                  <div className="flex flex-col items-center">
                    <span>
                      {dayjs(tattooWork.createdAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                    <span>
                      {dayjs(tattooWork.updatedAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-circle btn-info btn-sm"
                    onClick={() => setEditingItem(tattooWork.id)}
                  >
                    <Icon path={mdiPencil} size={0.8} />
                  </button>
                </td>
                <td>
                  <button className="btn btn-circle btn-error btn-sm">
                    <Icon path={mdiDelete} size={0.8} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-center items-center w-full gap-x-2">
        <button
          className="btn btn-sm btn-circle btn-ghost"
          onClick={handlePrevPage}
        >
          <Icon path={mdiArrowLeft} size={1} />
        </button>
        <div className="flex flex-col items-center font-bold uppercase text-xs">
          <span>{`Page ${tattooWorks.pageIndex} - ${tattooWorks.totalPages}`}</span>
          <span>{`(${tattooWorks.startIndex} - ${
            tattooWorks.startIndex + tattooWorks.itemsPerPage - 1
          } of ${tattooWorks.totalItems})`}</span>
        </div>

        <button
          className="btn btn-sm btn-circle btn-ghost"
          onClick={handleNextPage}
        >
          <Icon path={mdiArrowRight} size={1} />
        </button>
      </div>
    </div>
  );
};

export default TattooWorkTable;
