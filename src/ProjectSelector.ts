import * as vscode from 'vscode';
import { Project } from './Project';
import ProjectsProvider from './ProjectsProvider';

export async function selectProject(project: null | Project = null): Promise<Project | null> {

    let projects: Project[] = [];

    if (project && project.isCategory) {
        projects = (new ProjectsProvider(project.fullPath)).getProjects();
    } else {
        projects = (new ProjectsProvider()).getProjects();
    }

    const options = projects.map((project) => project.relativePath);
    const selection = await vscode.window.showQuickPick(options, {
        placeHolder: 'Select a project'
    });

    if (!selection) {
        return null;
    }

    const selectedProject = projects.find((project) => project.relativePath === selection) || null;

    if (selectedProject?.isCategory) {
        return selectProject(selectedProject);
    }

    return selectedProject;
}

export async function resolveProject(project: null | Project = null): Promise<Project | null> {
    if (!project) {
        const selectedProject = await selectProject();

        if (!selectedProject) {
            return null;
        }

        project = selectedProject;
    }

    return project;
}
