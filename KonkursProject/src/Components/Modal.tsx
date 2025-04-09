import React from "react";
import close from '../assets/close.svg'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl min-w-[300px] max-w-md">
                <button
                    onClick={onClose}
                    className="size-10 w-full flex justify-end"
                >
                    <img className="size-10" src={close} alt=""/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;