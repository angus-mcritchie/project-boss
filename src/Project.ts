import * as vscode from 'vscode';
import * as path from 'path';

export class Project extends vscode.TreeItem {

    constructor(
        public readonly fullPath: string,
        private readonly isCategory: boolean
    ) {
        super(fullPath, isCategory ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None);

        this.label = path.basename(fullPath);
        this.tooltip = fullPath;

        if (!isCategory) {
            this.command = {
                command: `project-boss.open`,
                title: `Open`,
                arguments: [this]
            };
        }
    }

    iconPath = this.isCategory ? new vscode.ThemeIcon('file-directory') : new vscode.ThemeIcon('code');
}
