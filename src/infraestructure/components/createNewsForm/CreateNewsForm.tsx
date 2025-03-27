import { useFormik } from "formik";
import * as Yup from "yup";
import postCreateNewsHook from "../../hooks/postCreateNews/postCreateNewsHook";

interface FormValues {
    urlImg: string;
    author: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
}

interface CreateNewsFormProps {
    onClose: () => void;
}

export const CreateNewsForm = ({ onClose }: CreateNewsFormProps) => {
    const { dataNewsCreated, isLoadingCreatedNews, errorCreatedNews, fetchCreatedNews } = postCreateNewsHook();

    const formik = useFormik<FormValues>({
        initialValues: {
            urlImg: "",
            author: "",
            title: "",
            subtitle: "",
            description: "",
            category: "",
        },
        validationSchema: Yup.object({
            urlImg: Yup.string().max(500, "Máximo 500 caracteres").required("Requerido"),
            author: Yup.string().max(15, "Máximo 15 caracteres").required("Requerido"),
            title: Yup.string().max(25, "Máximo 25 caracteres").required("Requerido"),
            subtitle: Yup.string().max(20, "Máximo 20 caracteres").required("Requerido"),
            description: Yup.string().max(50, "Máximo 50 caracteres").required("Requerido"),
            category: Yup.string().max(30, "Máximo 30 caracteres").required("Requerido"),
        }),
        onSubmit: async (values, { resetForm }) => {
            await fetchCreatedNews({
                title: values.title,
                subtitle: values.subtitle,
                image: values.urlImg,
                description: values.description,
                author: values.author,
                category: values.category,
            });

            if (!errorCreatedNews) {
                resetForm();
                onClose();
            }
        }
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-25 bg-[#f6f3f480]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-xl font-semibold text-center mb-4">Nueva Noticia</h1>
                <form className="flex flex-col" onSubmit={formik.handleSubmit} noValidate>
                    <label htmlFor="urlImg" className="text-sm font-medium">Url de la Imagen</label>
                    <input
                        type="text"
                        id="urlImg"
                        name="urlImg"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.urlImg}
                        className="border rounded p-2 w-full mb-2 focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.urlImg && formik.errors.urlImg && (
                        <span className="text-red-500 text-xs">{formik.errors.urlImg}</span>
                    )}

                    <label htmlFor="author" className="text-sm font-medium mt-2">Autor</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.author}
                        className="border rounded p-2 w-full mb-2 focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.author && formik.errors.author && (
                        <span className="text-red-500 text-xs">{formik.errors.author}</span>
                    )}

                    <label htmlFor="title" className="text-sm font-medium mt-2">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        className="border rounded p-2 w-full mb-2 focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.title && formik.errors.title && (
                        <span className="text-red-500 text-xs">{formik.errors.title}</span>
                    )}

                    <label htmlFor="subtitle" className="text-sm font-medium mt-2">Subtítulo</label>
                    <input
                        type="text"
                        id="subtitle"
                        name="subtitle"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.subtitle}
                        className="border rounded p-2 w-full mb-2 focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.subtitle && formik.errors.subtitle && (
                        <span className="text-red-500 text-xs">{formik.errors.subtitle}</span>
                    )}

                    <label htmlFor="description" className="text-sm font-medium mt-2">Descripción</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        className="border rounded p-2 w-full mb-2 focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.description && formik.errors.description && (
                        <span className="text-red-500 text-xs">{formik.errors.description}</span>
                    )}

                    <label htmlFor="category" className="text-sm font-medium mt-2">Categoría</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        className="border rounded p-2 w-full mb-2 focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.category && formik.errors.category && (
                        <span className="text-red-500 text-xs">{formik.errors.category}</span>
                    )}

                    {isLoadingCreatedNews && <p className="text-blue-500 text-xs">Enviando...</p>}
                    {errorCreatedNews && <p className="text-red-500 text-xs">{errorCreatedNews}</p>}

                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            disabled={isLoadingCreatedNews}
                        >
                            {isLoadingCreatedNews ? "Enviando..." : "Enviar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
