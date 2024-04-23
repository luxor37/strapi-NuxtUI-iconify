'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('heroicon')
      .service('myService')
      .getWelcomeMessage();
  },
});
