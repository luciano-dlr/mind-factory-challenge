import { Dispatch, SetStateAction } from "react";
import { NewData } from "../../../domain/api/entity/type";

export interface FormPreviewProps {
    getter: NewData
    setter: Dispatch<SetStateAction<NewData>>
    handlerSubmit: () => void
}
