import * as vscode from 'vscode';
import * as path from 'path';

export class Category extends vscode.TreeItem {

    constructor(
        public readonly root: string
    ) {
        super(root);

        this.label = path.basename(root);
        this.tooltip = root;
        this.description = path.dirname(root);
        this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
    }

    iconPath = {
        light: './images/light/category.svg',
        dark: './images/light/category.svg'
    };
}
