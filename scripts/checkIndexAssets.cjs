const fs = require('fs');
const path = require('path');
const projectRoot = process.cwd();
const html = fs.readFileSync(path.join(projectRoot,'index.html'),'utf8');
const attrRe = /\b(?:href|src|content|url)=["']([^"']+)["']/gi;
let m; const results = [];
while ((m = attrRe.exec(html)) !== null) {
  const p = m[1];
  if (/^(https?:)?\/\//.test(p) || p.startsWith('data:')) continue;
  let fsPath;
  if (p.startsWith('/')) fsPath = path.join(projectRoot, p.replace(/^\//, ''));
  else fsPath = path.join(projectRoot, p);
  try {
    const s = fs.statSync(fsPath);
    results.push({attrValue: p, fsPath, isDirectory: s.isDirectory()});
  } catch (err) {
    results.push({attrValue: p, fsPath, error: err.message});
  }
}
console.log(JSON.stringify(results, null, 2));
