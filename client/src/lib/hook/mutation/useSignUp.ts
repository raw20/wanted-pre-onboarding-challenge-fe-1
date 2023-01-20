import { useMutation } from "@tanstack/react-query";
import { UserDataType } from "../../../Types/User.interface";
import { signUpController } from "../../api/auth";

function useSignUp() {
  const { data: responseMessage, mutate: signupMutation } = useMutation({
    mutationFn: ({ email, password }: UserDataType) =>
      signUpController(email, password),
  });
  return { responseMessage, signupMutation };
}

export default useSignUp;
