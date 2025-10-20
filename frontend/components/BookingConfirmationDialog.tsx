// frontend/components/BookingConfirmationDialog.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface BookingConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onDone: () => void;
    totalPrice: number;
    passengers: number;
    email: string;
}

export default function BookingConfirmationDialog({
    isOpen,
    onClose,
    onDone,
    totalPrice,
    passengers,
    email,
}: BookingConfirmationDialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative"
                        initial={{ y: 50, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -50, opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="flex flex-col items-center text-center">
                            <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Booking Confirmed! 🎉
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Your reservation has been successfully completed.
                            </p>
                            <div className="bg-green-50/50 border border-green-200 rounded-lg p-4 w-full space-y-2 mb-6">
                                <div className="flex justify-between font-medium text-gray-800">
                                    <span>Total Paid:</span>
                                    <span className="text-xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Passengers:</span>
                                    <span>{passengers}</span>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500">
                                A confirmation and e-ticket has been sent to **{email}**. Please check your inbox.
                            </p>

                            <button
                                onClick={onDone}
                                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition shadow-md"
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}