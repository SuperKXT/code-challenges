import crypto from "node:crypto";

const salt = "gb6jUQ8bTrGRgu6K5HRu";

const hashPassword = (password: string) => {
	const iterations = 100000;
	const hash = crypto
		.pbkdf2Sync(password, salt, iterations, 64, "sha512")
		.toString("hex");
	return hash;
};

console.info(hashPassword("admin@user"));
