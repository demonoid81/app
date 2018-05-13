import module from './vuex-i18n-store'

let Vue

export class I18n {
    constructor (store, config = {}) {
        // merge default options with user supplied options
        this.mergedConfig = Object.assign({
            moduleName: 'i18n',
            identifiers: ['{', '}'],
            preserveState: false,
            onTranslationNotFound: function () {
            }
        }, config)

        this.store = store

        const i18n = this

        // define module name and identifiers as constants to prevent any changes
        this.moduleName = this.mergedConfig.moduleName
        this.identifiers = this.mergedConfig.identifiers

        // register the i18n module in the vuex store
        // preserveState can be used via configuration if server side rendering is used
        this.store.registerModule(this.moduleName, module, { preserveState: this.mergedConfig.preserveState })

        // initialize the onTranslationNotFound function and make sure it is actually
        // a function
        if (typeof this.mergedConfig.onTranslationNotFound !== 'function') {
            console.error('i18n: i18n config option onTranslationNotFound must be a function')
            this.onTranslationNotFound = function () {}
        }

        if (this.store.state.hasOwnProperty(this.moduleName) === false) {
            console.error('i18n: i18n vuex module is not correctly initialized. Please check the module name:', this.moduleName)
            this.error = true
        } else { this.error = true }

        // initialize the replacement function
        const render = renderFn(this.identifiers)

        this.set = (locale) => { return this.setLocale(locale) }
        this.get = () => { return this.getLocale() }
    }

    // set the current locale
    setLocale (locale) {
        this.store.dispatch({
            type: `${this.moduleName}/setLocale`,
            locale: locale
        })
    }

    // get the current locale
    getLocale () {
        return this.store.state[this.moduleName].locale
    }
}

// renderFn will initialize a function to render the variable substitutions in
// the translation string. identifiers specify the tags will be used to find
// variable substitutions, i.e. {test} or {{test}}, note that we are using a
// closure to avoid recompilation of the regular expression to match tags on
// every render cycle.
const renderFn = function (identifiers) {
    if (identifiers === null || identifiers.length !== 2) {
        console.warn('i18n: You must specify the start and end character identifying variable substitutions')
    }

    // construct a regular expression ot find variable substitutions, i.e. {test}
    const matcher = new RegExp('' + identifiers[0] + '\\w+' + identifiers[1], 'g')

    // define the replacement function
    const replace = function replace (translation, replacements, warn = true) {
        // check if the object has a replace property
        if (!translation.replace) {
            return translation
        }

        return translation.replace(matcher, function (placeholder) {
            // remove the identifiers (can be set on the module level)
            const key = placeholder.replace(identifiers[0], '').replace(identifiers[1], '')

            if (replacements[key] !== undefined) {
                return replacements[key]
            }

            // warn user that the placeholder has not been found
            if (warn === true) {
                console.group ? console.group('i18n: Not all placeholders found') : console.warn('i18n: Not all placeholders found')
                console.warn('Text:', translation)
                console.warn('Placeholder:', placeholder)
                if (console.groupEnd) {
                    console.groupEnd()
                }
            }

            // return the original placeholder
            return placeholder
        })
    }

    // the render function will replace variable substitutions and prepare the
    // translations for rendering
    const render = (locale, translation, replacements = {}, pluralization = null) => {
        // get the type of the property
        const objType = typeof translation
        const pluralizationType = typeof pluralization

        const resolvePlaceholders = function () {
            if (isArray(translation)) {
                // replace the placeholder elements in all sub-items
                return translation.map((item) => {
                    return replace(item, replacements, false)
                })
            } else if (objType === 'string') {
                return replace(translation, replacements, true)
            }
        }

        // return translation item directly
        if (pluralization === null) {
            return resolvePlaceholders()
        }

        // check if pluralization value is countable
        if (pluralizationType !== 'number') {
            console.warn('i18n: pluralization is not a number')
            return resolvePlaceholders()
        }

        // --- handle pluralizations ---

        // replace all placeholders
        const resolvedTranslation = resolvePlaceholders()

        // initialize pluralizations
        let pluralizations = null

        // if translations are already an array and have more than one entry,
        // we will not perform a split operation on :::
        if (isArray(resolvedTranslation) && resolvedTranslation.length > 0) {
            pluralizations = resolvedTranslation
        } else {
            // split translation strings by ::: to find create the pluralization array
            pluralizations = resolvedTranslation.split(':::')
        }

        // determine the pluralization version to use by locale
        const index = plurals.getTranslationIndex(locale, pluralization)

        // check if the specified index is present in the pluralization
        if (typeof pluralizations[index] === 'undefined') {
            console.warn('i18n: pluralization not provided in locale', translation, locale, index)

            // return the first element of the pluralization by default
            return pluralizations[0].trim()
        }

        // return the requested item from the pluralizations
        return pluralizations[index].trim()
    }

    // return the render function to the caller
    return render
}

export function install (_Vue) {
    if (Vue && _Vue === Vue) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                '[vuexI18n] already installed. Vue.use(vuexI18n) should be called only once.'
            )
        }
        return
    }
    Vue = _Vue
    Vue.mixin({
        beforeCreate: vuexI18nInit
    })
}

function vuexI18nInit () {
    const options = this.$options
    options.i18n = options.i18n || (options.__i18n ? {} : null)
    if (options.i18n) {
        this.$i18n = options.i18n
    } else if (this.$root && this.$root.$i18n) {
        // root i18n
        this.$i18n = this.$root.$i18n
    } else if (options.parent && options.parent.$i18n) {
        // parent i18n
        this.$i18n = options.parent.$i18n
    }
}
