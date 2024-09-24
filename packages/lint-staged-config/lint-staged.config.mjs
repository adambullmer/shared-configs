/**
 * @type {import('lint-staged').Config}
 */
export const config = {
  "*": ["dprint fmt --allow-no-files"],
};
