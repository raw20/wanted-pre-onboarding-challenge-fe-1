import { useMutation } from "@tanstack/react-query";
import { UserDataType } from "../../../Types/User.interface";
import { LoginController } from "../../api/auth";

function useLogin() {
  const { data: responseMessage, mutate: LoginMutation } = useMutation({
    mutationFn: ({ email, password }: UserDataType) =>
      LoginController(email, password),
  });
  return { responseMessage, LoginMutation };
}

export default useLogin;
