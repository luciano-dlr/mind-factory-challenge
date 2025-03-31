export interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'confirm' | 'success' | 'error';
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}