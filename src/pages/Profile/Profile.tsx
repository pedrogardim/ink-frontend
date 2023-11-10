import { Link, useNavigate } from "react-router-dom";
import { ImageInput, Input } from "@/common";
import useFormValidation from "@/hooks/useFormValidation";
import { useLoginMutation } from "@/services/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { values, errors, onChange, onBlur, validateAll } = useFormValidation(
    "profile",
    user
  );

  console.log(values);

  const [login, { error: loginError }] = useLoginMutation();

  const onSubmit = async () => {
    const isValid = validateAll();
    if (!isValid) return;
    return;
    const res = await login(values);
    if ("error" in res) return;
    dispatch(setUser(values));
    navigate("/");
  };

  const inputsPages = [
    <>
      <ImageInput src={values.profilePicUrl} />
      <Input
        placeholder="Your first name"
        label="First Name"
        value={values.firstName}
        onChange={(v) => onChange("firstName", v)}
        onBlur={() => onBlur("firstName")}
        error={errors.firstName}
      />
      <Input
        className="mb-5"
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
        placeholder="Create a new password"
        label="New password"
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
    <div className="page max-w-screen-md mx-auto">
      <h1 className="text-3xl font-bold mr-auto mb-6">My profile</h1>
      <div className="grid grid-cols-2 gap-4 w-full h-96">
        {inputsPages.map((e) => (
          <div className="flex flex-col justify-center items-center">{e}</div>
        ))}
      </div>
      <div className="flex justify-end w-full">
        <button className="btn btn-primary" onClick={onSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
