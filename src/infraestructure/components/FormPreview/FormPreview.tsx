import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/swiper-bundle.css';
import { CommonDataForm, CommonDataFormValues } from "../CommonDataForm/CommonDataForm";
import { NewDescriptionForm } from "../NewDescriptionForm/NewDescriptionForm";
import { Dispatch, SetStateAction, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { CustomModal } from "../customModal/CustomModal";

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

interface FormPreviewProps {
    getter: NewData
    setter: Dispatch<SetStateAction<NewData>>
    handlerSubmit: () => void

}

export const FormPreview = ({
    getter,
    setter,
    handlerSubmit,
}: FormPreviewProps) => {

    const [openConfrimationModal, setOpenConfrimationModal] = useState<boolean>()
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [commonData, setCommonData] = useState<CommonDataFormValues>({
        title: getter?.title || "",
        subtitle: getter?.subtitle || "",
        image: getter?.image || "",
        author: getter?.author || "",
        category: getter?.category || ""
    });
    const [descriptionData, setDescriptionData] = useState<{ description: string }>({ description: getter?.description || "" });
    const [formCommonValid, setFormCommonValid] = useState<boolean>(false)
    const [formDescriptionValid, setFormDescriptionValid] = useState<boolean>(false)

    const saveNews = () => {
        setter((prevState: NewData) => ({
            ...prevState,
            title: commonData.title,
            subtitle: commonData.subtitle,
            image: commonData.image,
            author: commonData.author,
            category: commonData.category,
            description: descriptionData.description ?? prevState.description
        }));
        setOpenConfrimationModal(true);
    };

    const handleCancel = () => {
        setOpenConfrimationModal(false)
    }


    const nextPrevStep = () => {
        if (!swiper) return
        if (activeIndex === 0) {
            setter((prevState: NewData) => ({
                ...prevState,
                title: commonData?.title,
                subtitle: commonData?.subtitle,
                image: commonData?.image,
                author: commonData?.author,
                category: commonData?.category,
            }))
            swiper.slideNext()
        } else {
            swiper.slidePrev()
        }
    }

    return (
        <div className="m-10">
            <div className="flex justify-center mt-5 ">
                <ol className="flex w-3xl  mb-4 sm:mb-5">
                    <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                            <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                            </svg>
                        </div>
                    </li>
                    <li className="flex  ">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                            <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                                <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
                            </svg>
                        </div>
                    </li>

                </ol>
            </div>

            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={((swiper) => setActiveIndex(swiper.realIndex))}
                onSwiper={(swiper) => setSwiper(swiper)}
                allowTouchMove={false}
            >
                <SwiperSlide>
                    <CommonDataForm
                        initialValues={{
                            title: getter?.title || "",
                            subtitle: getter?.subtitle || "",
                            image: getter?.image || "",
                            author: getter?.author || "",
                            category: getter?.category || ""
                        }}
                        setter={setCommonData}
                        getter={commonData}
                        setFormCommonValid={setFormCommonValid}

                    />
                </SwiperSlide>
                <SwiperSlide>
                    <NewDescriptionForm
                        initialValues={{ description: getter?.description || "" }}
                        setter={setDescriptionData}
                        getter={descriptionData}
                        setDescriptionFormValid={setFormDescriptionValid}
                    />
                </SwiperSlide>
            </Swiper>
            <div className="flex justify-end gap-5">
                <button
                    disabled={!formCommonValid}
                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
                    ${formCommonValid
                            ? 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                            : 'bg-gray-300 cursor-not-allowed opacity-50'}`}
                    onClick={() => nextPrevStep()}
                >
                    {activeIndex === 0 ? "Siguiente" : "Atrás"}
                </button>

                <button
                    disabled={!formDescriptionValid}
                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
                    ${formDescriptionValid
                            ? 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                            : 'bg-gray-300 cursor-not-allowed opacity-50'}`}
                    onClick={() => saveNews()}
                >
                    Guardar
                </button>

            </div>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold text-lg">Previsualización:</h4>
                <p><strong>Título:</strong> {commonData?.title}</p>
                <p><strong>Subtítulo:</strong> {commonData?.subtitle}</p>
                <img src={commonData?.image || 'default-image-url.jpg'} className="w-fit h-40" alt="Imagen" />
                <p><strong>Autor:</strong> {commonData?.author}</p>
                <p><strong>Categoría:</strong> {commonData?.category}</p>
            </div>
            {openConfrimationModal && (
                <CustomModal
                    isOpen={openConfrimationModal}
                    onClose={handleCancel}
                    onConfirm={handlerSubmit}
                    title="Confirmar"
                    message="¿Estás seguro de que deseas Confirmar"
                    type="confirm"
                />
            )
            }
        </div>
    )
}
