// AUTH TYPES

export interface User {
   _id: string;
   email: string;
   username?: string;
}

export interface AuthContextType {
   user: User | null;
   token: string | null;
   login: (email: string, password: string) => Promise<void>;
   register: (data: RegisterCredentials) => Promise<void>;
   logout: () => void;
}

export interface RegisterCredentials {
   email: string;
   password: string;
   username?: string;
}

export interface ProjectFormProps {
   onClose: () => void;
   //  onProjectCreated: () => void;
   // MUST accept the new project
   onProjectCreated: (newProject: any) => void; // allow passing new project
}

// Define the shape of a single Project object
export interface Project {
   _id: string;
   title: string;
   description: string;
   status: string;
}

// Define the types for the component's props
export interface ProjectCardProps {
   project: Project; // The project data to display
   onClick: (id: string) => void; // Function to handle card selection
   onEdit: (project: Project) => void; // Function to handle project updates
   onDelete: (id: string) => void; // Function to handle project removal
}
