import { FormPreview } from "../../components/FormPreview/FormPreview"
import { Skeleton } from "../../components/skeleton/Skeleton";
import { TwoStepStepper } from "../../components/Steper/TwoStepsSteper";
import { Layout } from "../../layout/Layout"
import { useEditNewsPageController } from "./useEditNewsPageController";

export const EditsNewsPage = () => {

    const { handleSubmitEdit, isLoadingInitialData, editNewsData, setEditNewsData, errorUpdatedNews, isLoadingUpdatedNews } = useEditNewsPageController()

    if (isLoadingInitialData || !editNewsData) {
        return (
            <Layout>
                <TwoStepStepper currentStep={0} />
                <Skeleton mainCard={false} sideCards={5} bottomCards={0} />
            </Layout>
        );
    }

    return (
        <Layout>
            <FormPreview
                getter={editNewsData}
                setter={setEditNewsData}
                handlerSubmit={handleSubmitEdit}
            />
            {isLoadingUpdatedNews && <p>Actualizando noticia...</p>}
            {errorUpdatedNews && <p className="text-red-500">{errorUpdatedNews}</p>}
        </Layout>
    )
}