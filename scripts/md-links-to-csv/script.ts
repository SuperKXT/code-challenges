import { readFile, writeFile } from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const generateTable = async () => {
	const file = await readFile(path.join(__dirname, "./input.md"), "utf-8");
	const csv = ["title,status,tag,url"];
	let tag = "";
	for (const line of file.split("\n")) {
		const trimmed = line.trim();
		if (!trimmed) continue;
		if (trimmed.startsWith("- ")) {
			tag = trimmed.replace(/\s*-\s*(.+)\s*/u, (_, name: string) => name);
			continue;
		}
		const match = line.match(/\s*\[(.+)\]\((.+)\)\s*/u);
		if (!match) continue;
		csv.push(
			`"${(match[1] as string).replace(
				/\\"/gu,
				"`",
			)}","Not Started","${tag}","${match[2] as string}"`,
		);
	}
	writeFile(path.join(__dirname, "output.csv"), csv.join("\n"));
};

generateTable();
