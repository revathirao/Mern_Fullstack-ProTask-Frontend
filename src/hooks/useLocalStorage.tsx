import { useState, useEffect } from "react";

/**
 * useLocalStorage hook
 * A reusable hook to persist state in localStorage.
 * It automatically initializes the state from localStorage if available,
 * and saves any updates to localStorage whenever the state changes.
 * * @param key - The localStorage key to use
 * @param initialValue - The default value if nothing is in localStorage
 * @returns [value, setValue] - The stateful value and setter function
 */
export default function useLocalStorage<T>(key: string, initialValue: T) {
   // Initialize state with a "Lazy Initializer" function
   const [value, setValue] = useState<T>(() => {
      try {
         // Attempt to retrieve the item from localStorage by its key
         const stored = localStorage.getItem(key);

         // If it exists, parse the JSON string back into an object/value.
         // If it doesn't exist, use the provided initialValue.
         return stored ? JSON.parse(stored) : initialValue;
      } catch (error) {
         // If parsing fails (e.g., corrupted data), return the initialValue
         console.error("Error reading localStorage key “" + key + "”:", error);
         return initialValue;
      }
   });

   /**
    * PERSISTENCE SYNCHRONIZATION
    * This effect acts as a "watcher." Every time the 'value' state changes
    * within React, this block automatically pushes that updated value
    * into the browser's physical storage. This ensures that if the user
    * refreshes the page, the most recent state is preserved.
    */
   useEffect(() => {
      // Convert the 'value' (which could be an object/array) into a JSON string
      // Save that string into localStorage under the unique 'key' provided
      localStorage.setItem(key, JSON.stringify(value));

      // The dependency array: tells React to only re-run this function
      // if the identifier (key) or the actual data (value) changes.
   }, [key, value]);

   /**
    ** Return the current value and the setter function.
    * 'as const' is a TypeScript "const assertion"
    */
   return [value, setValue] as const;
}
