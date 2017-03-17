import { ExtendableError } from '../';

describe('ExtendableError', () => {
  class TestError extends ExtendableError { }
  class TestDerivedError extends TestError { }

  let {
    ES6TestError,
    ES6TestDerivedError,
  } = eval(`
    'use strict';

    let ExtendableError = require('../').default;

    class ES6TestError extends ExtendableError { }
    class ES6TestDerivedError extends ES6TestError { }

    ({
      ES6TestError,
      ES6TestDerivedError
    });
  `);

  context('instance', () => {
    let testError: TestError;
    let testNoMessageError: TestError;
    let testDerivedError: TestDerivedError;
    let es6TestError: TestError;
    let es6TestNoMessageError: TestError;
    let es6TestDerivedError: TestDerivedError;

    it('should create instances', () => {
      testError = new TestError('test error');
      testNoMessageError = new TestError();
      testDerivedError = new TestDerivedError('test derived error');
    });

    it('should create instances (es6)', () => {
      es6TestError = new ES6TestError('es6 test error');
      es6TestNoMessageError = new ES6TestError();
      es6TestDerivedError = new ES6TestDerivedError('es6 test derived error');
    });

    it('should be instances of it\'s class and super classes', () => {
      testError.should.be.an.instanceOf(TestError);
      testError.should.be.an.instanceOf(ExtendableError);
      testError.should.be.an.instanceOf(Error);
    });

    it('should be instances of it\'s class and super classes (es6)', () => {
      es6TestError.should.be.an.instanceOf(ES6TestError);
      es6TestError.should.be.an.instanceOf(ExtendableError);
      es6TestError.should.be.an.instanceOf(Error);
    });

    it('should have correct names', () => {
      testError.name.should.equal('TestError');
      testDerivedError.name.should.equal('TestDerivedError');
    });

    it('should have correct names (es6)', () => {
      es6TestError.name.should.equal('ES6TestError');
      es6TestDerivedError.name.should.equal('ES6TestDerivedError');
    });

    it('should have correct messages', () => {
      testError.message.should.equal('test error');
      testDerivedError.message.should.equal('test derived error');
      testNoMessageError.message.should.equal('');
      new TestDerivedError().message.should.equal('');
    });

    it('should have correct messages (es6)', () => {
      es6TestError.message.should.equal('es6 test error');
      es6TestDerivedError.message.should.equal('es6 test derived error');
      es6TestNoMessageError.message.should.equal('');
      new ES6TestDerivedError().message.should.equal('');
    });

    it('should have correct stacks', () => {
      testError.stack.should.match(/^TestError: test error\s+at Context\./);
      testNoMessageError.stack.should.match(/^TestError\s+at Context\./);
      testDerivedError.stack.should.match(/^TestDerivedError: test derived error\s+at Context\./);
    });

    it('should have correct stacks (es6)', () => {
      es6TestError.stack.should.match(/^ES6TestError: es6 test error\s+at Context\./);
      es6TestNoMessageError.stack.should.match(/^ES6TestError\s+at Context\./);
      es6TestDerivedError.stack.should.match(/^ES6TestDerivedError: es6 test derived error\s+at Context\./);
    });
  });
});
