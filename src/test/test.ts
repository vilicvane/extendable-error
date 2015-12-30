import { ExtendableError } from '../';

describe('ExtendableError', () => {
    class TestError extends ExtendableError { }
    class TestFooError extends TestError { }
    
    context('instance', () => {
        let testError: TestError;
        let testFooError: TestFooError;
        
        it('should create instances', () => {
            testError = new TestError('test error');
            testFooError = new TestFooError('test foo error');
        });
        
        it('should be instances of it\'s class and super classes', () => {
            testError.should.be.an.instanceOf(TestError);
            testError.should.be.an.instanceOf(ExtendableError);
            testError.should.be.an.instanceOf(Error);
        });
        
        it('should have correct names', () => {
            testError.name.should.equal('TestError');
            testFooError.name.should.equal('TestFooError');
        });
        
        it('should have correct messages', () => {
            testError.message.should.equal('test error');
            testFooError.message.should.equal('test foo error');
            
            new TestError().message.should.equal('');
        });
        
        it('should have correct stacks', () => {
            testError.stack.should.match(/^TestError\s+at Context\./);
            testFooError.stack.should.match(/^TestFooError\s+at Context\./);
        });
        
        it('should throw errors if being called as functions', () => {
            (() => (TestError as Function)())
                .should.throw(ReferenceError);
                
            (() => (TestFooError as Function)())
                .should.throw(ReferenceError);
        });
    });
});
