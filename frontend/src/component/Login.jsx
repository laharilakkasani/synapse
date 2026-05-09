import { useFormik } from "formik";
import React, { use } from "react";
import { useLoginMutation } from "../services/auth";

function Login() {
  var [loginFn] = useLoginMutation();
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      loginFn(values).then((res) => {
        console.log(res);
      });
    },
  });
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={loginForm.handleSubmit}>
        <input type="email" {...loginForm.getFieldProps("email")} />
        <br />
        <input type="password" {...loginForm.getFieldProps("password")} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;