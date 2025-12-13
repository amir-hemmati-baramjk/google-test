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

    // Create portal container only once
    if (!containerRef.current) {
      const el = document.createElement("div");
      el.setAttribute("data-modal-portal", "true");
      containerRef.current = el;
      document.body.appendChild(el);
    }

    return () => {
      // Don't remove the portal container on unmount
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let closeTimeout: NodeJS.Timeout;

    if (isOpen) {
      // Open modal
      document.body.style.overflow = "hidden";
      // Small delay to trigger CSS animation
      requestAnimationFrame(() => setShow(true));
    } else if (show) {
      // Close modal with animation
      setShow(false);
      closeTimeout = setTimeout(() => {
        document.body.style.overflow = "";
      }, 350); // Match this with your CSS animation duration
    } else {
      // Ensure body overflow is reset when not showing
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

  // Don't render anything if not mounted or no container
  if (!mounted || !containerRef.current) return null;

  // Don't render the portal if modal is completely closed
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
