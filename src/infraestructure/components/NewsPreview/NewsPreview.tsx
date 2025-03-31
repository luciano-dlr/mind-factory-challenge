import { CommonDataFormValues } from "../CommonDataForm/types";

interface NewsPreviewProps {
    basicData: CommonDataFormValues;
    description?: string;
}

export const NewsPreview = ({ basicData, description }: NewsPreviewProps) => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-6">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                    {basicData.category}
                </span>
            </div>

            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                    {basicData.title}
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-600 font-medium">
                    {basicData.subtitle}
                </h2>
            </div>

            <div className="flex items-center mb-8">
                <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-medium">
                        {basicData.author.charAt(0).toUpperCase()}
                    </span>
                </div>
                <span className="text-gray-700 font-medium">{basicData.author}</span>
            </div>


            <div className="mb-10">
                <img
                    src={basicData.image || "/placeholder.svg"}
                    alt={basicData.title}
                    className="w-full h-auto max-h-[600px] object-cover rounded-xl shadow-lg"
                />

            </div>

            {description && (
                <div className="prose max-w-none text-gray-700">
                    <h3 className="text-2xl font-semibold mb-4">Descripción detallada</h3>
                    <div>

                        <p className="overflow-auto break-words whitespace-pre-wrap">
                            {description}
                        </p>
                    </div>
                </div>
            )}

        </div>
    )
}
