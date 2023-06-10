import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { Project } from './Project';
import ProjectsProvider from './ProjectsProvider';

export default class ProjectsTreeDataProvider implements vscode.TreeDataProvider<Project> {

    getTreeItem(element: Project): vscode.TreeItem {
        return element;
    }

    getChildren(project?: Project): Thenable<Project[]> {

        const root = project ? project.fullPath : null;

        return Promise.resolve(
            (new ProjectsProvider(root)).getProjects()
        );
    }
}
