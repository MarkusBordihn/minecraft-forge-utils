# Minecraft Forge Utils

The Minecraft Forge Utils simplify some of the manual tasks and allows a more
enjoying development experience.

## Requirements

- [Java Development Kit][java_jdk] (JDK)
- [NodeJS][node_js] (v7.0 or greater)
- [Visual Studio Code][visual_studio_code] or any other compatible JAVA IDE

## Installation (optional)

For better performance and offline capability reasons it is recommended to use a
local copy of the tools.

This can be done inside a empty project folder and the following command:
`npx minecraft-forge-utils init`

## How to use the utils

Use the **npx** command to run the utils with one of the commands in your
project folder.

## Commands

### init

The init command prepares the workspace and installs a local copy of the needed
tools for performance and offline capability.

Use the following command inside a empty folder:
`npx minecraft-forge-utils init`

After this was successful you should use the `npx minecraft-forge-utils new`
command to setup your new project.

### new

The new command creates a new project with the required folder and files. It
should be only used for new projects and never for existing projects.

To start a new project use `npx minecraft-forge-utils new` which will ask for
additional details like:

![Example Screenshot](assets/doc/new_project_example.jpg)

### run / run client

The run / run client command tries to start a Minecraft client with your mod.

Example: `npx minecraft-forge-utils run`

## Disclaimer

NOT OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG.

[java_jdk]: https://www.oracle.com/java/technologies/downloads/
[node_js]: https://nodejs.org/
[visual_studio_code]: https://code.visualstudio.com/
