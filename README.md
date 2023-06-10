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
    "maxDepth": {
        "type": "integer",
        "default": 2,
        "description": "Max folder depth to scan for projects. A \"project\" is a folder that contains a .git folder or a .vscode folder."
    },
    "projectsDirectory": {
        "type": "string",
        "default": "~/projects",
        "description": "Root directory to scan for projects."
    },
    "blackListRegex": {
        "type": "string",
        "default": "^(vendor|node_modules|dist|src|assets|images)$",
        "description": "Regex to exclude projects from the list. This is applied to the full path of the project."
    },
    "projectIdentifierRegex": {
        "type": "string",
        "default": "\\.(git|package\\.json|vscode|project\\-boss)",
        "description": "Regex to identify projects. This is applied to the full path of the project."
    }
}
```

## Release Notes
### 0.0.1
The initial release of Project Boss.

**Enjoy!**
