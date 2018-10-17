# Autogit Plugin - Replace

A plugin for performing string replacements.

## Install

```sh
npm install --save autogit-plugin-replace
```

## Usage

#### Options

This plugin uses the following options object:

```js
{
  paths: [], // Array of relative paths to the files that will be replaced
  replacements: [] // Array or arguments to pass to `String.prototype.replace`
}
```

#### Configuration

Add this plugin to a command:

```js
const autogitPluginReplace = require ( 'autogit-plugin-replace' );

module.exports = {
  commands: {
    'my-command': [
      autogitPluginReplace ({
        paths: ['readme.md'],
        replacements: [
          [/pulgin/g, 'plugin'],
          [/foo/g, 'bar']
        ]
      })
    ]
  }
}
```

## License

MIT © Fabio Spampinato
