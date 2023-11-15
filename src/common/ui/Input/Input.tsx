import clsx from "clsx";

interface InputProps {
  label?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
}

const Input = ({
  label,
  error,
  value = "",
  type = "text",
  placeholder,
  onChange = () => {},
  onBlur = () => {},
  className,
}: InputProps) => {
  return (
    <div className={clsx("form-control w-full max-w-xs", className)}>
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
      <label className={clsx("label p-1", !error && "opacity-0")}>
        <span className={"label-text-alt text-error"}>{error || "A"}</span>
      </label>
    </div>
  );
};

export default Input;
