module.exports = {
  env: { browser: true, es2023: true },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "react-hooks", "import"],
  settings: { react: { version: "detect" } },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: { "react/prop-types": "off" }
}
