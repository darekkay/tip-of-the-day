# Tip of the Day

[![Travis](https://img.shields.io/travis/darekkay/tip-of-the-day.svg?style=flat-square)](https://travis-ci.org/darekkay/tip-of-the-day) [![license](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/darekkay/tip-of-the-day/blob/master/LICENSE)

Get your daily knowledge dose.

For each category, a single tip is delivered every day. Subscribe via an HTML bookmark, RSS feed or JSON endpoint.

Live at [tips.darekkay.com](https://tips.darekkay.com).

## Contribute

Only include data if no copyright is validated.

### Setup

Notice: You may use `npm` instead of `yarn`.

1. Install all dependencies:

```bash
yarn install
```

2. Build:

```bash
yarn build
```

To generate all feeds, run `yarn build:feeds` daily in a cron job.

The `package.json` file contains other useful scripts, which you can execute using `yarn <command>` or `npm run <command>`:

| Command  | Description                                           |
| -------- | ----------------------------------------------------- |
| build    | Builds the site for production to the `build` folder. |
| format   | Reformat all files with `prettier`.                   |
| lint:fix | Run ESLint, apply automatic fixes if possible.        |
| test     | Run tests.                                            |

The `master` branch is (manually) deployed to [tips.darekkay.com](https://tips.darekkay.com).

### Add more data sources

All data used to generate daily tips is stored within the repository.

1. Run `npm run generate` to generate a new data source boilerplate.
2. Include your data source in `src/data-sources/<source>/data.json`. Using a `scraper` is recommended to keep the data up-to-date.
3. Define how the data should be rendered in `src/data-sources/<source>/template.js`.

### Templating

The `template.js` file does not enforce the way to write data source templates. It is possible to use simple JavaScript template strings, but EJS template files are highly recommended for a better readability (`template.ejs`).

## License

This project and its contents are open source under the [MIT license](LICENSE). The license of the individual data sources is specified in the according `data.json` files.
