import { ClassDeclaration } from 'ts-morph'

export function normalizeComponentClass (clazz: ClassDeclaration) {
    if (!clazz.getName()) {
        // clazz.rename('SanSSRComponent')    // this throws
        throw new Error('anonymous component class is not supported')
    }

    for (const prop of clazz.getProperties()) {
        const name = prop.getName()

        if (name === 'filters' || name === 'computed') {
            if (!prop.isStatic()) prop.setIsStatic(true)
        }
    }
}
