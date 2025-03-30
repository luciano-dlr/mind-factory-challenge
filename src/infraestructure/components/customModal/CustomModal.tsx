import { useEffect } from "react";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'confirm' | 'info' | 'success' | 'error';
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const CustomModal = ({
    isOpen,
    onClose,
    title,
    message,
    type = 'info',
    onConfirm,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar'
}: AlertModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;


    const colorClasses = {
        confirm: 'bg-blue-600',
        info: 'bg-blue-600',
        success: 'bg-green-600',
        error: 'bg-red-600'
    };

    return (
        <div className="fixed inset-0 bg-[#f6f3f480] bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 className={`text-xl font-bold mb-4 ${colorClasses[type]} text-white p-3 rounded-t-lg -m-6 mb-4`}>
                    {title}
                </h3>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    {type === 'confirm' && (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        onClick={type === 'confirm' ? onConfirm : onClose}
                        className={`px-4 py-2 ${colorClasses[type]} text-white rounded hover:opacity-90`}
                    >
                        {type === 'confirm' ? confirmText : 'Aceptar'}
                    </button>
                </div>
            </div>
        </div>
    );
};