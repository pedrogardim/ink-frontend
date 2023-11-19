import { validationRules } from "@/utils/validation";
import { Appointment } from "@/types/appointment";
import { TattooWork } from "@/types/tattoowork";
import { User } from "@/types/user";
import { Input } from "@/common";

interface EditModalProps {
  values: User | Appointment | TattooWork;
  entity: "users" | "appointments" | "tattooWorks";
  isOpen: boolean;
  onClose: () => void;
}

const EditModal = ({ values, entity, isOpen, onClose }: EditModalProps) => {
  const isLoading = false;
  const fields = Object.keys(
    validationRules[entity.slice(0, -1) as keyof typeof validationRules]
  ).map((field) => (
    <Input
      key={field}
      label={field}
      type="text"
      //@ts-ignore
      value={values[field]}
      onChange={(value) => console.log(value)}
    />
  ));
  return (
    <dialog className="modal modal-open">
      <div className="modal-box flex flex-col max-w-screen-md">
        {isLoading && <span className="loading loading-dots loading-lg"></span>}
        <h2 className="modal-title font-bold text-xl capitalize mb-4">
          {entity}
        </h2>
        <div className="grid grid-cols-2">{fields}</div>
        <div className="flex justify-end gap-4 w-full">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </dialog>
  );
};

export default EditModal;
