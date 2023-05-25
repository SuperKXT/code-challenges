import { flattenObject, getNestedKey } from './nested-object.helpers';

const myObj = {
	k1: 'something',
	k2: {
		dk1: {
			ddk1: 'somethingElse',
		},
	},
} as const;

const flatObject = { ...myObj, dk1: myObj.k2.dk1, ddk1: myObj.k2.dk1.ddk1 };

test('should test flattenObject', () => {
	const values = flattenObject(myObj);
	expect(values).toStrictEqual(flatObject);
	assertType<typeof flatObject>(values);
});

test('should test getNestedKey', () => {
	const values = getNestedKey(myObj, 'dk1');
	expect(values).toStrictEqual(flatObject.dk1);
	assertType<(typeof flatObject)['dk1']>(values);
});
