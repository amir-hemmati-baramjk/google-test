"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./modal.types";

export default function Modal({
  isOpen,
  onClose,
  children,
  closeOnBackdrop = true,
  className = "",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    if (!containerRef.current) {
      const el = document.createElement("div");
      el.setAttribute("data-modal-portal", "true");
      containerRef.current = el;
      document.body.appendChild(el);
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let closeTimeout: NodeJS.Timeout;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => setShow(true));
    } else if (show) {
      setShow(false);
      closeTimeout = setTimeout(() => {
        document.body.style.overflow = "";
      }, 350);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      clearTimeout(closeTimeout);
    };
  }, [isOpen, mounted, show]);

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!mounted || !containerRef.current) return null;

  if (!isOpen && !show) return null;

  return createPortal(
    <div
      className={`modal-overlay ${show ? "open" : "close"}`}
      onClick={handleBackdropClick}
    >
      <div className="modal-backdrop" />
      <div
        className={`modal-content ${show ? "open" : "close"} ${className}`}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>,
    containerRef.current
  );
}
