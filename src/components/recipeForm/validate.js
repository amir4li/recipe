import * as yup from "yup";

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
  ];

export const recipeSchema = yup.object().shape({
    name: yup.string()
        .required("required"),
    category: yup.string()
        .required("required"),
    origin: yup.string(),
    description: yup.string()
        .max(200, "Description can contains less than or equal to 200 characters."),
    ingredients: yup.array()
        .required("required"),
    preparation: yup.array()
        .required("required"),
    photo: yup.string()
});

