module.exports = {
  apps: [
    {
      name: "API",
      script: "src/index.js",

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: "one two",
      instances: "max",
      autorestart: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
    },
  },
};
