module.exports = {
    extends: ["twilio-ts", "twilio-react", "prettier"],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        type: "module"
    },
    rules: {
        "prettier/prettier": [
            "warn",
            {},
            {
                usePrettierrc: true
            }
        ],
        complexity: "off",
        "react/display-name": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "react/no-multi-comp": "off",
        "sonarjs/cognitive-complexity": "off",
        "sonarjs/no-small-switch": "off",
        "no-shadow": "off",
        "no-console": "warn",
        "no-duplicate-imports": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-unused-vars": "warn",
        "import/no-duplicates": ["error"],
        "spaced-comment": "warn",
        "prefer-named-capture-group": "off",
        "import/no-unused-modules": "warn",
        "jsx-a11y/anchor-is-valid": "warn"
    },
    root: true
};
