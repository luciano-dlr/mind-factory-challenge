import { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { NewData } from "../../../domain/api/entity/type";
import { CommonDataFormValues } from "../CommonDataForm/types";


export const useFormPreviewController = (
    initialData: NewData,
    handlerSubmit: () => void,
    setParentData: React.Dispatch<React.SetStateAction<NewData>>
) => {
    const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false);
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);


    const [commonData, setCommonData] = useState<CommonDataFormValues>({
        title: initialData?.title || "",
        subtitle: initialData?.subtitle || "",
        image: initialData?.image || "",
        author: initialData?.author || "",
        category: initialData?.category || ""
    });

    const [descriptionData, setDescriptionData] = useState<{ description: string }>({
        description: initialData?.description || ""
    });

    const [formCommonValid, setFormCommonValid] = useState<boolean>(false);
    const [formDescriptionValid, setFormDescriptionValid] = useState<boolean>(false);

    const saveNews = () => {
        setParentData(prevState => ({
            ...prevState,
            title: commonData.title,
            subtitle: commonData.subtitle,
            image: commonData.image,
            author: commonData.author,
            category: commonData.category,
            description: descriptionData.description ?? prevState.description
        }));
        setOpenConfirmationModal(true);
    };

    const handleCancel = () => {
        setOpenConfirmationModal(false);
    };

    const nextPrevStep = () => {
        if (!swiper) return;

        if (activeIndex === 0) {
            setParentData(prevState => ({
                ...prevState,
                title: commonData.title,
                subtitle: commonData.subtitle,
                image: commonData.image,
                author: commonData.author,
                category: commonData.category,
            }));
            swiper.slideNext();
        } else {
            swiper.slidePrev();
        }
    };

    return {
        openConfirmationModal,
        swiper,
        activeIndex,
        commonData,
        descriptionData,
        formCommonValid,
        formDescriptionValid,
        setSwiper,
        setActiveIndex,
        setCommonData,
        setDescriptionData,
        setFormCommonValid,
        setFormDescriptionValid,
        saveNews,
        handleCancel,
        nextPrevStep,
        handlerSubmit,

    };
};