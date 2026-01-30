/**
 * ErrorMessage
 * Displays a user-friendly error message
 */
export default function ErrorMessage({ message }: { message: string }) {
   return (
      <p role="alert" className="error">
         {message}
      </p>
   );
}
