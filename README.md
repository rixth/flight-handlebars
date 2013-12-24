# flight-handlebars

A [Flight](https://github.com/flightjs/flight) component for rendering Handlebars
templates with [handlebars.js](https://github.com/wycats/handlebars.js/).

## Installation

```bash
bower install --save flight-handlebars
```

## Example

### String templates

Instantiate the Handlebars component.

```javascript
var handlebarsComponent = require('flight-handlebars/lib/handlebars_helper');
handlebarsComponent.attachTo(document);
```

Use the `with_handlebars` mixin:

```javascript
define(function (require) {
  var defineComponent = require('flight/lib/component');
  var withHandlebars = require('flight-handlebars/lib/with_handlebars');

  return defineComponent(myComponent, withHandlebars);

  function myComponent() {
    this.after('initialize', function () {
      var helloWorld = this.renderTemplate({
        template: 'Hello, {{name}}!',
        renderParams: {
          name: 'World'
        }
      });
    });
  }
});
```

### Pre-compiled templates

You can pass a hash of compiled templates as an option to the component.

```javascript
define(function (require) {
  var precompiledTemplates = require('templates/compiled');
  var handlebarsComponent = require('flight-handlebars/lib/handlebars_helper');

  handlebarsComponent.attachTo(document, {
    precompiledTemplates: precompiledTemplates
  });
});
```

```javascript
define(function (require) {
  var defineComponent = require('flight/component');
  var withHandlebars = require('flight-handlebars/lib/with_handlebars');

  return defineComponent(myComponent, withHandlebars);

  function myComponent() {
    this.after('initialize', function () {
      var helloWorld = this.renderTemplate({
        templateName: 'hello_world',
        renderParams: {
          name: 'World'
        }
      });
    });
  }
});
```

## Development

Development of this component requires [Bower](http://bower.io), and preferably
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). This project
is heavily based off of [flight-mustache](https://github.com/necolas/flight-mustache)
by [Nicolas Gallagher](https://github.com/necolas).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
