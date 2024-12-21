export const validateFields = (email: string, password: string) => {
  const errors: string[] = [];

  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!re.test(email)) {
    errors.push("Por favor, insira um email válido. (Pode ser qualquer um em formato válido)");
  }

  if (password !== "admin") {
    errors.push("Senha inválida. (Use a senha padrão 'admin').");
  }

  return errors;
};