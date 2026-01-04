import { config } from "@adambullmer/semantic-release-config";

/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  extends: "semantic-release-monorepo",
  ...config,
};
