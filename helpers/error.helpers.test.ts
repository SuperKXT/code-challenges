import { stringifyError } from './error.helpers.js';

test('test stringifyError', () => {
	expect(stringifyError(new Error('test error'))).toStrictEqual('test error');
	expect(stringifyError('test error')).toStrictEqual('test error');
	expect(stringifyError(2)).toStrictEqual('2');
	expect(stringifyError({ foo: 1, bar: 2 })).toStrictEqual(`{"foo":1,"bar":2}`);
});
