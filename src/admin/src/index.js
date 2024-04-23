import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app) {

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });

    app.customFields.register({
      name: "nuxticon",
      pluginId: "nuxticon",
      type: "string",
      intlLabel: {
        id: "nuxticon.map.label",
        defaultMessage: "NuxtIcon",
      },
      intlDescription: {
        id: "nuxticon.map.description",
        defaultMessage: "",
      },
      icon: PluginIcon,
      components: {
        Input: async () => import("./components/NuxtIcon"),
      },
      options: {
        // declare options here
      },
    });
  },

  bootstrap(app) { },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
