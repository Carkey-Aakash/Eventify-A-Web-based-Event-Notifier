// import { Fragment, type ReactNode } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/24/outline';

// type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   children: ReactNode;
//   size?: ModalSize;
// }

// export function Modal({
//   isOpen,
//   onClose,
//   title,
//   children,
//   size = 'md',
// }: ModalProps) {
//   const sizeClasses: Record<ModalSize, string> = {
//     sm: 'max-w-md',
//     md: 'max-w-lg',
//     lg: 'max-w-2xl',
//     xl: 'max-w-4xl',
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/25" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel
//                 className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
//               >
//                 {title && (
//                   <div className="flex items-center justify-between mb-4">
//                     <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
//                       {title}
//                     </Dialog.Title>
//                     <button
//                       type="button"
//                       className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                       onClick={onClose}
//                     >
//                       <XMarkIcon className="h-6 w-6" />
//                     </button>
//                   </div>
//                 )}
//                 {children}
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }
// frontend/src/components/ui/Modal.tsx
import { Fragment, type ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${sizeClasses[size]} transform overflow-hidden
                            rounded-2xl shadow-xl ring-1 ring-black/5 transition-all
                            bg-white text-gray-900
                            dark:bg-neutral-900 dark:text-gray-100`}
              >
                {title && (
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-neutral-800">
                    <Dialog.Title className="text-lg font-semibold">
                      {title}
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close"
                      className="rounded-md p-2 text-gray-400 hover:text-gray-600
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                                 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}

                <div className="px-6 py-5">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}