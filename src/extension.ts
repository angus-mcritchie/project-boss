// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ProjectsTreeDataProvider from './ProjectsTreeDataProvider';
import { Project } from './Project';
import { resolveProject } from './ProjectSelector';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	vscode.window.showInformationMessage('Project Boss is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('project-boss.listProjects', async () => {
		vscode.window.createTreeView('projects', {
			treeDataProvider: new ProjectsTreeDataProvider(),
			showCollapseAll: true
		});
	}));

	vscode.commands.executeCommand('project-boss.listProjects');

	context.subscriptions.push(vscode.commands.registerCommand('project-boss.open', async (project: null | Project = null) => {
		project = await resolveProject(project);

		if (!project) {
			vscode.window.showWarningMessage('No project selected.');
			return;
		}

		project.openInNewWindow();
	}));

	context.subscriptions.push(vscode.commands.registerCommand('project-boss.openInNewWindow', async (project: null | Project = null) => {
		project = await resolveProject(project);

		if (!project) {
			vscode.window.showWarningMessage('No project selected.');
			return;
		}

		project.openInNewWindow();
	}));
}

// This method is called when your extension is deactivated
export function deactivate() { }
