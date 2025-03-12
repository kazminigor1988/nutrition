import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface AmountSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  amount: number;
  maxAmount: number;
  unit: string;
  onAmountChange: (amount: number) => void;
}

export default function AmountSelectionDialog({
  open,
  onClose,
  onConfirm,
  itemName,
  amount,
  maxAmount,
  unit,
  onAmountChange,
}: AmountSelectionDialogProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white mb-4"
                >
                  Выберите количество для {itemName}
                </Dialog.Title>

                <div className="mt-4">
                  <div className="relative px-2">
                    <input
                      type="range"
                      min={0}
                      max={maxAmount}
                      value={amount}
                      onChange={(e) => onAmountChange(Number(e.target.value))}
                      step={unit === 'шт' ? 1 : 5}
                      className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer touch-none
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 
                        [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-none
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 
                        [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 
                        [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none
                        [&::-moz-range-thumb]:shadow-lg"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(amount / maxAmount) * 100}%, #374151 ${(amount / maxAmount) * 100}%, #374151 100%)`
                      }}
                    />
                  </div>
                  <div className="text-center text-white mt-4 text-lg">
                    {amount} / {maxAmount} {unit}
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded px-4 py-3 text-base font-medium text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-w-[80px] sm:min-w-[100px]"
                    onClick={onClose}
                  >
                    Отмена
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded bg-blue-600 px-4 py-3 text-base font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-w-[80px] sm:min-w-[100px]"
                    onClick={onConfirm}
                  >
                    Подтвердить
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 