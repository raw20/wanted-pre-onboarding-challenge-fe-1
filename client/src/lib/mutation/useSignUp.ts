import { useMutation } from "@tanstack/react-query";
import { UserDataType } from "../../interface/User.interface";
import { signUpController } from "../api/auth";

function useSignUp() {
  const { data: responseMessage, mutate: signupMutation } = useMutation({
    mutationFn: ({ email, password }: UserDataType) =>
      signUpController(email, password),
    /*  onSettled: () => {
      setErrorMessage(faildMessage);
    },
    onError: () => {
      setErrorMessage("에러가 발생하였습니다. 다시 시도해주세요.");
    }, */
  });
  return { responseMessage, signupMutation };
}

export default useSignUp;
