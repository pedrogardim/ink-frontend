import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiArrowRight, mdiDelete, mdiPencil } from "@mdi/js";
import { PaginationResponse } from "@/types/pagination";
import type { Appointment } from "@/types/appointment";

interface AppointmentTableProps {
  appointments: PaginationResponse<Appointment>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const appointmentsColums = [
  "ID",
  "Description",
  "Client / Tattooist",
  "Type",
  "Start time / End time",
  "Created / Updated At",
  "Edit",
  "Delete",
];

const AppointmentTable = ({ appointments, setPage }: AppointmentTableProps) => {
  const handlePrevPage = () => {
    setPage((p) => (p === 1 ? p : p - 1));
  };
  const handleNextPage = () => {
    if (appointments.pageIndex === appointments.totalPages) return;
    setPage((p) => p + 1);
  };
  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="flex-1 flex-shrink-1 overflow-scroll w-full">
        <table className="table table-zebra mb-2 flex-1 w-full rounded-xl overflow-hidden">
          {/* head */}
          <thead>
            <tr>
              {appointmentsColums.map((e) => (
                <th key={e}>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {appointments.items.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="line-clamp-2">
                      {appointment.description}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="w-32 overflow-x-scroll">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={appointment.client?.profilePicUrl}
                            alt={appointment.client?.firstName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {`${appointment.client?.firstName} ${appointment.client?.lastName} (${appointment.client?.id})`}
                        </div>
                        <div className="text-sm opacity-50">
                          {appointment.client?.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={appointment.tattooist?.profilePicUrl}
                            alt={appointment.tattooist?.firstName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {`${appointment.tattooist?.firstName} ${appointment.tattooist?.lastName} (${appointment.tattooist?.id})`}
                        </div>
                        <div className="text-sm opacity-50">
                          {appointment.tattooist?.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{appointment.type}</td>
                <td>
                  <div className="flex flex-col items-center">
                    <span>
                      {dayjs(appointment.startTime).format("DD/MM/YYYY HH:mm")}
                    </span>
                    <span>
                      {dayjs(appointment.endTime).format("DD/MM/YYYY HH:mm")}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-center">
                    <span>
                      {dayjs(appointment.createdAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                    <span>
                      {dayjs(appointment.updatedAt).format("DD/MM/YYYY HH:mm")}
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
        <div className="flex flex-col items-center font-bold uppercase text-xs">
          <span>{`Page ${appointments.pageIndex} - ${appointments.totalPages}`}</span>
          <span>{`(${appointments.startIndex} - ${
            appointments.startIndex + appointments.itemsPerPage - 1
          } of ${appointments.totalItems})`}</span>
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

export default AppointmentTable;
