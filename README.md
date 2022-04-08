# Asurgent UI components v2

This library contains the basic set of asurgent's components. It exposes React API compatible components. Latest is deployed to [github pages](https://asurgent.github.io/ui-components) automatically when you publish a new version (more info on this in the bottom of this readme).

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


## Translations
We support two languages in the portal - swedish and english - using 'i18next'. The translation file is placed next to the component it's supposed to be used in, and named the same as the component but with a '.translation.js' file ending:

![Screenshot 2022-04-08 at 11 37 12](https://user-images.githubusercontent.com/8748007/162409404-fe893fca-b17a-41d9-9792-1c9a181b2941.png)

```
MyComponent.translation.js
import addTranslation from '../../../translations/addTranslation';

export default addTranslation({
  id: 'MyComponent',
  sv: {
    someTranslation: 'Någon översättning',
  },
  en: {
    someTranslation: 'Some translation',
  },
});
```

and in the component is then used like 
```
MyComponent.js
import translation from './MyComponent.translation';
...
const { t } = translation; // the translate-function

<Text> { t('someTranslation', 'ui') } </Text>

```

the difference on how to use it in the Portal vs. UI-components is that in the portal it does not need the key 'ui' when translating:
```
<Text> { t('someTranslation') } </Text>
```


## Relase a package update
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
