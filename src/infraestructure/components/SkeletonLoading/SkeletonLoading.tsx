import React from "react";

interface SkeletonProps {
    mainCard?: boolean;
    sideCards?: boolean | number;
    bottomCards?: boolean | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    mainCard = true,
    sideCards = true,
    bottomCards = true
}) => {

    const sideCardsCount = typeof sideCards === "boolean" ? (sideCards ? 3 : 0) : sideCards;
    const bottomCardsCount = typeof bottomCards === "boolean" ? (bottomCards ? 3 : 0) : bottomCards;

    return (
        <div className="container mx-auto px-4 my-8 animate-pulse">

            <div className="flex flex-col lg:flex-row gap-6">

                {mainCard && (
                    <div className="lg:w-2/3">
                        <div className="relative overflow-hidden rounded-lg bg-gray-200 h-[400px] w-full"></div>
                        <div className="mt-4 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    </div>
                )}


                {sideCardsCount > 0 && (
                    <div className={`lg:w-1/3 space-y-4 ${!mainCard ? "lg:w-full" : ""}`}>
                        {Array.from({ length: sideCardsCount }).map((_, index) => (
                            <div key={`side-${index}`} className="flex items-center gap-4 bg-gray-100 rounded-lg p-2">
                                <div className="w-24 h-24 bg-gray-200 rounded"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            {bottomCardsCount > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {Array.from({ length: bottomCardsCount }).map((_, index) => (
                        <div key={`bottom-${index}`} className="bg-white rounded-lg shadow-sm">
                            <div className="h-48 bg-gray-200 w-full"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};