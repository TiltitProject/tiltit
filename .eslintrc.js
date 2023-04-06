module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["warn", "always"],
    "import/no-extraneous-dependencies": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/self-closing-comp": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js"] }],
    "react-hooks/exhaustive-deps": "off",
    "no-param-reassign": 0,
  },
};
