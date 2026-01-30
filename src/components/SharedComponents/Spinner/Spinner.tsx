import "./Spinner.css";

/**
 * Spinner
 * Displays a loading indicator while data is being fetched
 */
export default function Spinner() {
   return (
      <div role="status" className="spinner-container" aria-label="Loading">
         <div className="spinner">Loading...</div>
      </div>
   );
}
