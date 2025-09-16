import { PropsWithChildren } from 'react'

const Modal = ({ children, closeModal }: PropsWithChildren & { closeModal: () => void }) => {

    return (
        <div className='fixed bg-slate-600/75 backdrop-blur-[2px] inset-0 z-30 flex justify-center items-center '
            onClick={closeModal}>
            <div onClick={(e) => e.stopPropagation()} className='bg-white px-8 pt-6 pb-2  rounded-md shadow-lg shadow-gray-600 relative'>
                <button type='button' className='absolute top-0 right-2 text-3xl font-bold cursor-pointer px-0.5' onClick={closeModal}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal