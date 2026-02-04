//  Define what an item actually looks like
export interface Item {
   [key: string]: any; // Allows dynamic indexing for the filters
   status?: string;
   priority?: string;
}

/**
 * Filter and search
 * @param items - array of objects
 * @param filters - object like { status: "Done", priority: "High" }
 * @param searchField - string name of the field to search
 * @param searchQuery - text to search
 */
export default function filterAndSearch(
   items: Item[],
   filters: Partial<Item>,
   searchField: keyof Item,
   searchQuery: string,
): Item[] {
   return items.filter((item) => {
      // Apply filters
      for (let key in filters) {
         const filterValue = filters[key];
         if (filterValue && item[key] !== filterValue) {
            return false;
         }
      }

      // Apply search
      if (searchField && searchQuery) {
         const fieldValue = item[searchField];
         if (
            typeof fieldValue === "string" &&
            !fieldValue.toLowerCase().includes(searchQuery.toLowerCase())
         ) {
            return false;
         }
      }

      return true;
   });
}

/*Item[]: Tells TypeScript items is an array of objects, not a mystery as
 explained by the TypeScript Handbook.
Partial<Item>: Makes all properties in your filter optional,
so you don't have to provide every single one via Utility Types.
keyof Item: Restricts searchField to only valid keys that actually exist
 on your objects, preventing typos.
 Reference: TypeScript Handbook: Utility Types - Partial
 Reference: TypeScript Handbook: Keyof Type Operator*/
