import { Dispatch, SetStateAction } from "react";

export interface FormDescriptionValues {
    description: string;
}
export interface DescriptionFormProps {
    initialValues: FormDescriptionValues
    getter?: FormDescriptionValues;
    setter: Dispatch<SetStateAction<FormDescriptionValues>>
    setDescriptionFormValid: Dispatch<SetStateAction<boolean>>

}