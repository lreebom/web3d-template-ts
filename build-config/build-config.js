const path = require("path");
module.exports = {
    entry: "./src/Entry.ts",
    output: path.resolve(__dirname, "../dist"),
    title: "Web3D",
    htmlTemplate: path.join(__dirname, "./html-template.html")
}