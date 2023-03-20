# Convert Between Color Formats

[issue #292 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/8279/)

## Description

**When you’re representing colors in a program, you typically use HEX, RGB, or HSL. Write a program that converts between the different formats.**

Example:

```ts
$ convertColor('rgb', 'hex', '(255,0,0)')
$ '#FF0000'

$ convertColor('hsl', 'rgb', '(65,80,80)')
$ '(238,245,163)'

$ convertColor('hsl', 'hex', '(65,80,80)')
$ '#EEF5A3'
```
