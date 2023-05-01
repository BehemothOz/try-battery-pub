import { FC, MouseEvent } from 'react';
import { Portal } from 'shared/Portal';

interface ConfirmProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

interface OverlayProps {
    onClick?: (event: MouseEvent) => void;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Overlay: FC<OverlayProps> = ({ onClick }) => {
    const handleClick = (event: MouseEvent) => {
        console.log(111);
        onClick && onClick(event);
    };

    return <div className="fixed inset-0 bg-black/50" onClick={handleClick} />;
};

const Modal: FC<ModalProps> = props => {
    const { isOpen, children, onClose } = props;

    if (!isOpen) return null;

    return (
        <Portal>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <Overlay onClick={onClose} />
                {children}
            </div>
        </Portal>
    );
};

export const Confirm: FC<ConfirmProps> = props => {
    const { isOpen, title, message, onConfirm, onCancel } = props;

    return (
        <Modal isOpen={isOpen} onClose={onCancel}>
            <div role="dialog" className="relative min-w-[300px] m-3 rounded bg-white dark:bg-gray-700">
                <div className="p-4 text-lg text-right text-gray-900 dark:text-white border-b dark:border-gray-600">
                    {title}
                </div>
                <p className="px-6 py-6  text-center leading-relaxed text-gray-500 dark:text-gray-400">{message}</p>
                <div className="flex flex-col px-6 pb-6 space-y-3">
                    <button
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded text-sm items-center px-5 py-2.5 text-center"
                        onClick={onConfirm}
                    >
                        Yes, I'm sure
                    </button>
                    <button
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        onClick={onCancel}
                    >
                        No, cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};
