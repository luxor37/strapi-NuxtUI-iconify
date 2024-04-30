'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "nuxticon",
    plugin: "strapi-nuxtui-icon",
    type: "string"
  });
};
