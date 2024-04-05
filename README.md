# Project Boss
Quickly switch between projects. No setup required.

## How it works
By default, it scans your `~/projects` folder for files commonly included in development projects, such as `.git`, `package.json`, and supports nesting for better organization, take the below structure, for example.

`~/projects`
* `personal`
  * `proxy-server`
  * `website`
* `acme-mechanical`
  * `inventory`
  * `sales`
* `acme-financial`
  * `tax-returns`
  * `payroll`


> Tip: You can configure how it scans for projects in the settings.

## Extension Settings
``` json
"properties": {
    "project-boss.maxDepth": {
        "type": "integer",
        "default": 2,
        "description": "Max folder depth to scan for projects. A \"project\" is a folder that contains a .git folder or a .vscode folder."
    },
    "project-boss.projectsDirectory": {
        "type": "string",
        "default": "~/projects",
        "description": "Root directory to scan for projects."
    },
    "project-boss.blackListRegex": {
        "type": "string",
        "default": "^(vendor|node_modules|dist|src|assets|images)$",
        "description": "Regex to exclude projects from the list. This is applied to the full path of the project."
    },
    "project-boss.projectIdentifierRegex": {
        "type": "string",
        "default": "\\.(git|package\\.json|vscode|project\\-boss)",
        "description": "Regex to identify projects. This is applied to the full path of the project."
    }
}
```

## Release Notes
### 0.0.1
The initial release of Project Boss.

### 0.0.4
Fixed bug causing the open in new window context button displaying on other menus.

### 0.0.5
Fixed bug where settings were locked onto using the defaults.
Added project root directory exists error message.

**Enjoy!**
