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
        
        let prototype = (<any>this).__proto__;
        let depth = 1;
        
        loop:
        while (prototype) {
            switch (prototype) {
                case ExtendableError.prototype:
                    break loop;
                case Object.prototype:
                    depth = 1;
                    break loop;
                default:
                    depth++;
                    break;
            }
            
            prototype = prototype.__proto__;
        }
        
        let stackLines = new Error().stack.match(/.+/g);
        let nameLine = this.name;
        
        if (message) {
            nameLine += `: ${message}`;
        }
        
        stackLines.splice(0, depth + 1, nameLine);
        
        this.stack = stackLines.join('\n');
    }
}

export default ExtendableError;
