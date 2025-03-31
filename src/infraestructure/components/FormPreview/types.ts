import { Dispatch, SetStateAction } from "react";

export interface NewData {
    id?: number | undefined;
    created_at?: string;
    title: string
    subtitle: string
    image: string
    author: string
    category: string
    description?: string;
}

export interface FormPreviewProps {
    getter: NewData
    setter: Dispatch<SetStateAction<NewData>>
    handlerSubmit: () => void
}
