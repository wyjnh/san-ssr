export class Data {
    public get (path: string): any {
        return path
    }
}

export interface SanComponent {
    computed?: ComputedDeclarations
    filters?: FilterDeclarations
}

export class Component {
    public data: Data;
}

export class FilterDeclarations {
    [key: string]: (this: Component, ...args: any[]) => any
}

export class ComputedDeclarations {
    [key: string]: (this: Component) => any
}