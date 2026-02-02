import { Project } from "../types"; // Optional, if you have a Project interface
import { useNavigate } from "react-router-dom";
import { removeProject, editProject } from "../services/projectApi";

/**
 * Delete a project
 * @param projectId - ID of the project to delete
 * @param token - Auth token
 * @param removeProjectHook - Function from useProjects hook
 * @param navigate - react-router navigate function
 * @param setSuccess - Function to show success toast
 * @param setError - Function to show error message
 */
