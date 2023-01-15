const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  app: {
    keys: env.array("APP_KEYS"),
  },
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
});
