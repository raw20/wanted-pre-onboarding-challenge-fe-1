/* import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../interface/User.interface";
import { signUpController } from "../api/auth";

export function useSignUp({ email, password }: User) {
  const queryClient = useQueryClient();

  const signUpMutation = useMutation({
    mutationFn: ({ email, title }) => signUpController(email, password),
  });

  return signUpMutation
}
 */
