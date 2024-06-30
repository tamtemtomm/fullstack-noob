import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
  username: string;
  name: string;
}

export const SignIn = () => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is re quired")
      .matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid username"),
    name: yup.string().required("Name is required"),
  });

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    const { username, name } = data;
    console.log(username, name);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  return (
    <>
      <div> Sign-In</div>
      <h1>Welcome to Timo's Audio Chats</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Username: </label>
          <input type="text" id="" {...register("username")} />
          {errors.username && (
            <p style={{ color: "red" }}> {errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="">Name: </label>
          <input type="text" id="" {...register("name")} />
          {errors.name && (
            <p style={{ color: "red" }}> {errors.name.message}</p>
          )}
        </div>
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};
