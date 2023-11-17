import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiArrowRight, mdiDelete, mdiPencil } from "@mdi/js";
import { PaginationResponse } from "@/types/pagination";
import type { User } from "@/types/user";

interface UserTableProps {
  users: PaginationResponse<User>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const userColums = [
  "ID",
  "Name",
  "Email",
  "Role",
  "Created / Updated At",
  "Edit",
  "Delete",
];

const UserTable = ({ users, setPage }: UserTableProps) => {
  const handlePrevPage = () => {
    setPage((p) => (p === 1 ? p : p - 1));
  };
  const handleNextPage = () => {
    if (users.pageIndex === users.totalPages) return;
    setPage((p) => p + 1);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 flex-shrink-1 overflow-scroll w-full">
        <table className="table table-zebra mb-2 flex-1 w-full rounded-xl overflow-hidden">
          {/* head */}
          <thead>
            <tr>
              {userColums.map((e) => (
                <th key={e}>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.items.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.profilePicUrl} alt={user.firstName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{`${user.firstName} ${user.lastName}`}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="flex flex-col items-center">
                    <span>
                      {dayjs(user.createdAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                    <span>
                      {dayjs(user.updatedAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                  </div>
                </td>
                <td>
                  <button className="btn btn-circle btn-info btn-sm">
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
        <div className="flex flex-col items-center font-bold uppercase text-sm">
          <span>{`Page ${users.pageIndex} - ${users.totalPages}`}</span>
          <span>{`(${users.startIndex} - ${
            users.startIndex + users.itemsPerPage - 1
          } of ${users.totalItems})`}</span>
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

export default UserTable;
