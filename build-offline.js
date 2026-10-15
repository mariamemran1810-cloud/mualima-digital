const fs = require("fs");
const https = require("https");
const dir = "C:/Users/DELL/OneDrive/المستندات/المشروع الافتراضي/digital-teacher/";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const FONTS_URL = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@300;500;700;800&display=swap";

function fetchRaw(url, headers) {
  return new Promise((res, rej) => {
    https.get(url, { headers }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        return fetchRaw(r.headers.location, headers).then(res).catch(rej);
      }
      const chunks = [];
      r.on("data", c => chunks.push(c));
      r.on("end", () => res(Buffer.concat(chunks)));
    }).on("error", rej);
  });
}

async function buildEmbeddedFonts() {
  try {
    const css = (await fetchRaw(FONTS_URL, { "User-Agent": UA })).toString("utf8");
    const urls = [...css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)].map(m => m[1]);
    const uniq = [...new Set(urls)];
    console.log("خطوط مكتشفة:", uniq.length);
    let out = css;
    for (const u of uniq) {
      const buf = await fetchRaw(u, { "User-Agent": UA });
      const b64 = buf.toString("base64");
      out = out.split(u).join("data:font/woff2;base64," + b64);
    }
    console.log("تم تضمين الخطوط بنجاح | حجم CSS:", Math.round(out.length/1024), "KB");
    return out;
  } catch (e) {
    console.log("تعذّر تضمين الخطوط (سيُحتفظ بروابط أصلية):", e.message);
    return null;
  }
}

(async () => {
  let html = fs.readFileSync(dir + "index.html", "utf8");
  const css = fs.readFileSync(dir + "styles.css", "utf8");
  const js = fs.readFileSync(dir + "app.js", "utf8");
  const safeJs = js.replace(/<\/script/gi, "<\\/script");
  const safeCss = css.replace(/<\/style/gi, "<\\/style");

  // 1) Try to embed fonts (offline-perfect); fallback keeps external link
  const fontCss = await buildEmbeddedFonts();
  if (fontCss) {
    // remove preconnect + google stylesheet links
    html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*/g, "");
    html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com"[^>]*>\s*/g, "");
    html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2[^>]*rel="stylesheet">\s*/g, "");
    // inject embedded fonts right after <head>
    html = html.replace(/<head>/i, "<head>\n<style>\n" + fontCss + "\n</style>");
  }

  // 2) inline main CSS
  html = html.replace(/<link rel="stylesheet" href="styles.css">/,
    "<style>\n" + safeCss + "\n</style>");

  // 3) inline main JS
  html = html.replace(/<script src="app\.js"><\/script>/,
    "<script>\n" + safeJs + "\n</script>");

  fs.writeFileSync(dir + "offline.html", html, "utf8");
  const remaining = (html.match(/https:\/\/fonts\.(googleapis|gstatic)/g) || []).length;
  console.log("offline.html | الحجم:", Math.round(html.length/1024), "KB | مراجع جوجل خطوط متبقية:", remaining);
})();
