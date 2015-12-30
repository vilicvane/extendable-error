export abstract class ExtendableError extends Error {
    name: string = (this.constructor as any).name;
    stack: string;
    
    constructor(
        public message = ''
    ) {
        super(message);
        
        if (!(this instanceof ExtendableError)) {
            throw new ReferenceError('Expecting to be called as construcotr');
        }
        
        this.stack = (new Error() as any)
            .stack
            .replace(/^.+(\s+at.+)*?\s+at new .+/, this.name);
    }
}

export default ExtendableError;
