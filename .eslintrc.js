module.exports = {
    root: true,
    parserOptions: {
        "parser": "babel-eslint",
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    env: {
        browser: true,
        jest: true
    },
	// "extends": "standard",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "extends": "plugin:vue-libs/recommended",
    plugins: [
        'vue'
    ],
    // add your custom rules here
    // 'rules': {
    //     "indent": ["error", 4],
    //     "semi" : ["error", "never"],
    //     // allow paren-less arrow functions
    //     'arrow-parens': 0,
    //     // allow async-await
    //     'generator-star-spacing': 0,
    //     // allow debugger during development
    //     'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    // }
    rules: {
        "indent": [2, 4, { "SwitchCase": 1 }],
        "quotes": [2, "single", { "allowTemplateLiterals": true }],
        // "linebreak-style": [2, "unix"],
        "semi" : ["error", "never"],
    "eqeqeq": [2, "always"],
    "strict": [2, "global"],
"key-spacing": [2, { "afterColon": true }],
"no-console": 0,
"no-debugger": 0,
"no-empty": 0,
"no-unused-vars": 0,
"no-constant-condition": 0,
"no-undef": 0,
"no-trailing-spaces": 0
}
}
