import type { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
   children: ReactNode; // content inside modal, e.g., ProjectForm
   onClose: () => void; // callback to close the modal
}

export default function Modal({ children, onClose }: ModalProps) {
   return (
      // Full-page overlay
      <div className="modal-overlay" onClick={onClose}>
         {/* Actual modal content */}
         <div className="modal" onClick={(e) => e.stopPropagation()}>
            {children}
         </div>
      </div>
   );
}

/*modal-overlay → full-page dark transparent layer behind the form
Covers the entire screen (position: fixed; inset: 0)
Makes the background look dimmed
Centers the modal both vertically and horizontally (display: flex; align-items/justify-content: center)

modal → the white “popup” that actually contains the form*/
