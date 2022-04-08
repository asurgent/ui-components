# Asurgent UI components v2

This library contains the basic set of asurgent's components. It exposes React API compatible components. Latest is deployed to [github pages](https://asurgent.github.io/ui)

## Getting started

1. Download NodeJS (https://nodejs.org), which comes bundled with npm
2. Clone the repo in the same folder as you clone the portal (needed for copying UI-components changes to the portal without merging by running "npm run copy"): git clone https://github.com/asurgent/ui-components.git
3. Create a `personal access token` in GitHub (Find out more [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line))
    * Give it access to `repo`, `write:packages`, `read:packages`
4. Create a `.npmrc` file in your home directory with the following content
```
registry=https://registry.npmjs.org/
@asurgent:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=GITHUBTOKEN
//registry.npmjs.org/:_authToken=NPMTOKEN
```

5. Open VS Code and open up a terminal
6. Run: 'npm install'
7. Run: 'npm start'

## Tip when you start
Add 'babel-plugin-macros' to the dependecies and change 
```
import styled from 'styled-components'
```
to
```
import styled from 'styled-components/macro'
```
everywhere in the project so you get more readable classNames in the inspector like 
```
class="CustomerCardstyled__Wrapper-sc-uqwrgc-9 kRedFw"
```
instead of just
```
class="sc-uqwrgc-9 kRedFw"
```

## Storybook

This project uses storybook to help view and develop components. All stories are located in the 'src/stories'-folder so

```
src/ImagePreview.js 
```
for example has its story in 

```
src/stories/ImagePreviw.stories.js
```

In the stories you can add controls to see what changes the props make:

```
Button.stories.js
const Story = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    colorScheme: {
      control: { type: 'select' },
      options: ['asurgent', 'gold', 'ruby', 'green'],
    },
    leftIcon: {
      options: [null, mdiCalendar, mdiAlertDecagram],
      control: { type: 'radio' },
    },
    ....
```

![Screenshot 2022-04-08 at 12 21 19](https://user-images.githubusercontent.com/8748007/162417076-d67723f1-871e-448c-a578-1d919fa0a167.png)


## Relase a package update
This repo uses [github-actions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-workflows) that automatically publish a new package whenever there a new release is published at.

1. Branch out from main
2. Create a pull request
3. Merge it
4. Go back to the main-branch and pull the changes
5. Depending on the size of your changes run either:
- Publishing a small patch? Run - `npm run version:patch`
- Publishing a minor update? Run - `npm run version:minor`
- Publishing a major update? Run - `npm run version:major` 

[Read more](https://docs.npmjs.com/cli/version)

Whenever the tag is pushed, simply go under releases, edit the pushed tag. Give it a title and description, then publish it. 


## Installing @asugent packages
1. Create a `personal access token` (Find out more [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line))
    * Give it access to `repo`, `write:packages`, `read:packages`
2. Create a `.npmrc` file in your home directory with the following content
    ```
    registry=https://registry.npmjs.org/
    @asurgent:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=YOUR_PERONAL_ACCESS_TOKEN
    ```
