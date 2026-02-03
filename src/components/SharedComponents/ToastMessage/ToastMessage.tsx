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
      <div className={`toast-message ${type || "sucess"}`} role="alert">
         {message}
      </div>
   );
}
