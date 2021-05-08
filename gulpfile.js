const { gulp, tasks } = require("@darekkay/gulp");

const buildIndex = require("./src/home-index/build");

const config = {
  paths: {
    destination: "build",

    content: "public/**/*.html",

    assets: [
      {
        source: "public/**/*.{jpg,jpeg,png,gif,avif,webp,svg,ico,json}",
        destination: "build",
      },
      {
        source: "node_modules/@darekkay/styles/dist/css/fonts/**/*",
        destination: "build/assets/fonts",
      },
    ],

    styles: {
      source: "scss/index.scss",
      destination: "build/assets",
    },
  },
};

const { series } = gulp;
const { clean, styles, content, assets, env } = tasks(config);

const buildDataSources = (callback) => buildIndex(callback);

const build = series(
  env("production"),
  clean,
  buildDataSources,
  content,
  styles,
  assets
);

module.exports = { build };
