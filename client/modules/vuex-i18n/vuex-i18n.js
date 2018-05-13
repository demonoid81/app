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
        this.render = renderFn(this.identifiers)

        this.set = function setLocale (locale) {
            return this.setLocale(locale)
        }

        this.locale = function getLocale () {
            return this.getLocale()
        }

        this.locales = function getLocales () {
            return this.getLocales()
        }

        this.add = function addLocale (locale, translations) {
            return this.addLocale(locale, translations)
        }

        this.replace = function replaceLocale (locale, translations) {
            return this.replaceLocale(locale, translations)
        }

        this.remove = function removeLocale (locale) {
            return this.removeLocale(locale)
        }

        this.fallback = function setFallbackLocale (locale) {
            return this.setFallbackLocale(locale)
        }

        this.localeExists = function checkLocaleExists (locale) {
            return this.checkLocaleExists(locale)
        }

        this.keyExists = function checkKeyExists (key, scope) {
            return this.checkKeyExists(key, scope)
        }

        this.translate = function translate () {
            return this.$t()
        }

        this.translateIn = function translateInLanguage (locale) {
            return this.translateInLanguage(locale)
        }

        // register the translation function on the vue instance directly
        Vue.prototype.$t = this.translate

        // register the specific language translation function on the vue instance directly
        Vue.prototype.$tlang = this.translateInLanguage

        // register a filter function for translations
        Vue.filter('translate', this.translate)
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

    // get all available locales
    getLocales () {
        return Object.keys(this.store.state[this.moduleName].translations)
    }

    // add predefined translations to the store (keeping existing information)
    addLocale (locale, translations) {
        return this.store.dispatch({
            type: `${this.moduleName}/addLocale`,
            locale: locale,
            translations: translations
        })
    }

    // replace all locale information in the store
    replaceLocale (locale, translations) {
        return this.store.dispatch({
            type: `${this.moduleName}/replaceLocale`,
            locale: locale,
            translations: translations
        })
    }

    // remove the givne locale from the store
    removeLocale (locale) {
        if (this.store.state[this.moduleName].translations.hasOwnProperty(locale)) {
            this.store.dispatch({
                type: `${this.moduleName}/removeLocale`,
                locale: locale
            })
        }
    }

    // set fallback locale
    setFallbackLocale (locale) {
        this.store.dispatch({
            type: `${this.moduleName}/setFallbackLocale`,
            locale: locale
        })
    }

    // check if the given locale is already loaded
    checkLocaleExists (locale) {
        return this.store.state[this.moduleName].translations.hasOwnProperty(locale)
    }

    // check if the given key exists in the current locale
    checkKeyExists (key, scope = 'fallback') {
        // get the current language from the store
        const locale = this.store.state[this.moduleName].locale
        const fallback = this.store.state[moduleName].fallback
        const translations = this.store.state[this.moduleName].translations

        // check the current translation
        if (translations.hasOwnProperty(locale) && translations[locale].hasOwnProperty(key)) {
            return true
        }

        if (scope === 'strict') {
            return false
        }

        // check any localized translations
        const localeRegional = locale.split('-')

        if (localeRegional.length > 1 &&
            translations.hasOwnProperty(localeRegional[0]) &&
            translations[localeRegional[0]].hasOwnProperty(key)) {
            return true
        }

        if (scope === 'locale') {
            return false
        }

        // check if a fallback locale exists
        if (translations.hasOwnProperty(fallback) && translations[fallback].hasOwnProperty(key)) {
            return true
        }

        // key does not exist in the store
        return false
    }

    // get localized string from store. note that we pass the arguments passed
    // to the function directly to the translateInLanguage function
    $t () {
        // get the current language from the store
        const locale = this.store.state[this.moduleName].locale

        return this.translateInLanguage(locale, ...arguments)
    }

    // get localized string from store in a given language if available.
    // there are two possible signatures for the function.
    // we will check the arguments to make up the options passed.
    // 1: locale, key, options, pluralization
    // 2: locale, key, defaultValue, options, pluralization
    translateInLanguage (locale) {
        // read the function arguments
        const args = arguments

        // initialize options
        let key = ''
        let defaultValue = ''
        let options = {}
        let pluralization = null

        const count = args.length

        // check if a default value was specified and fill options accordingly
        if (count >= 3 && typeof args[2] === 'string') {
            key = args[1]
            defaultValue = args[2]

            if (count > 3) {
                options = args[3]
            }

            if (count > 4) {
                pluralization = args[4]
            }
        } else {
            key = args[1]

            // default value was not specified and is therefore the same as the key
            defaultValue = key

            if (count > 2) {
                options = args[2]
            }

            if (count > 3) {
                pluralization = args[3]
            }
        }

        // return the default value if the locale is not set (could happen on initialization)
        if (!locale) {
            console.warn('i18n: i18n locale is not set when trying to access translations:', key)
            return defaultValue
        }

        // get the translations from the store
        const translations = this.store.state[this.moduleName].translations

        // get the last resort fallback from the store
        const fallback = this.store.state[this.moduleName].fallback

        // split locale by - to support partial fallback for regional locales
        // like de-CH, en-UK
        const localeRegional = locale.split('-')

        // flag for translation to exist or not
        let translationExists = true

        // check if the language exists in the store. return the key if not
        if (translations.hasOwnProperty(locale) === false) {
            translationExists = false

            // check if the key exists in the store. return the key if not
        } else if (translations[locale].hasOwnProperty(key) === false) {
            translationExists = false
        }

        // return the value from the store
        if (translationExists === true) {
            return render(locale, translations[locale][key], options, pluralization)
        }

        // check if a regional locale translation would be available for the key
        // i.e. de for de-CH
        if (localeRegional.length > 1 &&
            translations.hasOwnProperty(localeRegional[0]) === true &&
            translations[localeRegional[0]].hasOwnProperty(key) === true) {
            return render(localeRegional[0], translations[localeRegional[0]][key], options, pluralization)
        }

        // invoke a method if a translation is not found
        const asyncTranslation = this.onTranslationNotFound(locale, key, defaultValue)

        // resolve async translations by updating the store
        if (asyncTranslation) {
            Promise.resolve(asyncTranslation).then((value) => {
                const additionalTranslations = {}
                additionalTranslations[key] = value
                this.addLocale(locale, additionalTranslations)
            })
        }

        // check if a vaild fallback exists in the store.
        // return the default value if not
        if (translations.hasOwnProperty(fallback) === false) {
            return render(locale, defaultValue, options, pluralization)
        }

        // check if the key exists in the fallback locale in the store.
        // return the default value if not
        if (translations[fallback].hasOwnProperty(key) === false) {
            return render(fallback, defaultValue, options, pluralization)
        }

        return render(locale, translations[fallback][key], options, pluralization)
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
