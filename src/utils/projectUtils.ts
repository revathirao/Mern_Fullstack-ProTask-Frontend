/**
 * Delete a project
 * @param projectId - ID of the project to delete
 * @param removeProject - Function from useProjects hook
 *  * @param editProjectHook - Function from useProjects hook

  */
export async function deleteProject(
   projectId: string,
   removeProject: (id: string) => Promise<void>,
) {
   if (!projectId) throw new Error("Project ID is required");
   await removeProject(projectId);
}

/**
 * Handle project update
 * @param projectId - Project to update
 * @param updatedData - Updated fields */
export async function updateProject(
   projectId: string,
   updatedData: any,
   editProject: (id: string, data: any) => Promise<any>,
) {
   if (!projectId) throw new Error("Project ID is required");
   return await editProject(projectId, updatedData);
}
