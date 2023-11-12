import { useGetMyAppointmentsQuery } from "@/services";

const Appointments = () => {
  const { data, isLoading, error } = useGetMyAppointmentsQuery({});

  return (
    <div className="page">
      <h1 className="text-2xl font-bold mr-auto">My appointments</h1>
      <div className="flex flex-1 w-full flex-row items-stretch">
        <div className="basis-1/4 border-r border-r-gray-600"></div>
        <div className="basis-3/4 flex justify-center items-center flex-col gap-2">
          {isLoading && (
            <span className="loading loading-spinner loading-lg"></span>
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
            <div className="flex-1 flex-col h-full overflow-y-scroll">
              {data?.items.map((e) => (
                <div className="border border-gray-300 rounded mb-4 p-2">
                  {e.description + " " + e.tattooist?.firstName}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
