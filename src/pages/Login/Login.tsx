import { Input } from "@/common";
import { Link } from "react-router-dom";

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
  return (
    <div className="page">
      <div className="max-w-screen-sm">
        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <p className="text-sm text-gray-500 mb-6">{helperText}</p>
      </div>
      <Input placeholder={"Insert your email"} label={"Email"} />
      <Input placeholder={"Insert your password"} label={"Password"} />
      <div className="flex gap-x-2 mt-8">
        <Link to="/register">
          <button className="btn btn-neutral">Create a new Account</button>
        </Link>
        <button className="btn btn-primary">Login</button>
      </div>
    </div>
  );
};

export default Login;
