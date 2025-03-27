

interface CustomModalProps {
    visible: boolean;
    title?: string;
    message: string;
    onAccept?: () => void;
    onReject?: () => void;
    acceptText?: string;
    rejectText?: string;
}

const CustomModal = ({
    visible,
    title = "Confirmación",
    message,
    onAccept,
    onReject,
    acceptText = "Aceptar",
    rejectText = "Cancelar",
}: CustomModalProps) => {
    if (!visible) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-[#f6f3f480] bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-lg font-bold mb-4">{title}</h2>
                    <p className="mb-4">{message}</p>
                    <div className="flex justify-end space-x-2">
                        {onReject && (
                            <button className="px-4 py-2 bg-gray-300 rounded" onClick={onReject}>
                                {rejectText}
                            </button>
                        )}
                        {onAccept && (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onAccept}>
                                {acceptText}
                            </button>
                        )}
                    </div>
                </div>
            </div>,


        </>
    )


};

export default CustomModal;
