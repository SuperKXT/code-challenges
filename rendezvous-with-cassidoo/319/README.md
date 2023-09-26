# typeMatchup

[issue #319 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/i-love-mistakes-because-its-the-only-way-you/)

**Using the [PokeAPI](https://pokeapi.co/) (or your own local setup) write a function that takes in a Pokémon type, and returns what that type is weak against, and strong against.**
Here is the listing of [types](https://pokeapi.co/api/v2/type/) and [here's an example JSON](https://pokeapi.co/api/v2/type/2) for the fighting type!

Example:

```ts
> typeMatchup('fighting')
> "Weak against flying, psychic, and fairy. Strong against normal, rock, steel, ice, and dark."

> typeMatchup('cassidy')
> "This is not a valid Pokémon type, she's weak against everything."
// You can put whatever you want in this response, heh.

```
