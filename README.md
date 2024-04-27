# seomark
```
import "https://hashsan.github.io/seomark/seomark.js"
const temp=`# h1`
const html = seomark(temp)
```

line parser

```
seomarkのできること。解析は１行のみ。

1. # あいうえを      ---> <h1>あいうえを</h1>
2. ## あいうえを     ---> <h2>あいうえを</h2>
3. <header>         ---> そのまま出力
4. //comment        ---> <!--//comment -->                   
5. [here](#)        ---> <a href="#">here</a>
6. ![画像](xyz.jpg) ---> <img src="xyz.jpg" alt="画像">
7. :夜とは:夜は平等に---> <dl><dt>夜とは</dt><dd>夜は平等に</dd></dl>
8. 文章はそのまま    ---> <p>文章はそのまま</p>
9. 文中で*強調*する  ---> <p>文中で<strong>強調</strong>する</p>
10. 文中で`<p>`は   ---> <p>文中で&lt;p&gt;は</p>

```
