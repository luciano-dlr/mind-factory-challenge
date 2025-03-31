import { Dispatch, SetStateAction } from "react";

export interface CommonDataFormValues {
    title: string;
    subtitle: string;
    image: string;
    author: string;
    category: string;
}

export interface CommonDataFormProps {
    initialValues: CommonDataFormValues
    getter: CommonDataFormValues;
    setter: Dispatch<SetStateAction<CommonDataFormValues>>;
    setFormCommonValid: Dispatch<SetStateAction<boolean>>;
}
