import { Appointment } from "@/types/appointment";

interface AppointmentCardProps {
  appointment: Appointment;
}
const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const { description, tattooist, type } = appointment;

  const cardTitle = `${(type as string)[0].toUpperCase()}${type?.slice(
    1
  )} with ${tattooist?.firstName}`;
  return (
    <div className="rounded-2xl shadow-xl border border-primary flex items-center p-4">
      <div>
        <img
          src={tattooist?.profilePicUrl}
          alt={tattooist?.firstName}
          className="rounded-full w-32 h-32"
        />
      </div>
      <div className="flex flex-col p-4 gap-y-2">
        <h2 className="text-2xl text-bold">{cardTitle}</h2>
        <p className="lines">{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
