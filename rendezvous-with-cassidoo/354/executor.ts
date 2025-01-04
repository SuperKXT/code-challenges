class Task {
	timeStamp: number;

	constructor(date: Date) {
		this.timeStamp = date.getTime();
	}

	run(): void {
		console.info("run!");
	}
}

class DelayedTaskExecutor {
	exec(task: Task): void {
		setTimeout(() => {
			task.run();
		}, task.timeStamp - Date.now());
	}
}

const executor = new DelayedTaskExecutor();

const d = new Date();
const s = d.getSeconds();
d.setSeconds(s + 5);
executor.exec(new Task(d));
d.setSeconds(s + 10);
executor.exec(new Task(d));
d.setSeconds(s + 15);
executor.exec(new Task(d));

let curr = 1;
const interval = setInterval(() => {
	console.info(curr++);
	if (curr === 16) clearInterval(interval);
}, 1000);
