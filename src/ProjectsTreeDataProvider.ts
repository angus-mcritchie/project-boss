import * as vscode from 'vscode';
import { Project } from './Project';
import ProjectsProvider from './ProjectsProvider';

export default class ProjectsTreeDataProvider implements vscode.TreeDataProvider<Project> {

    getTreeItem(element: Project): vscode.TreeItem {
        return element;
    }

    getChildren(project?: Project): vscode.Thenable<Project[]> {

        const root = project ? project.fullPath : null;

        return Promise.resolve(
            (new ProjectsProvider(root)).getProjects()
        );
    }
}
