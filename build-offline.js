const fs = require("fs");
const dir = "C:/Users/DELL/OneDrive/المستندات/المشروع الافتراضي/digital-teacher/";
let html = fs.readFileSync(dir + "index.html", "utf8");
const css = fs.readFileSync(dir + "styles.css", "utf8");
const js = fs.readFileSync(dir + "app.js", "utf8");

// safety: remove any accidental closing script/style tags inside inlined content
const safeJs = js.replace(/<\/script/gi, "<\\/script");
const safeCss = css.replace(/<\/style/gi, "<\\/style");

// inline CSS
html = html.replace(/<link rel="stylesheet" href="styles.css">/,
  "<style>\n" + safeCss + "\n</style>");

// inline JS
html = html.replace(/<script src="app\.js"><\/script>/,
  "<script>\n" + safeJs + "\n</script>");

fs.writeFileSync(dir + "offline.html", html, "utf8");
console.log("تم إنشاء offline.html | الحجم:", Math.round(html.length/1024), "KB");
console.log("يتضمن styles.css:", html.includes(".curriculum-grid"), "| يتضمن app.js:", html.includes("const LESSONS"));
