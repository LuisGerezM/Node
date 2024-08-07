import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			"no-unused-vars": [
				"warn",
				{ vars: "all", args: "after-used", ignoreRestSiblings: false },
			],
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ vars: "all", args: "after-used", ignoreRestSiblings: false },
			],
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
];
