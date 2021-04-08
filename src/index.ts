import path from 'path';
import fs from 'fs';

export interface IPandaOptions {
  rootPath?: string;
  configFile?: string;
}

export interface IPandaConfigs {
  /**
   * theme 当前主题
   * 默认: default
   */
  theme?: string;
  /**
   * 包含哪些模块[优先级比exclude高]
   * 默认: undefined
   */
  include?: string[] | undefined;
  /**
   * 去除哪些模块[优先级比include低]
   * 默认: undefined
   */
  exclude?: string[] | undefined;
  /**
   * 自定义变量
   * 默认: {}
   */
  vars?: { [key: string]: string };
}

export const getPandaConfig = (opts: IPandaOptions): IPandaConfigs => {
  const options = {
    ...opts,
    ...{
      rootPath: process.cwd(),
      configFile: '.pandarc.js'
    }
  };
  const { rootPath, configFile } = options;

  let config: IPandaConfigs = {
    theme: 'default',
    exclude: undefined,
    include: undefined,
    vars: {}
  };

  const configPath = path.resolve(rootPath, configFile);

  if (fs.existsSync(configPath)) {
    config = require(configPath);
  }

  return config;
};

export const defineConfig = (config: IPandaConfigs): IPandaConfigs => {
  return config;
};
