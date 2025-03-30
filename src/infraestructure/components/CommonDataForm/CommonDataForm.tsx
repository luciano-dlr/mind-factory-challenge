import { Formik, Form, Field } from "formik";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import * as Yup from "yup";

export interface CommonDataFormValues {
    title: string;
    subtitle: string;
    image: string;
    author: string;
    category: string;
}

interface CommonDataFormProps {
    initialValues: CommonDataFormValues
    getter: CommonDataFormValues;
    setter: Dispatch<SetStateAction<CommonDataFormValues>>;
    setFormCommonValid: Dispatch<SetStateAction<boolean>>;
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required("El título es obligatorio"),
    subtitle: Yup.string().required("El subtítulo es obligatorio"),
    image: Yup.string().url("Debe ser una URL válida").required("La imagen es obligatoria"),
    author: Yup.string().required("El autor es obligatorio"),
    category: Yup.string().required("La categoría es obligatoria"),
});

export const CommonDataForm: FC<CommonDataFormProps> = ({ getter, setter, setFormCommonValid }) => {

    return (
        <Formik
            initialValues={getter || {
                title: "",
                subtitle: "",
                image: "",
                author: "",
                category: "",
            }}
            validationSchema={validationSchema}
            onSubmit={() => { }}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={true}
        >
            {({ errors,
                touched,
                handleChange,
                isValid }) => {

                setFormCommonValid(isValid);

                return (
                    <Form>
                        <h3 className="mb-4 text-lg font-medium leading-none text-gray-900">
                            Datos Generales
                        </h3>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            {/* Título */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Título
                                </label>
                                <Field
                                    type="text"
                                    name="title"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChange(e);
                                        setter(prevState => ({ ...prevState, title: e.target.value }))
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                    placeholder="Título de la noticia"
                                />
                                {errors.title && touched.title && (
                                    <p className="text-red-500 text-xs">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Subtítulo
                                </label>
                                <Field
                                    type="text"
                                    name="subtitle"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChange(e);
                                        setter(prevState => ({ ...prevState, subtitle: e.target.value }))
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                    placeholder="Subtítulo de la noticia"
                                />
                                {errors.subtitle && touched.subtitle && (
                                    <p className="text-red-500 text-xs">{errors.subtitle}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    URL de la Imagen
                                </label>
                                <Field
                                    type="text"
                                    name="image"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChange(e);
                                        setter(prevState => ({ ...prevState, image: e.target.value }))

                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                    placeholder="https://imagen.com"
                                />
                                {errors.image && touched.image && (
                                    <p className="text-red-500 text-xs">{errors.image}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Autor
                                </label>
                                <Field
                                    type="text"
                                    name="author"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChange(e);
                                        setter(prevState => ({ ...prevState, author: e.target.value }))

                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                    placeholder="Nombre del autor"
                                />
                                {errors.author && touched.author && (
                                    <p className="text-red-500 text-xs">{errors.author}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Categoría
                                </label>
                                <Field
                                    as="select"
                                    name="category"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChange(e);
                                        setter(prevState => ({ ...prevState, category: e.target.value }))

                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    <option value="deportes">Deportes</option>
                                    <option value="tecnologia">Tecnología</option>
                                    <option value="politica">Política</option>
                                    <option value="cultura">Cultura</option>
                                </Field>
                                {errors.category && touched.category && (
                                    <p className="text-red-500 text-xs">{errors.category}</p>
                                )}
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};