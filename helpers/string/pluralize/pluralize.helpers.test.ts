/** cSpell: disable */

import { pluralize } from './pluralize.helpers';

describe('testing pluralize helper', () => {

	it('should return correctly pluralized string', () => {

		expect(pluralize`something ${'first'}`).toBe('something first');

		expect(pluralize`I have ${1} kitt[en|ies]`).toBe('I have 1 kitten');
		expect(pluralize`I have ${3} kitt[en|ies]`).toBe('I have 3 kitties');

		expect(pluralize`There [is|are] ${1} m[an|en]`).toBe('There is 1 man');
		expect(pluralize`There [is|are] ${5} m[an|en]`).toBe('There are 5 men');

		expect(pluralize`There [is|are] ${1} fox[|es] and ${4} octop[us|i]`).toBe('There is 1 fox and 4 octopi');
		expect(pluralize`There [is|are] ${4} fox[|es] and ${1} octop[us|i]`).toBe('There are 4 foxes and 1 octopus');

		expect(pluralize`Her ${[1, 'sole|twin|$1']} br[other|ethren] left`).toBe('Her sole brother left');
		expect(pluralize`Her ${[2, 'sole|twin|$1']} br[other|ethren] left`).toBe('Her twin brethren left');
		expect(pluralize`Her ${[3, 'sole|twin|$1']} br[other|ethren] left`).toBe('Her 3 brethren left');

		expect(pluralize`${[1]} gen[us|era]`).toBe('genus');
		expect(pluralize`${[2]} gen[us|era]`).toBe('genera');

		expect(pluralize`Delete the ${[1, '|$1']} cact[us|i]?`).toBe('Delete the cactus?');
		expect(pluralize`Delete the ${[2, '|$1']} cact[us|i]?`).toBe('Delete the 2 cacti?');

		expect(pluralize`He scored a ${[1]} [single|double|triple|quadruple|multi] hundred`).toBe('He scored a single hundred');
		expect(pluralize`He scored a ${[2]} [single|double|triple|quadruple|multi] hundred`).toBe('He scored a double hundred');
		expect(pluralize`He scored a ${[3]} [single|double|triple|quadruple|multi] hundred`).toBe('He scored a triple hundred');
		expect(pluralize`He scored a ${[4]} [single|double|triple|quadruple|multi] hundred`).toBe('He scored a quadruple hundred');
		expect(pluralize`He scored a ${[5]} [single|double|triple|quadruple|multi] hundred`).toBe('He scored a multi hundred');
		expect(pluralize`He scored a ${[-1]} [single|double|triple|quadruple|multi] hundred`).toBe('He scored a multi hundred');

	});

});
