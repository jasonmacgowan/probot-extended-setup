# probot-extended-setup

<p align="center">
  <a href="https://github.com/jasonmacgowan/probot-extended-setup/actions?query=workflow%3ACI"><img alt="GitHub Actions" src="https://github.com/jasonmacgowan/probot-extended-setup/workflows/CI/badge.svg"></a>
  <a href="https://github.com/semantic-release/semantic-release"><img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg"></a>
  <a href="https://npmjs.com/package/probot-extended-setup"><img src="https://badgen.net/npm/v/probot-extended-setup" alt="npm"></a>
  <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="commitizen friendly>
<p>

> A GitHub App built with [Probot](https://github.com/probot/probot) that provides a web editor for configuring Probot apps

## Getting started

### Install

```sh
# Install dependencies
npm install probot-extended-setup
```

### Create params.yml

Probot Extended Setup reads a file in your app's root directory named `params.yml`. It uses this file to determine what and how it should let you configure environment variables via a web ui.

See [params.yml](params.yml) for a simple example.

#### Options

`params.yml` is written as an top-level array, with each element supporting these options:

- `name` - required - a friendly name for the parameter
- `env` - required - the environment variable key that will be used when saving and loading this paramter to `.env`
- `inputType` - optional, defaults to `text` - the HTML input type to render this paramter's value with. Supported values below:
  - `text` default input control
  - `password` masks input
  - `checkbox` supports `true`/`false` values
  - `textarea` multi-line text input control

## Contributing

Commits follow the [Angular commit convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) and this repository is [commitizen friendly](https://github.com/commitizen/cz-cli). In a general sense this means you'll want run `npm run git-commit` or `git cz` instead of `git commit`.

If you have suggestions for how probot-extended-setup could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Releasing

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to handle releasing and publishing new versions. Merging pull requests into the `main` branch automatically runs this process via [GitHub Actions](.github/workflows/release.yml).
