import { FC, useState } from 'react';
import { useRegard, useRegardActions } from 'contexts/Regard';
import { Confirm } from 'components/Confirm';
import { Regard } from 'types';

interface UpButtonProps {
    disabled?: boolean;
    onClick: () => void;
}

interface DumpButtonProps {
    hidden?: boolean;
    onClick: () => void;
}

interface ControlsProps {
    addNewCircle: (item: Regard) => void;
}

const UpButton: FC<UpButtonProps> = ({ onClick }) => {
    return (
        <button
            type="button"
            className="inline-block px-10 py-6 text-2xl bg-yellow-500 text-white leading-tight uppercase rounded hover:bg-yellow-500 active:bg-yellow-600"
            onClick={onClick}
        >
            How are you doing?
        </button>
    );
};

const DumpButton: FC<DumpButtonProps> = ({ hidden, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleVisibility = () => setIsOpen(prev => !prev);

    const onConfirm = () => {
        toggleVisibility();
        onClick();
    };

    const onCancel = () => {
        toggleVisibility();
    };

    return (
        <>
            <Confirm
                isOpen={isOpen}
                title="I don't believe it!"
                message="Are you sure you want to reset your progress?"
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
            <button
                type="button"
                className="inline-block px-6 py-2 bg-transparent text-red-600 font-medium text-xs leading-tight uppercase rounded hover:text-red-700 active:text-red-700 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                style={{
                    visibility: hidden ? 'hidden' : 'visible',
                }}
                onClick={toggleVisibility}
            >
                I'm terrible
            </button>
        </>
    );
};

export const Controls: FC<ControlsProps> = props => {
    const { record } = useRegard();
    const actions = useRegardActions();

    const isHiddenResetButton = record.current === 0;

    const handleUpClick = () => {
        actions.add(record.current + 1, {
            callAfter: item => props.addNewCircle(item),
        });
    };

    const handleDumpClick = () => {
        actions.reset({
            callAfter: item => props.addNewCircle(item),
        });
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            <UpButton onClick={handleUpClick} />
            <DumpButton onClick={handleDumpClick} hidden={isHiddenResetButton} />
        </div>
    );
};
