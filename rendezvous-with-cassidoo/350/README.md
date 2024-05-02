# translateRightShift

[issue #350 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/sometimes-it-takes-a-long-time-to-sound-like/)

**Imagine the users on your app are all typing slightly incorrectly, in that they shifted their hands one key to the right. Write a function that translates what they mean to say.**

The examples below assume an ANSI keyboard layout, you can choose how you want to do that!

Example:

```ts
> translateRightShift(';p; epeor')  // cSpell: disable-line
"lol wowie" // cSpell: disable-line

> translateRightShift('ejp s, o')
"who am i"
```

---

[Solution Playground](https://tsplay.dev/m3q2jw)
