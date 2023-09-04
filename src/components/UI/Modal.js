import React from "react";
import { GrClose } from "react-icons/gr";
const Modal = ({ children, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed w-full min-h-screen top-0 left-0 bg-[rgba(0,0,0,0.5)]  ${
          isOpen ? "flex" : "hidden"
        } justify-center items-center z-30`}
      >
        <div className="w-[95%] sm:w-[620px] px-8 py-5 rounded-lg bg-white relative z-30">
          <button className="block ml-auto" onClick={onClose}>
            <GrClose size={24} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
