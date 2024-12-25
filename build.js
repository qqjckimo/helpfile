const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const htmlMinifier = require("html-minifier-terser");
const obfuscator = require("javascript-obfuscator");
const SemVer = require("semver");

// Original file and target file path
const inputFile = path.resolve(__dirname, "index.html");
const outputFile = path.resolve(__dirname, "docs/index.html");

// Main processing function
(async () => {
  try {
    // Read the original HTML file
    let html = fs.readFileSync(inputFile, "utf8");

    // process inline CSS
    html = await processInlineCSS(html);

    // process inline JS
    html = await processInlineJS(html);

    html = updateHtmlVersion(html);

    // Minify HTML file
    const minifiedHtml = await htmlMinifier.minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    });

    console.log(`${minifiedHtml}`);

    // Check if the target directory exists
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputFile, minifiedHtml, "utf8");

    // process version string
    updatePkgVersion();

    console.log("Build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error.message);
    // Exit with a non-zero status code
    process.exit(1);
  }
})();

// Process the inline CSS function
async function processInlineCSS(html) {
  const cssRegex = /<style>([\s\S]*?)<\/style>/gi;
  let match;

  while ((match = cssRegex.exec(html)) !== null) {
    const cssContent = match[1]; // Extract the CSS content in <style>
    const result = await postcss([autoprefixer]).process(cssContent, {
      from: undefined,
    });
    html = html.replace(match[0], `<style>${result.css}</style>`);
  }

  return html;
}

// Process the inline JS function
async function processInlineJS(html) {
  const jsRegex = /<script>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = jsRegex.exec(html)) !== null) {
    const jsContent = match[1]; // Extract the JS content in <script>

    // 混淆 JS
    const obfuscatedJs = obfuscator
      .obfuscate(jsContent, {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        debugProtection: true,
        debugProtectionInterval: 2000,
        disableConsoleOutput: true,
      })
      .getObfuscatedCode();

    html = html.replace(match[0], `<script>${obfuscatedJs}</script>`);
  }

  return html;
}

function _getNextVersoinStr(isDebug) {
  let pkgFile = path.join(__dirname, "package.json");
  const pkgJson = require(pkgFile);
  let curVer = pkgJson.version;
  if (isDebug) {
    if (curVer.indexOf("-alpha.") < 0) {
      curVer += "-alpha.0";
    }
    return SemVer.inc(curVer, "prerelease");
  } else {
    return SemVer.inc(curVer, "patch");
  }
}

function updatePkgVersion(isDebug) {
  function _updater(file, nextVer) {
    const pkgFile = path.join(__dirname, file);
    const pkgJson = require(pkgFile);
    pkgJson.version = nextVer;
    fs.writeFileSync(pkgFile, JSON.stringify(pkgJson, null, 2));
  }
  const nextVer = _getNextVersoinStr(isDebug);
  _updater("package.json", nextVer);
  _updater("package-lock.json", nextVer);
}

function updateHtmlVersion(html) {
  let nextVer = _getNextVersoinStr();
  return html.replace(/{{version}}/g, nextVer);
}
