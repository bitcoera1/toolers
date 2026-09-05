document.addEventListener("DOMContentLoaded", () => {
  loadExchangeDashboard();
});

const dashboardTrendCache = new Map();

async function getDashboardTrend(base, quote = "PKR") {
  const today = new Date().toISOString().split("T")[0];
  const cacheKey = `${base}_${quote}_${today}`;

  if (dashboardTrendCache.has(cacheKey)) {
    return dashboardTrendCache.get(cacheKey);
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 10);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const url =
    `https://api.frankfurter.dev/v2/rates` +
    `?base=${encodeURIComponent(base)}` +
    `&quotes=${encodeURIComponent(quote)}` +
    `&from=${formatDate(startDate)}` +
    `&to=${formatDate(endDate)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Historical rate API error for ${base}/${quote}`);
  }

  const data = await response.json();

  const history = data
    .filter(item =>
      item.quote === quote &&
      typeof item.rate === "number"
    )
    .sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );

  if (history.length < 2) {
    throw new Error(`Not enough historical data for ${base}/${quote}`);
  }

  const firstRate = history[0].rate;
  const latestRate = history[history.length - 1].rate;

  const change = ((latestRate - firstRate) / firstRate) * 100;

  const result = {
    value: change.toFixed(2),
    isUp: change >= 0
  };

  dashboardTrendCache.set(cacheKey, result);

  return result;
}

async function loadExchangeDashboard() {
  const pairs = [
    { code: "USD", elementId: "usdRate", barId: "usdBar" },
    { code: "EUR", elementId: "eurRate", barId: "eurBar" },
    { code: "GBP", elementId: "gbpRate", barId: "gbpBar" },
    { code: "AED", elementId: "aedRate", barId: "aedBar" },
    { code: "SAR", elementId: "sarRate", barId: "sarBar" },
  ];

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/PKR");

    if (!response.ok) {
      throw new Error("Unable to fetch dashboard rates");
    }

    const data = await response.json();

await Promise.all(
  pairs.map(async (pair) => {

    const rate = 1 / data.rates[pair.code];

    const element = document.getElementById(pair.elementId);
    const bar = document.getElementById(pair.barId);

    const change = document.getElementById(
      pair.elementId.replace("Rate", "Change")
    );

    if (element) {
      element.textContent = rate.toFixed(2);
    }

    if (bar) {
      const percent = Math.min((rate / 370) * 100, 100);
      bar.style.width = percent + "%";
    }

    if (change) {

      try {

        const trend = await getDashboardTrend(
          pair.code,
          "PKR"
        );

        if (trend.isUp) {
          change.className = "rate-change up";
          change.textContent = "🟢 +" + trend.value + "%";
        } else {
          change.className = "rate-change down";
          change.textContent = "🔴 " + trend.value + "%";
        }

      } catch (trendError) {

        console.error(
          `Unable to load historical trend for ${pair.code}/PKR`,
          trendError
        );

        change.className = "rate-change";
        change.textContent = "—";
      }
    }
  })
);

    const updated = document.getElementById("dashboardUpdated");

    if (updated) {
      const now = new Date();

      updated.textContent =
        "🟢 Live rates updated " +
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
    }
    document.querySelectorAll(".skeleton").forEach(element => {
    element.classList.remove("skeleton");
});
  } catch (error) {
    console.error(error);

    const updated = document.getElementById("dashboardUpdated");

    if (updated) {
      updated.textContent = "Unable to load live rates";
    }
  }
}
let countdownSeconds = 60;

setInterval(() => {
  const countdown = document.getElementById("countdown");

  if (!countdown) {
    return;
  }

  countdownSeconds--;

  if (countdownSeconds <= 0) {
    countdown.textContent = "Updating live rates...";
    countdownSeconds = 60;
    loadExchangeDashboard();
  } else {
    countdown.textContent = "Next update in " + countdownSeconds + "s";
  }
}, 1000);
function updateMarketStatus() {
  const marketStatus = document.getElementById("marketStatus");

  if (!marketStatus) {
    return;
  }

  const now = new Date();
  const day = now.getUTCDay();
  const hour = now.getUTCHours();

  const isMarketOpen =
    (day > 0 && day < 5) ||
    (day === 5 && hour < 22) ||
    (day === 0 && hour >= 22);

  if (isMarketOpen) {
    marketStatus.textContent = "🟢 Forex Market Open";
    marketStatus.className = "market-status open";
  } else {
    marketStatus.textContent = "🔴 Forex Market Closed";
    marketStatus.className = "market-status closed";
  }
}

updateMarketStatus();
setInterval(updateMarketStatus, 60000);
function animateCounter(id, target, suffix = "") {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  let current = 0;
  const speed = 45;
const increment = Math.max(1, Math.ceil(target / 80));

  const counter = setInterval(() => {
    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(counter);
    }

    element.textContent = current + suffix;
  }, speed);
}

let countersStarted = false;

function startCountersWhenVisible() {
  const statsSection = document.querySelector(".stats-section");

  if (!statsSection || countersStarted) {
    return;
  }

  const sectionPosition = statsSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight - 100;

  if (sectionPosition < screenPosition) {
    countersStarted = true;

  animateCounter(
  "toolsCounter",
  typeof ToolXoneToolsRegistry !== "undefined"
    ? ToolXoneToolsRegistry.count()
    : 25,
  "+"
);
    animateCounter("currencyCounter", 17, "+");
    animateCounter("freeCounter", 100, "%");
  }
}

window.addEventListener("scroll", startCountersWhenVisible);
setTimeout(startCountersWhenVisible, 300);
function revealCards() {

    const cards = document.querySelectorAll(".tool-card");

    if (!cards.length) return;

    cards.forEach((card, index) => {

        setTimeout(() => {

            card.classList.add("show");

        }, index * 120);

    });

}

window.addEventListener("load", () => {

    setTimeout(revealCards, 300);

});