module.exports = plop => {
  plop.setGenerator("Data source", {
    description: "Feed data source",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What should it be called (slug)?"
      },
      {
        type: "input",
        name: "title",
        message: "What is the title?"
      }
    ],
    actions: [
      {
        type: "add",
        path: "../../src/data-sources/{{kebabCase name}}/data.json",
        templateFile: `./data-source/data.json.hbs`,
        abortOnFail: false
      },
      {
        type: "add",
        path: "../../src/data-sources/{{kebabCase name}}/template.js",
        templateFile: `./data-source/template.js.hbs`,
        abortOnFail: false
      },
      {
        type: "add",
        path: "../../src/data-sources/{{kebabCase name}}/template.ejs",
        templateFile: `./data-source/template.ejs.hbs`,
        abortOnFail: false
      },
      {
        type: "add",
        path: "../../src/data-sources/{{kebabCase name}}/scraper.js",
        templateFile: `./data-source/scraper.js.hbs`,
        abortOnFail: false
      }
    ]
  });
};
