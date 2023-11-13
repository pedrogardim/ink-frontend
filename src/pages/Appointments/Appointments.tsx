import dayjs from "dayjs";
import { AppointmentCard, Calendar } from "@/common";
import { useGetMyAppointmentsQuery } from "@/services";

const Appointments = () => {
  const { data, isLoading, error } = useGetMyAppointmentsQuery({});

  const onDateSelect = (date: Date) => {
    console.log(date);
  };

  return (
    <div className="page">
      <h1 className="text-3xl font-bold mr-auto mb-4">My appointments</h1>
      <div className="flex flex-1 w-full flex-row items-stretch">
        <div className="min-w-[256px] basis-1/4 border-r border-r-gray-600 hidden md:flex flex-col">
          <Calendar
            onSelect={onDateSelect}
            events={data?.items.map((e) => e.startTime)}
            monthDate={new Date(2023, 9)}
          />
          <Calendar
            onSelect={onDateSelect}
            events={data?.items.map((e) => e.startTime)}
            monthDate={new Date(2023, 10)}
          />
        </div>
        <div className="basis-full md:basis-3/4 flex justify-center items-center flex-col gap-2">
          {isLoading && (
            <span className="loading loading-dots loading-lg"></span>
          )}
          {!isLoading && !data?.items.length && (
            <>
              <h3 className="text-2xl font-bold">
                You have no appointments yet
              </h3>
              <button className="btn btn-primary">Ask for one!</button>
            </>
          )}
          {!isLoading && data?.items.length && (
            <div className="flex-1 flex-col h-full overflow-y-scroll p-0 md:p-4">
              {data?.items.map((appointment, index) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
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
  );
};

export default Appointments;
