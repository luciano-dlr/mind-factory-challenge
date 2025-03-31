import { Check } from "lucide-react";

interface TwoStepStepperProps {
    currentStep: number;
}

export const TwoStepStepper = ({ currentStep }: TwoStepStepperProps) => {
    return (
        <div className="flex justify-center py-10">
            <ol className="flex w-full items-center justify-center mb-4 sm:mb-5">

                <li className="flex w-3/4 items-center justify-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 
                        ${currentStep >= 0
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-500'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                        {currentStep == 0 ? (
                            <span className="font-medium text-white">1</span>

                        ) : (
                            <Check color="#ffff" />
                        )}
                    </div>
                    <div className={`w-full h-1 mx-2 transition-colors duration-300 ease-in-out 
                        ${currentStep >= 1
                            ? 'bg-blue-600 dark:bg-blue-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}>
                    </div>
                </li>


                <li className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 
                        ${currentStep >= 1
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-500'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                        <span className="font-medium text-white">2</span>
                    </div>
                </li>
            </ol>
        </div>
    );
};