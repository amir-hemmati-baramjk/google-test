"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Import Lucide Icon
import { ModalProps } from "./modal.types";

export default function Modal({
  isOpen,
  onClose,
  children,
  closeOnBackdrop = true,
  className = "",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const el = document.createElement("div");
    el.setAttribute("data-modal-portal", "true");
    document.body.appendChild(el);
    containerRef.current = el;

    return () => {
      if (document.body.contains(el)) {
        document.body.removeChild(el);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!mounted || !containerRef.current) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeOnBackdrop ? onClose : undefined}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 "
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl rounded-2xl  bg-white p-4 shadow-2xl ${className}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -left-2 -top-2 rounded-full p-1 !bg-white transition-colors text-error z-50 w-fit h-fit"
              aria-label="Close modal"
            >
              <X size={24} strokeWidth={3.5} />
            </button>

            {/* Content Slot */}
            <div className="">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    containerRef.current
  );
}
