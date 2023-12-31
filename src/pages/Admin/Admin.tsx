import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useLazyGetAppointmentsQuery,
  useLazyGetTattooWorksQuery,
  useLazyGetUsersQuery,
} from "@/services";
import { useSelector } from "@/store/hooks";
import UserTable from "./partials/UserTable";
import AppointmentTable from "./partials/AppointmentTable";
import TattooWorkTable from "./partials/TattooWorkTable";
import EditModal from "./partials/EditModal";

const adminEntities = ["users", "appointments", "tattooWorks"] as const;
type AdminEntity = (typeof adminEntities)[number];

const Admin = () => {
  const { entity } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [editingItem, setEditingItem] = useState<number | null>(null);

  const [getUsers, { data: users, isLoading: isLoadingUsers }] =
    useLazyGetUsersQuery();
  const [
    getAppointments,
    { data: appointments, isLoading: isLoadingAppointments },
  ] = useLazyGetAppointmentsQuery();

  const [
    getTattooWorks,
    { data: tattooWorks, isLoading: isLoadingTattooWorks },
  ] = useLazyGetTattooWorksQuery();

  const { searchValue } = useSelector((state) => state.ui);

  const isLoading = isLoadingUsers || isLoadingAppointments;

  const itemsPerPage = {
    users: 10,
    appointments: 5,
    tattooWorks: 8,
  }[entity as AdminEntity];

  const getItems = useCallback(
    {
      users: getUsers,
      appointments: getAppointments,
      tattooWorks: getTattooWorks,
    }[entity as AdminEntity],
    [entity, getUsers, getAppointments]
  );

  const values = useMemo(
    () =>
      ({
        users,
        appointments,
        tattooWorks,
      }[entity as AdminEntity]?.items),
    [entity, users, appointments, tattooWorks]
  );

  useEffect(() => {
    if (!entity || !adminEntities.includes(entity as AdminEntity))
      navigate("/admin/users");
  }, [entity]);

  useEffect(() => {
    if (!getItems) return;
    getItems({ page, search: searchValue, pageSize: itemsPerPage });
  }, [page, getItems]);

  useEffect(() => {
    if (!getItems) return;
    const debouce = setTimeout(() => {
      getItems({ page, search: searchValue, pageSize: itemsPerPage });
    }, 400);

    return () => clearTimeout(debouce);
  }, [searchValue, getItems]);

  return (
    <div className="page overflow-hidden items-start">
      {isLoading && (
        <span className="loading loading-dots loading-lg m-auto"></span>
      )}
      {entity === "users" && users && (
        <UserTable
          users={users}
          setPage={setPage}
          setEditingItem={setEditingItem}
        />
      )}
      {entity === "appointments" && appointments && (
        <AppointmentTable
          appointments={appointments}
          setPage={setPage}
          setEditingItem={setEditingItem}
        />
      )}
      {entity === "tattooWorks" && tattooWorks && (
        <TattooWorkTable
          tattooWorks={tattooWorks}
          setPage={setPage}
          setEditingItem={setEditingItem}
        />
      )}
      {editingItem !== null && (
        <EditModal
          values={values?.find((e) => e.id === editingItem)}
          entity={entity as AdminEntity}
          isOpen={true}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
};

export default Admin;
