# executor

[issue #354 of rendezvous with cassidoo.](https://buttondown.email/cassidoo/archive/when-people-talk-listen-completely-ernest/)

**Write a program that implements the DelayedTaskExecutor interface defined below.**
Think about how it would work if you ran the exec function multiple times in a row, before the task is run!

Example:

```ts
interface Task {
    // a blocking run
    void run();

    // when the task should be executed
    long timeStamp();
}

interface DelayedTaskExecutor {
   // executes task.run() at the given timestamp
   void exec(Task task);
}

// usage
executor.exec(new Task(10:00am));
executor.exec(new Task(10:10am));
executor.exec(new Task(10:05am));
```

---

[Solution Playground](https://tsplay.dev/mpG2xN)
