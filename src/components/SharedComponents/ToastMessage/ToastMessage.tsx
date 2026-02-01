import "./ToastMessage.css";

interface ToastMessageProps {
   message: string;
   type?: "success" | "error"; // optional for future use
}

export default function ToastMessage({
   message,
   type = "success",
}: ToastMessageProps) {
   return (
      <p className={`toast-message ${type}`} role="alert">
         {message}
      </p>
   );
}
