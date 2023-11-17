import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useLazyGetUsersQuery } from "@/services";
import UserTable from "./partials/UserTable";
import { useSelector } from "@/store/hooks";

const Admin = () => {
  const { entity } = useParams();
  const [page, setPage] = useState(1);
  const [getUsers, { data: users, isLoading }] = useLazyGetUsersQuery();
  const { searchValue } = useSelector((state) => state.ui);

  useEffect(() => {
    getUsers({ page, search: searchValue });
  }, [page]);

  useEffect(() => {
    const debouce = setTimeout(() => {
      getUsers({ page, search: searchValue });
    }, 400);

    return () => clearTimeout(debouce);
  }, [searchValue]);

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
