import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, ImageInput } from "@/common";

const helperText = `
Welcome to our community!
You'll be asked to provide some basic information.
We value your privacy and security. Rest assured, your information is encrypted and stored securely. If you need any assistance during the registration process, please don't hesitate to contact our support team.
Thank you for choosing to join our community![temp]
`;

const Register = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const inputsPages = [
    <>
      <ImageInput />
      <Input placeholder={"Your first name"} label={"First Name"} />
      <Input placeholder={"Your last name"} label={"Last Name"} />
    </>,
    <>
      <Input placeholder={"Your email"} label={"Email"} />
      <Input placeholder={"Your password"} label={"Password"} />
      <Input placeholder={"Your phone number"} label={"Phone number"} />
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
        <button className="btn btn-primary" onClick={() => setPage(1)}>
          {!page ? "Next" : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default Register;
