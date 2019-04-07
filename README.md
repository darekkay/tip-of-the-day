# Tip of the Day

Reduce the information overload by providing just a single unit of information per day. Get your daily knowledge dosis via RSS, HTML or JSON.

Live at [tips.darekkay.com](https://tips.darekkay.com).

## Contribute

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

1. Run `npm run generate` to generate a new data source boilerplate.
2. Include your data source in `src/data-sources/<source>/data.json`. Using a `scraper` is recommended to keep the data up-to-date.
3. Define how the data should be rendered in `src/data-sources/<source>/template.js`.

### Templating

The `template.js` file does not enforce the way to write data source templates. It is possible to use simple JavaScript template strings, but EJS template files are highly recommended for a better readability (`template.ejs`).

## License

This project and its contents are open source under the [MIT license](LICENSE).
