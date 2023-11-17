import { useLazyGetUsersQuery } from "@/services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserTable from "./partials/UserTable";

const Admin = () => {
  const { entity } = useParams();
  const [page, setPage] = useState(1);
  const [getUsers, { data: users, isLoading }] = useLazyGetUsersQuery();

  useEffect(() => {
    getUsers({ page });
  }, [page]);

  return (
    <div className="page overflow-hidden items-start">
      <h1 className="text-2xl font-bold capitalize mb-4">{entity}</h1>
      {isLoading && (
        <span className="loading loading-dots loading-lg m-auto"></span>
      )}
      {users && <UserTable users={users} page={page} setPage={setPage} />}
    </div>
  );
};

export default Admin;
