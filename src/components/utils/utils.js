/* eslint-disable import/prefer-default-export */
const crypto = require("crypto");

export  const hashPassword = (password) => {
    const secret = `WEBNC${password}`
        .toUpperCase()
        .split("")
        .reverse()
        .join();
    return crypto
        .createHmac("SHA256", secret)
        .update(password)
        .digest("hex");
}