import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

export class Project extends vscode.TreeItem {

    public readonly relativePath: string;

    constructor(
        public readonly fullPath: string,
        public readonly isCategory: boolean,
    ) {
        super(fullPath, isCategory ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None);

        this.label = path.basename(fullPath);
        this.relativePath = this.getRelativePath();
        this.tooltip = this.relativePath;
        this.iconPath = this.isCategory ? new vscode.ThemeIcon('file-directory') : new vscode.ThemeIcon('code');

        const customIconPath = path.join(this.fullPath, '.vscode', 'extensions', 'project-boss', 'icon.svg');

        if (fs.existsSync(customIconPath)) {
            this.iconPath = vscode.Uri.file(customIconPath);
        }

        if (!isCategory) {
            this.command = {
                command: `project-boss.open`,
                title: `Open`,
                arguments: [this]
            };
        }
    }

    open(newWindow: boolean = false) {
        vscode.commands.executeCommand('vscode.openFolder', this.getFileUri(), { forceNewWindow: newWindow });
    }

    openInNewWindow() {
        this.open(true);
    }

    getFileUri() {

        if (!vscode.workspace.getConfiguration('project-boss').get('openProjectsInWsl', false)) {
            return vscode.Uri.file(this.fullPath);
        }

        const distro = vscode.workspace.getConfiguration('project-boss').get('openProjectsInWslUsingDistro', 'Ubuntu');
        const remotePath = vscode.workspace.getConfiguration('project-boss').get('wslRemotePath', '/home/username/projects');
        let uri = this.relativePath;

        uri = path.join(remotePath, uri);
        uri = uri.replace(RegExp(/\\/g), '/');

        return vscode.Uri.parse(`vscode-remote://wsl+${distro}${uri}`);
    }

    getRelativePath() {
        let root = vscode.workspace.getConfiguration('project-boss').get('projectsDirectory', '~/projects');
        let uri = this.fullPath;

        if (root.startsWith('~')) {
            root = path.join(os.homedir(), root.slice(1));
        }

        if (uri.startsWith(root)) {
            uri = uri.replace(root, '');
        }

        uri = uri.replace(RegExp(/\\/g), '/');

        if (uri.startsWith('/')) {
            uri = uri.slice(1);
        }

        return uri;
    }



}
