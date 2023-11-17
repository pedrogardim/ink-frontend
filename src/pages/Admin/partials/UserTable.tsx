import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiDelete, mdiPencil } from "@mdi/js";
import { PaginationResponse } from "@/types/pagination";
import type { User } from "@/types/user";

interface UserTableProps {
  users: PaginationResponse<User>;
}

const userColums = [
  "Name",
  "Email",
  "Role",
  "Created / Updated At",
  "Edit",
  "Delete",
];

const UserTable = ({ users }: UserTableProps) => {
  if (!users) return;
  return (
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          {userColums.map((e) => (
            <th key={e}>{e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {users.items.map((user) => (
          <tr key={user.id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
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
                <span>{dayjs(user.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                <span>{dayjs(user.updatedAt).format("DD/MM/YYYY HH:mm")}</span>
              </div>
            </td>
            <td>
              <button className="btn btn-circle btn-info">
                <Icon path={mdiPencil} size={1} />
              </button>
            </td>
            <td>
              <button className="btn btn-circle btn-error">
                <Icon path={mdiDelete} size={1} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {/* foot */}
      <tfoot>
        <div className="flex flex-row justify-center items-center">
          <button></button>
        </div>
      </tfoot>
    </table>
  );
};

export default UserTable;
