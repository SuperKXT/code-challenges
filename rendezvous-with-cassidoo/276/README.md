# Create a random Catan board generator

[issue #276 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/to-attract-something-that-you-want-become-as/)

## Description

The [Settlers of Catan](https://en.wikipedia.org/wiki/Catan) board game has 18 number hexes
(two each of 3, 4, 5, 6, 8, 9, 10, 11, and one each of 2 and 12),
and one desert hex in a large hexagon formation.
Generate a valid randomized Catan board in which 6s and 8s cannot touch each other.

Valid boards:

// These use `A` `B` `C` for `10` `11` `12`, respectively, and `.` for the empty desert hex.

```plaintext
  B 9 A
 5 6 C 8
6 4 B 5 3
 2 8 9 3
  A . 4

  B B C
 3 A 3 A
2 4 6 . 6
 4 5 9 9
  8 5 8

  6 3 8
 2 4 5 A
5 9 . 6 9
 A B 3 C
  8 4 B
```
