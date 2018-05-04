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
    "extends": 'plugin:vue/strongly-recommended',
    plugins: [
        'vue'
    ],
    // add your custom rules here
    'rules': {
        "indent": ["error", 4],
        "semi" : ["error", "never"],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
