import { useFormik } from "formik";
import * as Yup from "yup";
import usePatchNewsHook from "../../hooks/useUpdateNews/usePatchNewsHook";

interface FormValues {
    id?: number;
    image: string;
    author: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
}

interface CreateNewsFormProps {
    onClose: () => void;
    newsData?: FormValues;

}

export const NewsUpdateForm = ({ onClose, newsData }: CreateNewsFormProps) => {

    const { fetchPatchNews, isLoadingUpdatedNews, errorUpdatedNews } = usePatchNewsHook(newsData?.id ?? 0);

    const formik = useFormik<FormValues>({
        initialValues: newsData || {
            image: "",
            author: "",
            title: "",
            subtitle: "",
            description: "",
            category: "",
        },
        validationSchema: Yup.object({
            image: Yup.string().max(500, "Máximo 500 caracteres").required("Requerido"),
            author: Yup.string().max(15, "Máximo 15 caracteres").required("Requerido"),
            title: Yup.string().max(25, "Máximo 25 caracteres").required("Requerido"),
            subtitle: Yup.string().max(20, "Máximo 20 caracteres").required("Requerido"),
            description: Yup.string().max(50, "Máximo 50 caracteres").required("Requerido"),
            category: Yup.string().max(30, "Máximo 30 caracteres").required("Requerido"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await fetchPatchNews(values);
                resetForm();
                onClose();
            } catch (error) {
                console.error("Error al actualizar la noticia", error);
            }
        }
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-25 bg-[#f6f3f480]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-xl font-semibold text-center mb-4">
                    Editar Noticia
                </h1>
                <form className="flex flex-col" onSubmit={formik.handleSubmit} noValidate>
                    {["image", "author", "title", "subtitle", "description", "category"].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="text-sm font-medium capitalize">
                                {field}
                            </label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values[field as keyof FormValues]}
                                className="border rounded p-2 w-full mb-2 focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.touched[field as keyof FormValues] &&
                                formik.errors[field as keyof FormValues] && (
                                    <span className="text-red-500 text-xs">
                                        {formik.errors[field as keyof FormValues]}
                                    </span>
                                )}
                        </div>
                    ))}

                    {isLoadingUpdatedNews && <p className="text-blue-500 text-xs">Enviando...</p>}
                    {errorUpdatedNews && <p className="text-red-500 text-xs">{errorUpdatedNews}</p>}

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
                            disabled={isLoadingUpdatedNews}
                        >
                            {isLoadingUpdatedNews ? "Enviando..." : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
