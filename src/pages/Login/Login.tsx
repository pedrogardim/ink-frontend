import { Link } from "react-router-dom";
import { Input } from "@/common";
import useFormValidation from "@/hooks/useFormValidation";
import { useLoginMutation } from "@/services/auth";

const helperText = `
Welcome! Please, login or create a new account.
If you're an existing user, enter your credentials and click on
the 'Login' button.
If you're new here, we're excited to have you! Click on 'Create a new
account' to get started. You'll need to provide some basic information
to set up your account.
Thank you for choosing our app!
`;

const Login = () => {
  const { values, errors, onChange, onBlur, validateAll } =
    useFormValidation("login");

  const [login, { error: loginError }] = useLoginMutation();

  const onSubmit = async () => {
    const isValid = validateAll();
    if (!isValid) return;
    const res = await login(values);
    if ("data" in res) {
      //TOKEN HERE
      console.log(res.data.data);
    }
  };

  return (
    <div className="page">
      <div className="max-w-screen-sm">
        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <p className="text-sm text-gray-500 mb-6">{helperText}</p>
      </div>
      <Input
        placeholder="Insert your email"
        label="Email"
        value={values.email}
        onChange={(v) => onChange("email", v)}
        onBlur={() => onBlur("email")}
        error={errors.email}
      />
      <Input
        placeholder="Insert your password"
        label="Password"
        value={values.password}
        onChange={(v) => onChange("password", v)}
        onBlur={() => onBlur("password")}
        error={errors.password}
        type="password"
      />
      {loginError && (
        <span className="text-error mt-6">Credentials are not valid</span>
      )}
      <div className="flex gap-x-2 mt-6">
        <Link to="/register">
          <button className="btn btn-neutral">Create a new Account</button>
        </Link>
        <button className="btn btn-primary" onClick={onSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
