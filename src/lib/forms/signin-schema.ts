import { z } from "zod";

export const singInValidation = z.object({
  email: z
    .string({ required_error: "* Campo obrigatório" })
    .email({ message: "* E-mail inválido, insira um e-mail válido" }),
  name: z.string({ required_error: "* Campo obrigatório" }),
});

export type SingInValidation = z.infer<typeof singInValidation>;
