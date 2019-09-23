import { Emitter } from '../../src/emitters/emitter'

describe('Emitter', function () {
    let emitter
    beforeEach(function () {
        emitter = new Emitter()
    })

    it('should write chars', function () {
        emitter.write('foo')
        emitter.write('bar')

        expect(emitter.fullText()).toEqual('foobar')
    })

    it('should write new lines', function () {
        emitter.writeNewLine()

        expect(emitter.fullText()).toEqual('\n')
    })

    describe('write line', function () {
        it('should write line', function () {
            emitter.writeLine('foobar')

            expect(emitter.fullText()).toEqual('foobar\n')
        })
        it('should finish current line', function () {
            emitter.write('foo')
            emitter.writeLine('bar')

            expect(emitter.fullText()).toEqual('foo\nbar\n')
        })
        it('should not add NL if exists', function () {
            emitter.write('foo\n')
            emitter.writeLine('bar')

            expect(emitter.fullText()).toEqual('foo\nbar\n')
        })
    })

    describe('write lines', function () {
        it('should add indent to each line', function () {
            emitter.indent()
            emitter.writeLines('foo\nbar')

            expect(emitter.fullText()).toEqual('    foo\n    bar\n')
        })
    })

    describe('indent', function () {
        it('should default to 4', function () {
            emitter.write('{')
            emitter.indent()
            emitter.writeLine('foo')
            emitter.unindent()
            emitter.write('}')

            expect(emitter.fullText()).toEqual('{\n    foo\n}')
        })

        it('can be set to 2', function () {
            const emitter = new Emitter(2)
            emitter.write('{')
            emitter.indent()
            emitter.writeLine('foo')
            emitter.unindent()
            emitter.write('}')

            expect(emitter.fullText()).toEqual('{\n  foo\n}')
        })
    })
})