# caloriesCost

[issue #328 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/when-i-let-go-of-what-i-am-i-become-what-i-might/)

**Given two arrays `calories` and `prices`, where `calories[i]` and `prices[i]` represent
the calorie content and price of the ith food item, and a daily calorie goal,
find the minimum cost to achieve or exceed the daily calorie goal.
If it's impossible to meet the goal, return `-1`.**

Example:

```ts
let calories = [200, 400, 600, 800];
let prices = [50, 60, 80, 100];
let dailyGoal = 1200;

> caloriesCost(calories, prices, dailyGoal)
> 160 // the 2nd and 4th items add up to 1200 calories for the minimum cost
```
