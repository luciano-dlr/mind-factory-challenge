import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/swiper-bundle.css';
import { CommonDataForm } from "../CommonDataForm/CommonDataForm";
import { NewDescriptionForm } from "../NewDescriptionForm/NewDescriptionForm";
import { useFormPreviewController } from "./useFormPreviewController";
import { NewsPreview } from "../NewsPreview/NewsPreview";
import { TwoStepStepper } from "../Steper/TwoStepsSteper";
import { FormPreviewProps } from "./types";
import { CustomModal } from "../CustomModal/CustomModalConfirm";


export const FormPreview = ({ getter, setter, handlerSubmit }: FormPreviewProps) => {

    const {
        openConfirmationModal,
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
        nextPrevStep
    } = useFormPreviewController(getter, handlerSubmit, setter);


    return (
        <div className="m-10">

            <TwoStepStepper currentStep={activeIndex} />

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
            <div className="flex sm:justify-end justify-between gap-5">
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

            <div className="bg-gray-200 rounded my-2">
                <NewsPreview basicData={commonData} description={descriptionData.description} />
            </div>

            {openConfirmationModal && (
                <CustomModal
                    isOpen={openConfirmationModal}
                    onClose={handleCancel}
                    onConfirm={handlerSubmit}
                    title="Confirmar"
                    message="¿Estás seguro de que deseas Confirmar?"
                    type="confirm"
                />
            )
            }
        </div>
    )
}
