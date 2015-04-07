# generator-corejs [![Build Status](https://secure.travis-ci.org/bq/corejs-generator.svg?branch=master)](http://travis-ci.org/bq/corejs-generator)

A Yeoman generator for coreJS projects.

## Usage

1. Install `yo`, `grunt`, `bower`, `generator-corejs`:
```
npm install -g grunt bower yo generator-corejs
```

2. Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

3. Run `yo corejs`, optionally passing an app name:
```
yo corejs [app-name]
```

Run `grunt` for building and `grunt server` for preview. For more details to manage your corejs project with grunt see [this documentation.](http://corejs.docs.bqws.io/grunt/)

## Generators

Available generators:

* [corejs](#app)
* [corejs:module](#module)

### App
Sets up a new coreJS app, generating all the boilerplate you need to get started. The app generator also optionally installs kiUI and additional coreJS modules.

Example:
```bash
yo corejs
```

### Module
Generates a module boilerplate inside coreJS project. This new module contains its own controller and entry point, and build its scaffolding as how the user decides.

Example:
```bash
yo corejs:module mymodule
```

Produces `app/scripts/mymodule/`:
    .
    +-- controller.js
    +-- dispatcher.js
    +-- start.js
    +-- css
    |   +-- mymodule.scss
    |   +-- main.scss
    +-- views
    |   +-- defaultView.js
    +-- templates
    |   +-- default.html
    +-- res
    |   +--config.json
