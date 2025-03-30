import { Formik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import { Dispatch, SetStateAction, useState } from "react";

export interface FormDescriptionValues {
    description: string;
}
interface DescriptionFormProps {
    initialValues: FormDescriptionValues
    getter?: FormDescriptionValues;
    setter: Dispatch<SetStateAction<FormDescriptionValues>>
    setDescriptionFormValid: Dispatch<SetStateAction<boolean>>

}


const validationSchema = Yup.object().shape({
    description: Yup.string().required("La descripción es obligatoria").min(25, 'Minimo 25 caracteres')

});

export const NewDescriptionForm: React.FC<DescriptionFormProps> = ({ initialValues, setter, setDescriptionFormValid }) => {
    const [charCount, setCharCount] = useState(0);
    return (
        <Formik
            initialValues={initialValues || {
                description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={() => { }}
            validateOnChange={true}
            validateOnBlur={false}
            validateOnMount={true}
        >
            {({ errors, touched, values, handleChange, isValid }) => {

                setDescriptionFormValid(isValid)

                return (
                    <Form >
                        <div className="flex flex-col items-center">
                            <div className="w-full sm:w-2/3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Descripción detallada
                                </label>
                                <Field
                                    name="description"
                                    value={values.description}
                                    as="textarea"
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        handleChange(e);
                                        setCharCount(e.target.value.length);
                                        setter(prevState => ({ ...prevState, description: e.target.value }))
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                    placeholder="Descripción de la noticia"
                                    rows={10}
                                />
                                <div className="mt-1 text-xs text-gray-500">
                                    {charCount} caracteres
                                </div>
                                {errors.description && touched.description && (
                                    <p className="text-red-500 text-xs">{errors.description}</p>
                                )}
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
};