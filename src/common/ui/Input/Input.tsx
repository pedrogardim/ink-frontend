import clsx from "clsx";

interface InputProps {
  label?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

const Input = ({
  label,
  error,
  value = "",
  type = "text",
  placeholder,
  onChange = () => {},
  onBlur = () => {},
}: InputProps) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          "input input-bordered w-full max-w-xs placeholder-gray-600",
          error && "input-error"
        )}
        onBlur={() => onBlur()}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {error && (
        <label className="label">
          <span className={clsx("label-text-alt", error && "text-error")}>
            {error}
          </span>
        </label>
      )}
    </div>
  );
};

export default Input;
