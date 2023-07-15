import React from 'react'
import {Dialog, Transition} from '@headlessui/react'

interface ModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  title: string
  description?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  description
}) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setIsOpen}>
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 backdrop-blur-md" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-gray-200 shadow-xl rounded-xl">
              <Dialog.Title
                as="h3"
                className="text-2xl font-bold leading-6 text-black">
                {title}
              </Dialog.Title>
              {description && (
                <div className="mt-2">
                  <p className="text-gray-500">{description}</p>
                </div>
              )}

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-primary hover:bg-primary/75 border border-transparent rounded-md focus:outline-none focus-visible:ring focus-visible:ring-offset-1 focus-visible:ring-primary"
                  onClick={() => setIsOpen(false)}>
                  Schließen
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
