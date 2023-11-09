import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, ImageInput } from "@/common";
import useFormValidation from "@/hooks/useFormValidation";
import clsx from "clsx";

const helperText = `
Welcome to our community!
You'll be asked to provide some basic information.
We value your privacy and security. Rest assured, your information is encrypted and stored securely. If you need any assistance during the registration process, please don't hesitate to contact our support team.
Thank you for choosing to join our community![temp]
`;

const Register = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const { values, errors, onChange, onBlur, validateAll } = useFormValidation(
    !page ? "registerFirstStep" : "registerSecondStep"
  );

  const hasErros = Object.keys(errors).length > 0;

  const onNext = () => {
    const isValid = validateAll();
    if (!isValid) return;
    if (!page) {
      setPage(1);
      return;
    }
    ///todo: api logic dispatch here
  };

  const inputsPages = [
    <>
      <ImageInput />
      <Input
        placeholder="Your first name"
        label="First Name"
        value={values.firstName}
        onChange={(v) => onChange("firstName", v)}
        onBlur={() => onBlur("firstName")}
        error={errors.firstName}
      />
      <Input
        placeholder="Your last name"
        label="Last Name"
        value={values.lastName}
        onChange={(v) => onChange("lastName", v)}
        onBlur={() => onBlur("lastName")}
        error={errors.lastName}
      />
    </>,
    <>
      <Input
        placeholder="Your email"
        label="Email"
        value={values.email}
        onChange={(v) => onChange("email", v)}
        onBlur={() => onBlur("email")}
        error={errors.email}
      />
      <Input
        placeholder="Your password"
        label="Password"
        value={values.password}
        onChange={(v) => onChange("password", v)}
        onBlur={() => onBlur("password")}
        error={errors.password}
        type="password"
      />
      <Input
        placeholder="Your phone number"
        label="Phone number"
        value={values.phoneNumber}
        onChange={(v) => onChange("phoneNumber", v)}
        onBlur={() => onBlur("phoneNumber")}
        error={errors.phoneNumber}
        type="number"
      />
    </>,
  ];
  return (
    <div className="page max-w-screen-sm mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Creating your account</h1>
        <p className="text-sm text-gray-500 mb-6">{helperText}</p>
      </div>
      <div className="flex flex-col w-full items-center justify-center h-96">
        {inputsPages[page]}
      </div>

      <div className="flex gap-x-2 mt-8">
        <button
          className="btn btn-neutral"
          onClick={() => (!page ? navigate("/login") : setPage(0))}
        >
          {!page ? "Back to login" : "Back"}
        </button>
        <button
          className={clsx("btn btn-primary", hasErros && "btn-disabled")}
          onClick={onNext}
        >
          {!page ? "Next" : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default Register;
