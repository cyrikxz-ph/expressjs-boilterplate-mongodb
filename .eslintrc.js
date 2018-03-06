module.exports = {
  "env": {
    "es6": true
  },
  "globals": {
    "require": true
  },
  "parser": "babel-eslint",
  // "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
      "arrowFunctions": true,
      "blockBindings": true,
      "defaultParams": true,
      "destructuring": true,
      "forOf": true,
      "generators": true,
      "objectLiteralComputedProperties": true,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "restParams": true,
      "spread": true,
      "templateStrings": true,
      "modules": true,
      "classes": true
    },
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": 1,
    // "no-console": 1, // no use of console.log
    "no-var": 2, // not to use var for variable declaration
    "indent": [2, 2], // indent with 2 spaces
    "linebreak-style": [2, "unix"], // unix linebreak style
    "quotes": [2, "single"], // always use single quotes
    "semi": [2, "never"], // never use semicolons
    "max-len": [0, 80], // max line length is 80 characters (termporarily turning off the rule, passing 0 as first param)
    "space-before-function-paren": 2, // space before function parenthesis
    "no-trailing-spaces": 2, // no trailing spaces
    "prefer-const": 2, // prefer use of const or let over var
    "no-const-assign": 2, // to prevent reassigning a variable declared with const

    // "object-curly-newline": ["error", {
    //   "ObjectExpression": "always",
    //   "ObjectPattern": { "multiline": true }
    // }], // line break after object curly braces

    "object-property-newline": 2, // line break after each object property
    "prefer-template": 2, // for using es6 string interpolation
    "spaced-comment": 2, // space before a single line comment
    "lines-around-comment": 2, // line break around a multilines comment block
    "keyword-spacing": 2, // space after keywords like control flow statement
    "eqeqeq": 2, // enforce use of triple equal
    "arrow-spacing": 2, // spacing between arrow in arrow functions
    "space-infix-ops": 2, // space around infix operators
  }
};