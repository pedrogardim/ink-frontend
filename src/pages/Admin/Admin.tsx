import { useLazyGetUsersQuery } from "@/services";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserTable from "./partials/UserTable";

const Admin = () => {
  const { entity } = useParams();
  const [getUsers, { data: users, isLoading }] = useLazyGetUsersQuery();

  useEffect(() => {
    getUsers({});
  }, []);

  return (
    <div className="page overflow-hidden items-start">
      <h1 className="text-2xl font-bold capitalize mb-4">{entity}</h1>
      {users && <UserTable users={users} />}
    </div>
  );
};

export default Admin;
