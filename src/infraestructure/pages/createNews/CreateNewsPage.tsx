import { FormPreview } from "../../components/FormPreview/FormPreview"
import { Skeleton } from "../../components/Skeleton/Skeleton"
import { Layout } from "../../layout/Layout"
import { useCreateNewsPageController } from "./useCreateNewsPageController"
import { TwoStepStepper } from "../../components/Steper/TwoStepsSteper"

export const CreateNewsPage = () => {

    const { newData, setNewData, handleSubmitCreate, isLoadingCreatedNews, errorCreatedNews } = useCreateNewsPageController()

    if (isLoadingCreatedNews) {
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
                getter={newData}
                setter={setNewData}
                handlerSubmit={handleSubmitCreate}
            />
            {isLoadingCreatedNews && <p>Creando noticia...</p>}
            {errorCreatedNews && <p className="text-red-500">{errorCreatedNews}</p>}
        </Layout>
    )
}