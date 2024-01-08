import React from "react";
import { TableRow } from "./DataTable"; // Update the import path accordingly

interface ModalProps {
  data: TableRow;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-black opacity-50 fixed inset-0" onClick={onClose} ></div>
      <div className="bg-white w-96 p-4 rounded shadow-lg z-10">
        <div className="flex justify-end">
          <span className="cursor-pointer" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 hover:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-4">{data.word}</h2>
        {/* Add more information as needed */}
      </div>
    </div>
  );
};

export default Modal;
