'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "nuxticon",
    plugin: "nuxticon",
    type: "string"
  });
};
