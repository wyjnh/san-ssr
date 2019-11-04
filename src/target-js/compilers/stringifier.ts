import { compileExprSource } from './expr-compiler'

export const stringifier = {
    obj: function (source) {
        let prefixComma
        let result = '{'

        for (const key in source) {
            if (!source.hasOwnProperty(key) || typeof source[key] === 'undefined') {
                continue
            }

            if (prefixComma) {
                result += ','
            }
            prefixComma = 1

            result += compileExprSource.stringLiteralize(key) + ':' + stringifier.any(source[key])
        }

        return result + '}'
    },

    arr: function (source) {
        let prefixComma
        let result = '['

        for (const value of source) {
            if (prefixComma) {
                result += ','
            }
            prefixComma = 1

            result += stringifier.any(value)
        }

        return result + ']'
    },

    str: function (source) {
        return compileExprSource.stringLiteralize(source)
    },

    date: function (source) {
        return 'new Date(' + source.getTime() + ')'
    },

    any: function (source) {
        switch (typeof source) {
        case 'string':
            return stringifier.str(source)

        case 'number':
            return '' + source

        case 'boolean':
            return source ? 'true' : 'false'

        case 'object':
            if (!source) {
                return null
            }

            if (source instanceof Array) {
                return stringifier.arr(source)
            }

            if (source instanceof Date) {
                return stringifier.date(source)
            }

            return stringifier.obj(source)
        }

        throw new Error('Cannot Stringify:' + source)
    }
}