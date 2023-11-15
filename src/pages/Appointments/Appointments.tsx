import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { AppointmentCard, AppointmentDetails, Calendar } from "@/common";
import { useLazyGetMyAppointmentsQuery } from "@/services";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

const Appointments = () => {
  const navigate = useNavigate();
  const [getAppointments, { data, isLoading }] =
    useLazyGetMyAppointmentsQuery();

  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    getAppointments(selectedDate ? { date: +selectedDate } : {});
  }, [selectedDate]);

  const onDateSelect = (date: Date) => {
    setSelectedDate((p) => (!p || +p !== +date ? date : undefined));
  };

  const { id: selectedAppointment } = useParams();

  return (
    <>
      <div className="page overflow-hidden">
        <h1 className="text-3xl font-bold mr-auto mb-4">My appointments</h1>
        <div className="flex flex-1 w-full flex-row items-stretch overflow-hidden">
          <div className="min-w-[256px] basis-1/4 border-r border-r-gray-600 hidden md:flex flex-col">
            <Calendar
              onSelect={onDateSelect}
              events={data?.items.map((e) => e.startTime)}
              monthDate={new Date(2023, 9)}
              selectedDate={selectedDate}
            />
            <Calendar
              onSelect={onDateSelect}
              events={data?.items.map((e) => e.startTime)}
              monthDate={new Date(2023, 10)}
              selectedDate={selectedDate}
            />
          </div>
          <div className="basis-full md:basis-3/4 flex justify-center items-center flex-col gap-2">
            {isLoading && (
              <span className="loading loading-dots loading-lg"></span>
            )}
            {!isLoading && !data?.items.length && (
              <>
                <h3 className="text-2xl font-bold">
                  You have no appointments{" "}
                  {selectedDate ? "on this day" : "yet"}
                </h3>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/appointments/new")}
                >
                  Ask for one!
                </button>
              </>
            )}
            {!isLoading && !!data?.items.length && (
              <div className="flex flex-col h-full overflow-y-scroll p-0 pb-12 md:pb-24 md:p-4 w-full">
                {data?.items.map((appointment, index) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onClick={() => navigate(`/appointments/${appointment.id}`)}
                    sameDayAsPrevious={dayjs(
                      data?.items[index - 1]?.startTime
                    ).isSame(appointment.startTime, "day")}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        className="absolute btn btn-circle btn-lg btn-primary bottom-8 right-8"
        onClick={() => navigate("/appointments/new")}
      >
        <Icon path={mdiPlus} className="text-base-800" size={1.4} />
      </button>
      <AppointmentDetails
        isCreating={selectedAppointment === "new"}
        id={+(selectedAppointment as string)}
        existingData={data?.items.find(
          (e) => e.id === +(selectedAppointment as string)
        )}
      />
    </>
  );
};

export default Appointments;
