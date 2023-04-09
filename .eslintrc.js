module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["airbnb", "airbnb/hooks", "prettier"],
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
    "react/style-prop-object": "off",
    "react/prop-types": "off",
    "no-param-reassign": "off",
    "no-use-before-define": "off",
    "react/jsx-props-no-spreading": "off",
    "array-callback-return": "off",
    "react/self-closing-comp": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js"] }],
    "react-hooks/exhaustive-deps": "off",
  },
};
