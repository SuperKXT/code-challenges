# isIsomorphic

[issue #322 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/no-matter-what-people-tell-you-words-and-ideas/)

**Given two strings s and t, determine if they are isomorphic.**
Two strings are isomorphic if there is a one-to-one mapping possible for every character of the first string to every character of the second string.

Example:

```ts

> isIsomorphic('abb', 'cdd')
> true // 'a' maps to 'c' and 'b' maps to 'd'

> isIsomorphic('cassidy', '1234567')
> false // 's' cannot have a mapping to both '3' and '4'

> isIsomorphic('cass', '1233') // cSpell: disable-line
> true
```
