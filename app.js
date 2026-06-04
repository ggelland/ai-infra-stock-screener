const defaultStocks = [
  { ticker: "NVDA", name: "NVIDIA", theme: "AI accelerators", technical: 92, ai: 100, infra: 86, quality: 94, valuationRisk: 82, volatility: 72, liquidity: 100, catalyst: "Blackwell/data center demand" },
  { ticker: "AVGO", name: "Broadcom", theme: "Custom AI ASICs, networking", technical: 88, ai: 92, infra: 90, quality: 90, valuationRisk: 68, volatility: 58, liquidity: 94, catalyst: "ASIC backlog and VMware cash flow" },
  { ticker: "AMD", name: "Advanced Micro Devices", theme: "AI GPUs and server CPUs", technical: 73, ai: 85, infra: 76, quality: 74, valuationRisk: 66, volatility: 76, liquidity: 96, catalyst: "MI-series share gains" },
  { ticker: "TSM", name: "Taiwan Semiconductor", theme: "Advanced foundry", technical: 82, ai: 91, infra: 80, quality: 92, valuationRisk: 48, volatility: 52, liquidity: 92, catalyst: "AI accelerator wafer demand" },
  { ticker: "ASML", name: "ASML", theme: "EUV lithography", technical: 61, ai: 72, infra: 70, quality: 91, valuationRisk: 56, volatility: 50, liquidity: 82, catalyst: "Advanced node capex cycle" },
  { ticker: "ANET", name: "Arista Networks", theme: "AI data center networking", technical: 86, ai: 83, infra: 95, quality: 88, valuationRisk: 62, volatility: 54, liquidity: 86, catalyst: "Ethernet AI cluster buildouts" },
  { ticker: "MU", name: "Micron", theme: "HBM and DRAM", technical: 84, ai: 82, infra: 72, quality: 62, valuationRisk: 58, volatility: 84, liquidity: 90, catalyst: "Memory pricing and HBM supply" },
  { ticker: "VRT", name: "Vertiv", theme: "Power and cooling", technical: 89, ai: 78, infra: 98, quality: 73, valuationRisk: 70, volatility: 69, liquidity: 76, catalyst: "High-density data center cooling" },
  { ticker: "ETN", name: "Eaton", theme: "Electrical equipment", technical: 76, ai: 55, infra: 92, quality: 84, valuationRisk: 50, volatility: 40, liquidity: 80, catalyst: "Grid and data center power" },
  { ticker: "SMCI", name: "Super Micro Computer", theme: "AI servers", technical: 64, ai: 90, infra: 86, quality: 46, valuationRisk: 76, volatility: 96, liquidity: 75, catalyst: "Server demand, accounting-risk discount" },
  { ticker: "MRVL", name: "Marvell", theme: "AI connectivity silicon", technical: 71, ai: 81, infra: 84, quality: 65, valuationRisk: 64, volatility: 70, liquidity: 84, catalyst: "Optical DSP and custom silicon" },
  { ticker: "AMAT", name: "Applied Materials", theme: "Semicap equipment", technical: 67, ai: 62, infra: 70, quality: 82, valuationRisk: 44, volatility: 48, liquidity: 88, catalyst: "Foundry and memory equipment spend" },
  { ticker: "LRCX", name: "Lam Research", theme: "Memory equipment", technical: 70, ai: 64, infra: 69, quality: 83, valuationRisk: 46, volatility: 50, liquidity: 82, catalyst: "HBM and NAND equipment recovery" },
  { ticker: "CEG", name: "Constellation Energy", theme: "Nuclear power for data centers", technical: 79, ai: 46, infra: 88, quality: 78, valuationRisk: 60, volatility: 55, liquidity: 78, catalyst: "Data center power contracts" },
  { ticker: "PWR", name: "Quanta Services", theme: "Grid construction", technical: 75, ai: 42, infra: 90, quality: 79, valuationRisk: 48, volatility: 44, liquidity: 70, catalyst: "Transmission and utility capex" },
  { ticker: "PLTR", name: "Palantir", theme: "AI software", technical: 91, ai: 78, infra: 42, quality: 70, valuationRisk: 92, volatility: 88, liquidity: 93, catalyst: "Enterprise AI platform adoption" }
];

const executionOverlays = {
  NVDA: {
    grade: "Watch",
    gate: "wait",
    reason: "Early reversal signals; wait for MACD bullish cross and EMA21 reclaim.",
    action: "No fresh entry until confirmation improves.",
    entry: "Wait for MACD bullish cross plus EMA21 reclaim; starter only after that confirmation holds.",
    exit: "If already long, keep tight risk and reduce if EMA21 rejection continues."
  },
  AVGO: {
    grade: "Hold only",
    gate: "trim",
    reason: "Earnings-event risk: Broadcom Q2 FY2026 results are scheduled for June 3 after close.",
    action: "Trim 30-40% before June 3; do not add before the print.",
    entry: "Do not add before June 3 earnings; reassess after the call and next-day range resolves.",
    exit: "Paper model trims 35% before earnings; sell remainder on stop, failed breakout, or target."
  },
  TSM: {
    grade: "Hold existing",
    gate: "wait",
    reason: "Do not chase; wait for a dip toward the defined add zone.",
    action: "Hold existing only; wait for dip to 405-410 before adding.",
    entry: "No new add unless price pulls into the 405-410 zone and holds.",
    exit: "Reduce if it loses the prior breakout level or relative strength rolls over."
  },
  ANET: {
    grade: "Watch",
    gate: "wait",
    reason: "Weak relative strength; market-rally confirmation needed.",
    action: "Needs confirmation before entry.",
    entry: "Wait for relative strength improvement and a confirmed close back above the short-term trend.",
    exit: "Exit if relative strength stays weak while the group advances."
  },
  VRT: {
    grade: "Watch",
    gate: "wait",
    reason: "Entry gate not met; OBV falling.",
    action: "Wait for OBV stabilization and reclaimed entry trigger.",
    entry: "No new entry until OBV stabilizes and price reclaims the entry gate.",
    exit: "Exit if OBV continues lower or price rejects the prior breakout area."
  },
  ETN: {
    grade: "Watch",
    gate: "wait",
    reason: "MACD turning; wait for ADX confirmation.",
    action: "Wait for ADX confirmation.",
    entry: "Starter only after MACD turn is confirmed by stronger ADX/trend expansion.",
    exit: "Reduce if the MACD turn fails and price closes below the 50-DMA."
  },
  AMD: {
    grade: "Hard block",
    gate: "block",
    reason: "Extended after a large move; macro bullish but overcrowded.",
    action: "Block fresh entries.",
    entry: "Hard block: wait for reset, base, or material pullback.",
    exit: "Avoid new exposure; if already long, trail aggressively."
  },
  MU: {
    grade: "Hard block",
    gate: "block",
    reason: "Extended and Micron fiscal Q3 earnings are scheduled for June 24.",
    action: "Block fresh entries before a reset.",
    entry: "Hard block: no fresh entry while extended into the June 24 earnings window.",
    exit: "Avoid new exposure; if already long, reduce into strength ahead of earnings."
  },
  LRCX: {
    grade: "Hard block",
    gate: "block",
    reason: "Extended and momentum fading.",
    action: "Block fresh entries.",
    entry: "Hard block: wait for momentum to reset and reclaim.",
    exit: "Avoid new exposure; sell or trim if the fade accelerates."
  }
};

const controls = {
  ratePressure: document.querySelector("#ratePressure"),
  aiCapex: document.querySelector("#aiCapex"),
  breadth: document.querySelector("#breadth"),
  volStress: document.querySelector("#volStress"),
  wTechnical: document.querySelector("#wTechnical"),
  wTheme: document.querySelector("#wTheme"),
  wQuality: document.querySelector("#wQuality"),
  wRisk: document.querySelector("#wRisk"),
  minScore: document.querySelector("#minScore"),
  portfolioSize: document.querySelector("#portfolioSize"),
  preferLiquid: document.querySelector("#preferLiquid"),
  paperCapital: document.querySelector("#paperCapital"),
  riskPerTrade: document.querySelector("#riskPerTrade"),
  maxOpenPositions: document.querySelector("#maxOpenPositions"),
  searchBox: document.querySelector("#searchBox")
};

let stocks = loadStocks();
let marks = loadMarks();
let paper = loadPaper();
let sortKey = "score";
let sortDir = -1;
let viewMode = "ranked";
let selectedTicker = null;

function loadStocks() {
  const saved = localStorage.getItem("aiInfraStocks");
  if (!saved) return defaultStocks;
  try {
    return JSON.parse(saved);
  } catch {
    return defaultStocks;
  }
}

function defaultMarks() {
  return Object.fromEntries(
    defaultStocks.map((stock) => [
      stock.ticker,
      { price: 100, date: today(), source: "model baseline" }
    ])
  );
}

function loadMarks() {
  const saved = localStorage.getItem("aiInfraPriceMarks");
  if (!saved) return defaultMarks();
  try {
    return { ...defaultMarks(), ...JSON.parse(saved) };
  } catch {
    return defaultMarks();
  }
}

function defaultPaper() {
  return {
    status: "idle",
    initialCapital: 100000,
    cash: 100000,
    positions: {},
    trades: [],
    startedAt: null,
    lastRun: null
  };
}

function loadPaper() {
  const saved = localStorage.getItem("aiInfraPaper");
  if (!saved) return defaultPaper();
  try {
    return { ...defaultPaper(), ...JSON.parse(saved) };
  } catch {
    return defaultPaper();
  }
}

function savePaper() {
  localStorage.setItem("aiInfraPaper", JSON.stringify(paper));
}

function saveMarks() {
  localStorage.setItem("aiInfraPriceMarks", JSON.stringify(marks));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function val(id) {
  const node = controls[id];
  return node.type === "checkbox" ? node.checked : Number(node.value);
}

function normalizedWeights() {
  const raw = {
    technical: val("wTechnical"),
    theme: val("wTheme"),
    quality: val("wQuality"),
    risk: val("wRisk")
  };
  const total = Object.values(raw).reduce((sum, n) => sum + n, 0) || 1;
  return Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, value / total]));
}

function regime() {
  const rate = val("ratePressure");
  const ai = val("aiCapex");
  const breadth = val("breadth");
  const vol = val("volStress");
  const score = clamp(ai * 0.42 + breadth * 0.28 + (100 - rate) * 0.18 + (100 - vol) * 0.12);
  const cash = score > 72 ? 8 : score > 58 ? 14 : score > 45 ? 24 : 38;
  const label = score > 72 ? "Risk-on" : score > 58 ? "Selective risk-on" : score > 45 ? "Defensive" : "Capital protection";
  return { score, cash, label, rate, ai, breadth, vol };
}

function scoreStock(stock) {
  const weights = normalizedWeights();
  const env = regime();
  const themeScore = stock.ai * 0.56 + stock.infra * 0.44;
  const riskScore = 100 - (stock.valuationRisk * 0.46 + stock.volatility * 0.38 + env.rate * 0.16);
  const risk = stock.valuationRisk * 0.45 + stock.volatility * 0.45 + (100 - stock.quality) * 0.1;
  const liquidityBonus = val("preferLiquid") ? (stock.liquidity - 70) * 0.08 : 0;
  const macroBoost = (env.ai - 50) * (themeScore / 100) * 0.12 + (env.breadth - 50) * 0.07 - env.vol * 0.035;
  const score = clamp(
    stock.technical * weights.technical +
      themeScore * weights.theme +
      stock.quality * weights.quality +
      riskScore * weights.risk +
      liquidityBonus +
      macroBoost
  );
  const overlay = executionOverlayFor(stock);
  const setup = setupFor(score, stock, env, overlay);
  const allocationBase = Math.max(0, score - val("minScore"));
  return { ...stock, score, themeScore, riskScore, risk, overlay, setup, allocationBase };
}

function executionOverlayFor(stock) {
  return executionOverlays[stock.ticker] || {
    grade: "Clear",
    gate: "pass",
    reason: "No special execution veto currently applied.",
    action: "Use standard model entry and exit rules."
  };
}

function setupFor(score, stock, env, overlay) {
  if (overlay.gate === "block") return "Avoid";
  if (overlay.gate === "wait" || overlay.gate === "trim") return "Watch";
  if (score >= 78 && stock.technical >= 78 && env.score >= 55) return "Buy";
  if (score >= 66 && stock.technical >= 62) return "Watch";
  return "Avoid";
}

function setupClass(setup) {
  return setup === "Buy" ? "buy" : setup === "Watch" ? "watch" : "avoid";
}

function entryRule(stock) {
  if (stock.overlay?.entry) return stock.overlay.entry;
  if (stock.setup === "Buy") {
    return `Starter now only if price holds above rising 20-DMA; add on breakout above 10-day high with volume.`;
  }
  if (stock.setup === "Watch") {
    return `Wait for close above 50-DMA or pullback to 20-DMA that holds for two sessions.`;
  }
  return `No new entry until trend improves and score clears ${val("minScore")}.`;
}

function exitRule(stock) {
  if (stock.overlay?.exit) return stock.overlay.exit;
  const stop = stock.volatility > 82 ? "8-10%" : stock.volatility > 62 ? "7-8%" : "5-6%";
  const trail = stock.score > 82 ? "use a 12% trailing stop after first 10% gain" : "trim into +8-12% spikes";
  return `Initial stop ${stop} below entry or a decisive 50-DMA break; ${trail}.`;
}

function riskLabel(stock) {
  if (stock.risk >= 75) return "High";
  if (stock.risk >= 55) return "Medium";
  return "Lower";
}

function gateClass(stock) {
  return `gate-${stock.overlay?.gate || "pass"}`;
}

function gateLabel(stock) {
  return stock.overlay?.grade || "Clear";
}

function rankedStocks() {
  return stocks.map(scoreStock).sort((a, b) => sortCompare(a, b));
}

function sortCompare(a, b) {
  const left = a[sortKey];
  const right = b[sortKey];
  if (typeof left === "number" && typeof right === "number") return (left - right) * sortDir;
  return String(left).localeCompare(String(right)) * sortDir;
}

function portfolioFrom(scored) {
  const eligible = scored.filter((stock) => stock.score >= val("minScore") && stock.setup !== "Avoid" && stock.overlay.gate === "pass");
  const picks = eligible.slice(0, val("portfolioSize"));
  const env = regime();
  const investable = 100 - env.cash;
  const totalBase = picks.reduce((sum, stock) => sum + stock.allocationBase, 0) || 1;
  return picks.map((stock) => ({
    ...stock,
    allocation: (stock.allocationBase / totalBase) * investable
  }));
}

function render() {
  const scored = rankedStocks();
  const portfolio = portfolioFrom(scored);
  const filtered = filterRows(viewMode === "watchlist" ? scored.filter((s) => s.setup !== "Buy") : scored);
  renderSummary(portfolio, scored);
  renderPaper(scored, portfolio);
  renderMarks();
  renderAllocation(portfolio);
  renderCards(portfolio);
  renderTable(filtered, portfolio);
  renderDetail(scored.find((stock) => stock.ticker === selectedTicker) || portfolio[0] || scored[0]);
}

function filterRows(rows) {
  const query = controls.searchBox.value.trim().toLowerCase();
  if (!query) return rows;
  return rows.filter((stock) =>
    `${stock.ticker} ${stock.name} ${stock.theme} ${stock.catalyst}`.toLowerCase().includes(query)
  );
}

function renderSummary(portfolio, scored) {
  const env = regime();
  document.querySelector("#regimeBadge").textContent = env.label;
  document.querySelector("#stance").textContent = env.label;
  document.querySelector("#avgScore").textContent = Math.round(portfolio.reduce((sum, stock) => sum + stock.score, 0) / (portfolio.length || 1));
  document.querySelector("#cashBuffer").textContent = `${env.cash}%`;
  document.querySelector("#topTrigger").textContent = scored[0] ? `${scored[0].ticker}: ${scored[0].setup}` : "None";
}

function renderAllocation(portfolio) {
  const chart = document.querySelector("#allocationChart");
  chart.innerHTML = portfolio
    .map(
      (stock) => `
        <div class="bar-row">
          <strong>${stock.ticker}</strong>
          <div class="bar-track"><div class="bar" style="width:${Math.max(4, stock.allocation * 4)}%"></div></div>
          <span>${stock.allocation.toFixed(1)}%</span>
        </div>`
    )
    .join("");
}

function renderCards(portfolio) {
  const list = document.querySelector("#portfolioList");
  list.innerHTML = portfolio
    .map(
      (stock) => `
        <article class="pick-card" data-ticker="${stock.ticker}">
          <strong>${stock.ticker}<span>${Math.round(stock.score)}</span></strong>
          <p>${stock.theme}</p>
        </article>`
    )
    .join("");
  list.querySelectorAll(".pick-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedTicker = card.dataset.ticker;
      render();
    });
  });
}

function renderTable(rows, portfolio) {
  const weights = new Map(portfolio.map((stock) => [stock.ticker, stock.allocation]));
  document.querySelector("#stockRows").innerHTML = rows
    .map(
      (stock) => `
        <tr data-ticker="${stock.ticker}">
          <td class="ticker-cell">${stock.ticker}</td>
          <td><strong>${stock.name}</strong><br><span class="muted">${stock.theme}</span></td>
          <td>${Math.round(stock.score)}</td>
          <td>${weights.has(stock.ticker) ? `${weights.get(stock.ticker).toFixed(1)}%` : "-"}</td>
          <td class="setup ${setupClass(stock.setup)}">${stock.setup}</td>
          <td><span class="gate-pill ${gateClass(stock)}">${gateLabel(stock)}</span><br><span class="muted">${stock.overlay.action}</span></td>
          <td>${entryRule(stock)}</td>
          <td>${exitRule(stock)}</td>
          <td><span class="risk-pill">${riskLabel(stock)}</span></td>
        </tr>`
    )
    .join("");
  document.querySelectorAll("#stockRows tr").forEach((row) => {
    row.addEventListener("click", () => {
      selectedTicker = row.dataset.ticker;
      render();
    });
  });
}

function renderDetail(stock) {
  if (!stock) return;
  selectedTicker = stock.ticker;
  document.querySelector("#detailTitle").textContent = `${stock.ticker} · ${stock.name}`;
  document.querySelector("#detailBadge").textContent = Math.round(stock.score);
  document.querySelector("#detailBody").innerHTML = `
    <div class="detail-box">
      <h4>Position Plan</h4>
      <ul>
        <li>${entryRule(stock)}</li>
        <li>${exitRule(stock)}</li>
        <li>Execution gate: ${gateLabel(stock)} - ${stock.overlay.action}</li>
        <li>Risk unit: ${riskLabel(stock)}; size down when volatility stress rises.</li>
      </ul>
    </div>
    <div class="detail-box">
      <h4>Why It Scores</h4>
      <p>${stock.catalyst}. Theme score ${Math.round(stock.themeScore)}, technical score ${stock.technical}, quality ${stock.quality}.</p>
    </div>
    <div class="detail-box">
      <h4>Failure Signals</h4>
      <p>${stock.overlay.reason} Also exit or reduce if AI capex guidance weakens, margins compress, relative strength breaks, or the stock closes below the 50-DMA on rising volume.</p>
    </div>`;
}

function money(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function markFor(ticker) {
  return Number(marks[ticker]?.price || 100);
}

function stopPct(stock) {
  if (stock.volatility > 82) return 0.1;
  if (stock.volatility > 62) return 0.08;
  return 0.06;
}

function targetPct(stock) {
  return stock.score > 84 ? 0.18 : stock.score > 76 ? 0.14 : 0.1;
}

function positionPnl(position) {
  const mark = markFor(position.ticker);
  return (mark - position.entryPrice) * position.shares;
}

function paperEquity() {
  return paper.cash + Object.values(paper.positions).reduce((sum, position) => sum + markFor(position.ticker) * position.shares, 0);
}

function renderPaper(scored, portfolio) {
  const equity = paperEquity();
  const pnl = equity - paper.initialCapital;
  document.querySelector("#paperEquity").textContent = money(equity);
  document.querySelector("#paperCash").textContent = money(paper.cash);
  document.querySelector("#paperPnl").textContent = money(pnl);
  document.querySelector("#paperPnl").className = pnl >= 0 ? "gain" : "loss";
  document.querySelector("#paperOpen").textContent = Object.keys(paper.positions).length;
  document.querySelector("#lastSignalRun").textContent = paper.lastRun ? `Last signal check: ${paper.lastRun}` : "No signal checks yet";
  document.querySelector("#paperStatus").textContent = paper.status === "active"
    ? `Active since ${paper.startedAt}. Import price marks, then run the signal check after market close.`
    : "Not started. Start the program to create paper entries from the current model.";

  document.querySelector("#positionRows").innerHTML = Object.values(paper.positions)
    .map((position) => {
      const mark = markFor(position.ticker);
      const pnlValue = positionPnl(position);
      return `
        <tr>
          <td class="ticker-cell">${position.ticker}</td>
          <td>${position.shares}</td>
          <td>${money(position.entryPrice)}</td>
          <td>${money(mark)}</td>
          <td>${money(position.stopPrice)}</td>
          <td>${money(position.targetPrice)}</td>
          <td class="${pnlValue >= 0 ? "gain" : "loss"}">${money(pnlValue)}</td>
        </tr>`;
    })
    .join("") || `<tr><td colspan="7">No open paper positions.</td></tr>`;

  document.querySelector("#tradeRows").innerHTML = paper.trades
    .slice()
    .reverse()
    .map(
      (trade) => `
        <tr>
          <td>${trade.date}</td>
          <td class="setup ${trade.action === "BUY" ? "buy" : "avoid"}">${trade.action}</td>
          <td class="ticker-cell">${trade.ticker}</td>
          <td>${money(trade.price)}</td>
          <td>${trade.shares}</td>
          <td>${trade.reason}</td>
          <td class="${trade.realizedPnl >= 0 ? "gain" : "loss"}">${trade.realizedPnl === null ? "-" : money(trade.realizedPnl)}</td>
        </tr>`
    )
    .join("") || `<tr><td colspan="7">No trades logged yet.</td></tr>`;
}

function renderMarks() {
  document.querySelector("#markGrid").innerHTML = rankedStocks()
    .slice(0, 12)
    .map((stock) => {
      const mark = marks[stock.ticker] || { price: 100, date: today() };
      return `
        <article class="mark-card">
          <label>
            <strong>${stock.ticker}</strong>
            <input data-mark="${stock.ticker}" type="number" min="0.01" step="0.01" value="${Number(mark.price).toFixed(2)}" />
            <span>${mark.date || "No date"} · ${mark.source || "manual"}</span>
          </label>
        </article>`;
    })
    .join("");
  document.querySelectorAll("[data-mark]").forEach((input) => {
    const updateMark = () => {
      marks[input.dataset.mark] = { price: Number(input.value), date: today(), source: "manual" };
      saveMarks();
    };
    input.addEventListener("input", updateMark);
    input.addEventListener("change", () => {
      updateMark();
      render();
    });
  });
}

function startPaperProgram() {
  paper = defaultPaper();
  paper.initialCapital = Number(controls.paperCapital.value) || 100000;
  paper.cash = paper.initialCapital;
  paper.status = "active";
  paper.startedAt = today();
  savePaper();
  runSignalCheck("Program start / rebalance");
}

function runSignalCheck(reason = "Daily signal check") {
  if (paper.status !== "active") {
    paper.status = "active";
    paper.startedAt = paper.startedAt || today();
    paper.initialCapital = Number(controls.paperCapital.value) || paper.initialCapital || 100000;
    paper.cash = paper.cash || paper.initialCapital;
  }

  const scored = rankedStocks();
  const byTicker = new Map(scored.map((stock) => [stock.ticker, stock]));
  const portfolio = portfolioFrom(scored).slice(0, Number(controls.maxOpenPositions.value) || 7);
  const now = today();

  Object.values(paper.positions).forEach((position) => {
    const stock = byTicker.get(position.ticker);
    const mark = markFor(position.ticker);
    position.highestPrice = Math.max(position.highestPrice || position.entryPrice, mark);
    const trailingStop = position.highestPrice * 0.9;
    const signalExit = !stock || stock.setup === "Avoid" || stock.score < val("minScore") - 4;
    const gateExit = stock && stock.overlay.gate === "block";
    const trimExit = stock && stock.overlay.gate === "trim" && !position.eventTrimmed;
    const stopExit = mark <= Math.max(position.stopPrice, trailingStop);
    const targetExit = mark >= position.targetPrice;
    if (trimExit) {
      trimPosition(position.ticker, mark, now, "Execution overlay: trim before earnings/event risk", 0.35);
    } else if (signalExit || gateExit || stopExit || targetExit) {
      closePosition(position.ticker, mark, now, gateExit ? "Execution hard block" : signalExit ? "Signal deterioration" : targetExit ? "Target reached" : "Stop / trailing stop");
    }
  });

  const openCount = () => Object.keys(paper.positions).length;
  portfolio.forEach((stock) => {
    if (openCount() >= (Number(controls.maxOpenPositions.value) || 7)) return;
    if (paper.positions[stock.ticker] || stock.setup !== "Buy" || stock.overlay.gate !== "pass") return;
    openPosition(stock, now, reason);
  });

  paper.lastRun = now;
  savePaper();
  render();
}

function trimPosition(ticker, price, date, reason, trimFraction) {
  const position = paper.positions[ticker];
  if (!position) return;
  const sharesToSell = Math.max(1, Math.floor(position.shares * trimFraction));
  const realizedPnl = (price - position.entryPrice) * sharesToSell;
  paper.cash += sharesToSell * price;
  position.shares -= sharesToSell;
  position.eventTrimmed = true;
  paper.trades.push({ date, action: "SELL", ticker, price, shares: sharesToSell, reason, realizedPnl });
  if (position.shares <= 0) delete paper.positions[ticker];
}

function openPosition(stock, date, reason) {
  const price = markFor(stock.ticker);
  const stop = price * (1 - stopPct(stock));
  const target = price * (1 + targetPct(stock));
  const allocationDollars = paper.initialCapital * (stock.allocation / 100);
  const riskDollars = paper.initialCapital * ((Number(controls.riskPerTrade.value) || 1) / 100);
  const riskSizedShares = Math.floor(riskDollars / Math.max(0.01, price - stop));
  const allocationSizedShares = Math.floor(allocationDollars / price);
  const shares = Math.max(0, Math.min(riskSizedShares, allocationSizedShares, Math.floor(paper.cash / price)));
  if (!shares) return;
  const cost = shares * price;
  paper.cash -= cost;
  paper.positions[stock.ticker] = {
    ticker: stock.ticker,
    name: stock.name,
    shares,
    entryPrice: price,
    entryDate: date,
    stopPrice: stop,
    targetPrice: target,
    highestPrice: price,
    scoreAtEntry: stock.score
  };
  paper.trades.push({ date, action: "BUY", ticker: stock.ticker, price, shares, reason, realizedPnl: null });
}

function closePosition(ticker, price, date, reason) {
  const position = paper.positions[ticker];
  if (!position) return;
  const proceeds = position.shares * price;
  const realizedPnl = (price - position.entryPrice) * position.shares;
  paper.cash += proceeds;
  paper.trades.push({ date, action: "SELL", ticker, price, shares: position.shares, reason, realizedPnl });
  delete paper.positions[ticker];
}

function resetPaperProgram() {
  paper = defaultPaper();
  savePaper();
  render();
}

function exportTrades() {
  const lines = [
    ["date", "action", "ticker", "price", "shares", "reason", "realizedPnl"].join(","),
    ...paper.trades.map((trade) =>
      [trade.date, trade.action, trade.ticker, trade.price, trade.shares, trade.reason, trade.realizedPnl]
        .map((field) => `"${String(field ?? "").replaceAll('"', '""')}"`)
        .join(",")
    )
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-infra-paper-trades.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function exportPicks() {
  const portfolio = portfolioFrom(rankedStocks());
  const lines = [
    ["ticker", "company", "score", "allocation", "setup", "executionGate", "gateAction", "entry", "exit", "risk"].join(","),
    ...portfolio.map((stock) =>
      [
        stock.ticker,
        stock.name,
        Math.round(stock.score),
        stock.allocation.toFixed(2),
        stock.setup,
        gateLabel(stock),
        stock.overlay.action,
        entryRule(stock),
        exitRule(stock),
        riskLabel(stock)
      ]
        .map((field) => `"${String(field).replaceAll('"', '""')}"`)
        .join(",")
    )
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-infra-screen-picks.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function importCsv(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const rows = String(reader.result)
      .trim()
      .split(/\r?\n/)
      .map((line) => line.split(",").map((cell) => cell.trim()));
    const headers = rows.shift().map((h) => h.toLowerCase());
    const required = ["ticker", "name", "theme", "technical", "ai", "infra", "quality", "valuationrisk", "volatility", "liquidity", "catalyst"];
    const hasRequired = required.every((key) => headers.includes(key));
    if (!hasRequired) {
      alert(`CSV needs headers: ${required.join(", ")}`);
      return;
    }
    stocks = rows.map((row) => {
      const item = Object.fromEntries(headers.map((header, index) => [header, row[index]]));
      return {
        ticker: item.ticker.toUpperCase(),
        name: item.name,
        theme: item.theme,
        technical: Number(item.technical),
        ai: Number(item.ai),
        infra: Number(item.infra),
        quality: Number(item.quality),
        valuationRisk: Number(item.valuationrisk),
        volatility: Number(item.volatility),
        liquidity: Number(item.liquidity),
        catalyst: item.catalyst
      };
    });
    localStorage.setItem("aiInfraStocks", JSON.stringify(stocks));
    render();
  };
  reader.readAsText(file);
}

function importMarks(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const rows = String(reader.result).trim().split(/\r?\n/).map((line) => line.split(",").map((cell) => cell.trim()));
    const headers = rows.shift().map((h) => h.toLowerCase());
    const tickerIndex = headers.indexOf("ticker");
    const priceIndex = headers.indexOf("price");
    const dateIndex = headers.indexOf("date");
    if (tickerIndex < 0 || priceIndex < 0) {
      alert("Price mark CSV needs at least ticker,price headers. Optional: date.");
      return;
    }
    rows.forEach((row) => {
      const ticker = row[tickerIndex]?.toUpperCase();
      const price = Number(row[priceIndex]);
      if (!ticker || !Number.isFinite(price) || price <= 0) return;
      marks[ticker] = { price, date: row[dateIndex] || today(), source: "csv" };
    });
    saveMarks();
    render();
  };
  reader.readAsText(file);
}

Object.values(controls).forEach((node) => {
  node.addEventListener("input", render);
  node.addEventListener("change", render);
});

document.querySelector("#resetWeights").addEventListener("click", () => {
  controls.wTechnical.value = 34;
  controls.wTheme.value = 30;
  controls.wQuality.value = 20;
  controls.wRisk.value = 16;
  render();
});

document.querySelector("#exportBtn").addEventListener("click", exportPicks);
document.querySelector("#exportTradesBtn").addEventListener("click", exportTrades);
document.querySelector("#importBtn").addEventListener("click", () => document.querySelector("#csvInput").click());
document.querySelector("#markBtn").addEventListener("click", () => document.querySelector("#markInput").click());
document.querySelector("#csvInput").addEventListener("change", (event) => {
  if (event.target.files[0]) importCsv(event.target.files[0]);
});
document.querySelector("#markInput").addEventListener("change", (event) => {
  if (event.target.files[0]) importMarks(event.target.files[0]);
});
document.querySelector("#startPaperBtn").addEventListener("click", startPaperProgram);
document.querySelector("#runSignalsBtn").addEventListener("click", () => runSignalCheck());
document.querySelector("#resetPaperBtn").addEventListener("click", resetPaperProgram);

document.querySelectorAll("th[data-sort]").forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.dataset.sort;
    sortDir = sortKey === key ? sortDir * -1 : key === "score" ? -1 : 1;
    sortKey = key;
    render();
  });
});

document.querySelectorAll(".pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach((node) => node.classList.remove("active"));
    pill.classList.add("active");
    viewMode = pill.dataset.view;
    render();
  });
});

render();
