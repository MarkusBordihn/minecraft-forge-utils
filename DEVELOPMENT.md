# Development Guide

## third_party Folder

The third_party folder includes all external dependencies like the forge code
templates for the different kind of versions.

It's recommend to add new dependencies as Git Modules in a separate folder for
each branch like:

```bash
git submodule add -b <Branch> <Git URL> <Folder Name>
```
