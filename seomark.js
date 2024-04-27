/*
var help=`
 seomarkのできること。解析は１行のみ。
 しかし高速。#＃と!！と*＊は揺らぎを許容。
 1. # あいうえを      ---> <h1>あいうえを</h1>
 2. ## あいうえを     ---> <h2>あいうえを</h2>
 3. <header>         ---> そのまま出力
 4. //comment        ---> <!--//comment -->                   
 5. [here](#)        ---> <a href="#">here</a>
 6. ![画像](xyz.jpg) ---> <img src="xyz.jpg" alt="画像">
 7. :夜とは:夜は平等に---> <dl><dt>夜とは</dt><dd>夜は平等に</dd></dl>
 8. 文章はそのまま    ---> <p>文章はそのまま</p>
 9. 文中で*強調*する  ---> <p>文中で<strong>強調</strong>する</p>
 10. 文中で\`<p>\`は  ---> <p>文中で&lt;p&gt;は</p>
 11. > はクオート     ---> <quote>はクオート</quote> 
`
/////////////////////////////
*/


// 正規表現パターンをコンパイル
const h2Pattern = /^## (.+)/;
const h1Pattern = /^# (.+)/;
const commentPattern = /^\/\/(.+)/;
const linkPattern = /^\[([^\]]+)\]\(([^)]+)\)/;
const imagePattern = /^\!\[([^\]]+)\]\(([^)]+)\)/;
const dlPattern = /^:([^:]+):([^:]+)/;
const quotePattern = /^> (.+)/;
const strongPattern = /\*(.*?)\*/g;
const escapePattern = /`([^`]+)`/g;
const escapes = /[&<>"' ]/g;
const httpPattern = /^http/;

// テキストを処理する関数
function seomark(text) {
  return text.trim().split('\n').map(parseLine).join('\n');
}

// 1行ごとに処理する関数
function parseLine(line) {
  let match;
  if ((match = line.match(h2Pattern))) {
    const wk = match[1];
    return `<h2>${wk}</h2>`;
  }
  if ((match = line.match(h1Pattern))) {
    const wk = match[1];
    return `<h1>${wk}</h1>`;
  }
  if (commentPattern.test(line)){
    return `<!--${line}-->`;
  }
  if ((match = line.match(linkPattern))) {
    const word = match[1];
    const link = match[2];
    const attr = linkAttr(link)
    return `<a href="${link}" ${attr}>${word}</a>`;
  }
  if ((match = line.match(imagePattern))) {
    const word = match[1];
    const link = match[2];
    return `<img src="${link}" alt="${word}">`;
  }
  if ((match = line.match(dlPattern))) {
    const dt = parseInner(match[1]);
    const dd = parseInner(match[2]);
    return `<dl><dt>${dt}</dt><dd>${dd}</dd></dl>`;
  }
  if ((match = line.match(quotePattern))) {
    const wk = match[1];
    return `<quote>${wk}</quote>`;
  }
  return `<p>${parseInner(line)}</p>`;
}

// 内部の特殊書式を処理する関数
function parseInner(line) {
  return line.replace(strongPattern, `<strong>$1</strong>`)
             .replace(escapePattern, escapeHtml);
}

// HTMLエスケープを行う関数
function escapeHtml(html) {
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
    ' ': '&nbsp;'
  };  
  return html.replace(escapes, match => escapeMap[match]);
}

function linkAttr(url){
  if(httpPattern.test(url)){
    return ' target="_blank" rel="noopener noreferrer" ';
  }
  return '';
}

window.seomark = seomark;


