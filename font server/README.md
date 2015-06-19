This is a REST API for nihongoresources.com, so that I can
start weening that off of PHP.

Kanji style images are in SVG format, requested on

>  /svg/:kanji

The kanji is expected to be a plain unicode kanji (utf8), and the output takes a long time to generate if not cached, due to the fact that OpenType.js loads entire fonts in memory by fully unpacking them, which means I can't load all fonts in mem and then start listening, because that makes Node run out of memory. Instead it loads each fonts, one by one, throwing away previously loaded fonts to ensure there's enough memory to work with. For a single SVG, that takes a good 15+ seconds.

Fonts obviously not included for licensing reasons, but I'm currently using:

- handwriting: きろ字 (freely available, although the original site for it vanished)
- textbook: Epson Kyokasho (freely available on http://www.epson.jp/download2/printer/driver/win/page/ttf30.htm)
- minchou: Ume Mincho M3 (freely available on http://osdn.jp/projects/ume-font)
- gothic: Ume Gothic C4 (idem dito)
- gyousho: NIS AYA (JTC淡斎行書「彩」, http://www.nisfont.co.jp/extra/index_hissho.html, sold everywhere)
- sousho: NIS KOI (JTC淡斎草書「濃」, http://www.nisfont.co.jp/extra/index_hissho.html, sold everywhere)
- block: Arphic Reisho Medium JIS2004 (http://www.arphic.com/usa/fontgallery/jis_6.htm, sold everywhere)
- seal: 伊藤印 誠印相細 (sadly now defunct and presumably no longer available, but let me know if I'm wrong)
- bone: NIS ARAS (新井篆書S, http://www.nisfont.co.jp/extra/index_hissho.html, damn hard to find)

And yes, those fonts cost me an arm and a leg... Those five faces were bought through [DexFont](http://www.dex.ne.jp/download/font/) for 54648円, in 2009, because I needed them for a [book I was writing at the time](www.amazon.ca/Introduction-Japanese-Syntax-Grammar-Language/dp/9081507117).
