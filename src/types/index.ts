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
   // MUST accept the new project
   onProjectCreated: (newProject: any) => void; // allow passing new project
   // used when editing a project
   onProjectUpdated?: (project: any) => void;
   // flag to distinguish create vs edit
   editProject?: any;
}

// Define the shape of a single Project object
export interface Project {
   _id: string;
   name: string;
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

// Tasks
export interface Task {
   _id: string;
   title: string;
   description?: string;
   status: "To Do" | "In Progress" | "Done";
   priority: "Low" | "Medium" | "High";
}

export interface TaskProps {
   projectId: string;
}

export interface TaskItemProps {
   task: Task;
   onEdit: (task: any) => void; // Callback when user clicks "Edit"
   onDelete: (id: string) => void; // Callback when user clicks "Delete"
}

export interface TaskFormProps {
   projectId: string; // ID of the project this task belongs to
   task?: any; // Optional task object for editing
   onTaskCreated?: (task: any) => void; // Callback after creating a new task
   onTaskUpdated?: (task: any) => void; // Callback after updating an existing task
   onClose: () => void; // Callback to close the form/modal
}

export interface TaskListProps {
   projectId: string;
   filter?: {
      searchTerm?: string;
      status?: "All" | "To Do" | "In Progress" | "Done";
      priority?: "All" | "Low" | "Medium" | "High";
   };
}
