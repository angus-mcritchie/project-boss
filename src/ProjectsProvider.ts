import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { Project } from './Project';

export default class ProjectsProvider {

    private root: string;
    private projectIdentifierRegex: RegExp;
    private blackListRegex: RegExp;
    private maxDepth: number;

    constructor(root: string | null = null) {

        if (!root) {
            root = vscode.workspace.getConfiguration('project-boss').get('projectsDirectory', '~/projects');
        }

        if (root.startsWith('~')) {
            root = path.join(os.homedir(), root.slice(1));
        }

        if (!fs.existsSync(root)) {

            const openSettings = 'Open Settings';
            const message = 'Project Boss Error: Projects directory does not exist "' + root + '".';

            vscode.window.showErrorMessage(message, openSettings).then((value) => {
                if (value === openSettings) {
                    vscode.commands.executeCommand('workbench.action.openSettings', 'projectsDirectory');
                }
            });
        }

        this.projectIdentifierRegex = new RegExp(vscode.workspace.getConfiguration('project-boss').get('projectIdentifierRegex', '\.(git|package\.json|vscode|project\-boss)'), 'i');
        this.blackListRegex = new RegExp(vscode.workspace.getConfiguration('project-boss').get('blackListRegex', '^(vendor|node_modules|dist|src|assets|images)$'), 'i');
        this.maxDepth = vscode.workspace.getConfiguration('project-boss').get('maxDepth', 2);
        this.root = root;
    }

    getProjects(): Project[] {
        return fs.readdirSync(this.root)
            .filter((directory: string) => {
                return this.containsProjectIdentifier(path.join(this.root, directory), this.maxDepth);
            })
            .map((directory: string) => {
                return new Project(path.join(this.root, directory), this.isCategory(path.join(this.root, directory)));
            });
    }

    isCategory(root: string): boolean {
        return !this.isProject(root) && this.containsProjectIdentifier(root, this.maxDepth);
    }

    isProject(root: string): boolean {
        return this.containsProjectIdentifier(root, 1);
    }

    containsProjectIdentifier(root: string, maxDepth = 1): boolean {
        if (maxDepth < 1 || !fs.existsSync(root) || !fs.lstatSync(root).isDirectory() || root.match(this.blackListRegex)) {
            return false;
        }

        const directories = fs.readdirSync(root);

        if (directories.some(directory => directory.match(this.projectIdentifierRegex))) {
            return true;
        }

        return directories.some((directory: string) => {
            return this.containsProjectIdentifier(path.join(root, directory), maxDepth - 1);
        });
    }
}
