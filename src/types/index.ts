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
