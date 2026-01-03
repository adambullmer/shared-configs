# @adambullmer/oxfmt-config

> Portable configuration for oxfmt

## Getting Started

To configure your application to use the shared oxfmt configuration:

```sh
# Add oxfmt and the config to dev dependencies in the root of your repo
yarn add --dev oxfmt @adambullmer/oxfmt-config
```

The postinstall script will automatically create a `.oxfmtrc.jsonc` file in your project root with the shared configuration.

## How it Works

When you install this package, the postinstall script will:

1. **If no `.oxfmtrc.jsonc` exists**: Creates one with the shared configuration
2. **If `.oxfmtrc.jsonc` already exists**: Merges your existing config with the shared config (your settings take precedence)

This approach ensures that:

- New projects get the full shared configuration automatically
- Existing projects can maintain their custom settings while benefiting from shared defaults
- You don't need to manually export or extend configs since oxfmt doesn't support portable shared configs natively

## Customization

After installation, you can customize your `.oxfmtrc.jsonc` file. Your custom settings will be preserved during updates (as long as the merge happens correctly during reinstallation).
