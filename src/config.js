/**
 * Add your config changes here.
 * @module config
 * @example
 * export const settings = {
 *   ...defaultSettings,
 *   port: 4300,
 *   listBlockTypes: {
 *     ...defaultSettings.listBlockTypes,
 *     'my-list-item',
 *   }
 * }
 */
export const settings = {
  ...defaultSettings,
  devProxyToApiPath: 'http://localhost:8080/Plone',
  apiPath: 'http://10.1.0.11:8080/Plone'
};
import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  blocks as defaultBlocks,
  addonReducers as defaultAddonReducers,
  addonRoutes as defaultAddonRoutes,
} from '@plone/volto/config';

export const settings = {
  ...defaultSettings,
};

export const views = {
  ...defaultViews,
};

export const widgets = {
  ...defaultWidgets,
};

export const blocks = {
  ...defaultBlocks,
};

export const addonRoutes = [...defaultAddonRoutes];
export const addonReducers = { ...defaultAddonReducers };


export default function applyConfig(config) {
  return config;
}
