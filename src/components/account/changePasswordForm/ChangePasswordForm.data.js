import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required("Este campo es obligatorio"),
    newPassword: Yup.string()
      .required("Este campo es obligatorio")
      .min(
        6,
        ({ min }) => `La Contraseña tiene que tener al menos ${min} caracteres`
      ),
    confirmNewPassword: Yup.string()
      .required("Este campo es obligatorio")
      .oneOf([Yup.ref("newPassword")], "Las contraseñas deben ser iguales"),
  });
}
