
# Phonebook App - Vue 3 + TypeScript + Vite + TailwindCSS

The task is to: Successfully sign up with our API and use it to create a “Phonebook”
CRUD application.

SoftRig provides a REST API, running on Microsoft Azure. The purpose of this assign-
ment is just to make a client consuming the functionality of the web service; hence there is no need to write code for storing data and so on.

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Step 1: Sign up
Head over to our developer pages to sign up and find useful information
https://developer.softrig.com/

## Step 2: Connect – Authentication
Resource: https://developer.softrig.com/wiki/authentication/getting-started

## Step 3: Create an application, My Contacts
Create an user interface towards the entity “Contacts” in our REST API
Learn more here: https://developer.softrig.com/wiki/how-to/contacts

### Expectations
- List of contacts with filter
- View and edit contact
- Create new contact
- Delete contact

## Complete Swagger
If needed or for curiosity you can find our complete Swagger here:
https://developer.softrig.com/api-docs/

## Screenshots
![Landing Page](https://phonebook.devsarfo.io/screenshots/1.png)

![Listing Page](https://phonebook.devsarfo.io/screenshots/2.png)

![Add/Edit Page](https://phonebook.devsarfo.io/screenshots/3.png)



## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
