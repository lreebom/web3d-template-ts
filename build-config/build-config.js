const path = require("path");
module.exports = {
    entry: "./src/Entry.tsx",
    output: path.resolve(__dirname, "../dist"),
    title: "应用名称",
    htmlTemplate: path.join(__dirname, "./html-template.html")
}