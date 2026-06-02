# AI Infrastructure Stock Screener

Interactive stock screening and paper-trading tool focused on the AI infrastructure theme.

## What It Does

- Scores a tech and AI infrastructure universe using macro, thematic, quality, technical, and risk inputs.
- Adds an execution overlay for event risk, reversal confirmation, extension blocks, and entry gates.
- Builds a tactical paper-trading book with open positions, stops, targets, P&L, and a trade journal.
- Supports manual or CSV price marks using `ticker,price,date`.

## Run Locally

```bash
python3 -m http.server 9001 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:9001/
```

## Files

- `index.html` - app markup
- `styles.css` - interface styling
- `app.js` - scoring, execution overlay, and paper-trading logic
- `sample-price-marks.csv` - example CSV for price mark imports

## Disclaimer

This is a paper-trading analysis tool, not financial advice. Short-term trading is risky, and real execution requires independent verification of prices, liquidity, news, earnings, and risk controls.
