// --- Sheet Navigation ---
const SHEETS = ['balance', 'pnl', 'cashflow', 'kpis', 'budget', 'projections'];
const SHEET_TITLES = [
  'Balance General',
  'Estado de Resultados',
  'Flujo de Caja',
  'KPIs Operativos',
  'Presupuesto vs Real',
  'Proyecciones',
];

let currentSheet = 0;
let charts = [];

function destroyCharts() {
  charts.forEach(c => c.destroy());
  charts = [];
}

function navigateTo(index) {
  if (index === currentSheet) return;
  if (index < 0 || index >= SHEETS.length) return;

  const content = document.getElementById('sheetContent');
  content.classList.add('transitioning');

  setTimeout(() => {
    destroyCharts();
    currentSheet = index;
    renderSheet(currentSheet);
    updateNav();
    content.classList.remove('transitioning');
    document.getElementById('mainSheet').scrollTop = 0;
  }, 280);
}

function updateNav() {
  document.querySelectorAll('.nav-sheet').forEach((btn, i) => {
    btn.classList.toggle('active', i === currentSheet);
    if (i === currentSheet) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });
  document.getElementById('titleSheetCode').textContent = `L-0${currentSheet + 1}`;
}

// --- Event Listeners ---
document.querySelectorAll('.nav-sheet').forEach(btn => {
  btn.addEventListener('click', () => navigateTo(parseInt(btn.dataset.sheet)));
});

document.getElementById('prevSheet').addEventListener('click', () => navigateTo(currentSheet - 1));
document.getElementById('nextSheet').addEventListener('click', () => navigateTo(currentSheet + 1));

document.getElementById('presenterToggle').addEventListener('click', function () {
  const pressed = this.getAttribute('aria-pressed') === 'true';
  this.setAttribute('aria-pressed', String(!pressed));
  document.body.classList.toggle('presenter-mode', !pressed);
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    navigateTo(currentSheet + 1);
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    navigateTo(currentSheet - 1);
  }
  if (e.key === 'p' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const btn = document.getElementById('presenterToggle');
    btn.click();
  }
});

// --- Chart.js defaults ---
Chart.defaults.font.family = "'Work Sans', system-ui, sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.color = '#4A4D52';
Chart.defaults.borderColor = 'rgba(27, 94, 132, 0.08)';
Chart.defaults.plugins.tooltip.backgroundColor = '#1A1D20';
Chart.defaults.plugins.tooltip.titleFont = { family: "'Work Sans', sans-serif", size: 11, weight: '600' };
Chart.defaults.plugins.tooltip.bodyFont = { family: "'JetBrains Mono', monospace", size: 12 };
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 2;

// --- SHEET RENDERERS ---

function renderSheet(index) {
  const content = document.getElementById('sheetContent');
  switch (SHEETS[index]) {
    case 'balance': content.innerHTML = renderBalance(); break;
    case 'pnl': content.innerHTML = renderPnL(); break;
    case 'cashflow': content.innerHTML = renderCashFlow(); break;
    case 'kpis': content.innerHTML = renderKpis(); break;
    case 'budget': content.innerHTML = renderBudget(); break;
    case 'projections': content.innerHTML = renderProjections(); break;
  }
  initCharts(index);
}

function sheetHeader(code, title, subtitle) {
  return `
    <div class="sheet-header">
      <div class="sheet-header__code">${code}</div>
      <h1 class="sheet-header__title">${title}</h1>
      ${subtitle ? `<p class="sheet-header__subtitle">${subtitle}</p>` : ''}
    </div>`;
}

function metricCard(label, value, unit, delta, annotation, deltaDir) {
  const dirClass = deltaDir === 'up' ? 'metric-card__delta--up' : deltaDir === 'down' ? 'metric-card__delta--down' : '';
  const arrow = deltaDir === 'up' ? '↑' : deltaDir === 'down' ? '↓' : '';
  return `
    <div class="metric-card">
      <div class="metric-card__label">${label}</div>
      <div class="metric-card__value">${value}<span class="metric-card__unit">${unit}</span></div>
      ${delta !== null ? `<div class="metric-card__delta ${dirClass}">${arrow} ${delta}</div>` : ''}
      ${annotation ? `<div class="metric-card__annotation">${annotation}</div>` : ''}
    </div>`;
}

// --- L-01: BALANCE GENERAL ---
function renderBalance() {
  const totalActivoC = sumItems(balanceData.activo.corriente);
  const totalActivoNC = sumItems(balanceData.activo.noCorriente);
  const totalActivo = totalActivoC + totalActivoNC;

  const totalPasivoC = sumItems(balanceData.pasivo.corriente);
  const totalPasivoNC = sumItems(balanceData.pasivo.noCorriente);
  const totalPasivo = totalPasivoC + totalPasivoNC;

  const totalCapital = sumItems(balanceData.capital);
  const totalPasivoCapital = totalPasivo + totalCapital;

  let html = sheetHeader('L-01', 'Balance General', `Al cierre de ${PERIOD} — comparativo con ${PRIOR_PERIOD}`);

  html += `<div class="metrics-row">
    ${metricCard('Activo Total', fmtM(totalActivo), '', null, 'vs ' + fmtM(totalActivoC + sumItemsPrior(balanceData.activo.noCorriente)), totalActivo > (totalActivoC + sumItemsPrior(balanceData.activo.noCorriente)) ? 'up' : 'down')}
    ${metricCard('Pasivo Total', fmtM(totalPasivo), '', null, 'Endeudamiento: ' + fmtPct((totalPasivo / totalActivo) * 100), null)}
    ${metricCard('Capital Contable', fmtM(totalCapital), '', null, 'Resultado del ejercicio: ' + fmtM(balanceData.capital[2].actual), 'up')}
  </div>`;

  html += `<h2 class="section-title">Activo</h2>`;
  html += `<h2 class="section-title" style="font-size:0.6875rem;letter-spacing:0.1em;margin-top:-12px;border-bottom:none;color:var(--color-ink-muted);">Corriente</h2>`;
  html += renderTable(balanceData.activo.corriente);
  html += `<h2 class="section-title" style="font-size:0.6875rem;letter-spacing:0.1em;margin-top:-4px;border-bottom:none;color:var(--color-ink-muted);">No Corriente</h2>`;
  html += renderTable(balanceData.activo.noCorriente);
  html += `<div class="annotation-line"><span class="annotation-line__connector"></span><span class="annotation-line__label">Activo Total: ${fmtM(totalActivo)}</span></div>`;

  html += `<h2 class="section-title">Pasivo</h2>`;
  html += `<h2 class="section-title" style="font-size:0.6875rem;letter-spacing:0.1em;margin-top:-12px;border-bottom:none;color:var(--color-ink-muted);">Corriente</h2>`;
  html += renderTable(balanceData.pasivo.corriente);
  html += `<h2 class="section-title" style="font-size:0.6875rem;letter-spacing:0.1em;margin-top:-4px;border-bottom:none;color:var(--color-ink-muted);">No Corriente</h2>`;
  html += renderTable(balanceData.pasivo.noCorriente);
  html += `<div class="annotation-line"><span class="annotation-line__connector"></span><span class="annotation-line__label">Pasivo Total: ${fmtM(totalPasivo)}</span></div>`;

  html += `<h2 class="section-title">Capital Contable</h2>`;
  html += renderTable(balanceData.capital);
  html += `<div class="annotation-line"><span class="annotation-line__connector"></span><span class="annotation-line__label">Pasivo + Capital: ${fmtM(totalPasivoCapital)}</span></div>`;

  html += `<p class="chart-annotation">Los datos presentados corresponden al cierre del ${PERIOD}. Las cifras son preliminares hasta la auditoría trimestral. Todo valor en ${CURRENCY}.</p>`;
  return html;
}

function renderTable(items) {
  let rows = items.map(i => {
    const diff = i.actual - i.anterior;
    const diffClass = diff >= 0 ? 'data-table__variance--positive' : 'data-table__variance';
    const diffSign = diff >= 0 ? '+' : '';
    return `<tr>
      <td>${i.concepto}</td>
      <td>${fmtM(i.actual)}</td>
      <td>${fmtM(i.anterior)}</td>
      <td class="${diffClass}">${diffSign}${fmtM(diff)}</td>
    </tr>`;
  }).join('');

  return `<table class="data-table">
    <thead><tr><th>Concepto</th><th>${PERIOD}</th><th>${PRIOR_PERIOD}</th><th>Variación</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

// --- L-02: ESTADO DE RESULTADOS ---
function renderPnL() {
  const totalIngresos = sumItems(pnlData.ingresos);
  const totalCostos = sumItems(pnlData.costos);
  const utilidadBruta = totalIngresos - totalCostos;
  const totalGastosOp = sumItems(pnlData.gastosOperativos);
  const utilidadOperativa = utilidadBruta - totalGastosOp;

  const totalIngresosAnt = pnlData.ingresos.reduce((s, i) => s + i.anterior, 0);
  const totalCostosAnt = pnlData.costos.reduce((s, i) => s + i.anterior, 0);
  const utilidadOperativaAnt = (totalIngresosAnt - totalCostosAnt) - pnlData.gastosOperativos.reduce((s, i) => s + i.anterior, 0);

  let html = sheetHeader('L-02', 'Estado de Resultados', `${PERIOD} — acumulado mensual`);

  html += `<div class="metrics-row">
    ${metricCard('Ingresos Totales', fmtM(totalIngresos), '', '% vs ant: ' + fmtPct(((totalIngresos - totalIngresosAnt) / totalIngresosAnt) * 100), 'Margen bruto: ' + fmtPct((utilidadBruta / totalIngresos) * 100), 'up')}
    ${metricCard('Utilidad Bruta', fmtM(utilidadBruta), '', 'vs ' + fmtM(totalIngresosAnt - totalCostosAnt), null, 'up')}
    ${metricCard('Utilidad Operativa', fmtM(utilidadOperativa), '', 'Margen: ' + fmtPct((utilidadOperativa / totalIngresos) * 100), 'vs ' + fmtM(utilidadOperativaAnt), utilidadOperativa >= utilidadOperativaAnt ? 'up' : 'down')}
  </div>`;

  html += `<h2 class="section-title">Ingresos por servicio</h2>`;
  html += renderTable(pnlData.ingresos);
  html += `<div class="annotation-line"><span class="annotation-line__connector"></span><span class="annotation-line__label">Ingresos Totales: ${fmtM(totalIngresos)}</span></div>`;

  html += `<h2 class="section-title">Costos directos</h2>`;
  html += renderTable(pnlData.costos);
  html += `<div class="annotation-line"><span class="annotation-line__connector"></span><span class="annotation-line__label">Costos Totales: ${fmtM(totalCostos)} — ${fmtPct((totalCostos / totalIngresos) * 100)} de ingresos</span></div>`;

  html += `<h2 class="section-title">Gastos operativos</h2>`;
  html += renderTable(pnlData.gastosOperativos);

  html += `<div class="chart-container" style="max-width:100%;"><canvas id="chartPnL"></canvas></div>`;
  html += `<p class="chart-annotation">Composición de ingresos por servicio. Hospitalización y Cirugía representan el ${fmtPct(((pnlData.ingresos[0].actual + pnlData.ingresos[1].actual) / totalIngresos) * 100)} del total.</p>`;

  return html;
}

// --- L-03: FLUJO DE CAJA ---
function renderCashFlow() {
  const totalOp = cashFlowMonthly.reduce((s, m) => s + m.operacion, 0);
  const totalInv = cashFlowMonthly.reduce((s, m) => s + m.inversion, 0);
  const totalFin = cashFlowMonthly.reduce((s, m) => s + m.financiamiento, 0);
  const neto = totalOp + totalInv + totalFin;

  let html = sheetHeader('L-03', 'Flujo de Caja', `Enero – ${PERIOD} — flujo neto acumulado`);

  html += `<div class="metrics-row">
    ${metricCard('Flujo Operativo', fmtM(totalOp), '', null, 'Generación de efectivo', 'up')}
    ${metricCard('Flujo Inversión', fmtM(totalInv), '', null, 'CAPEX y equipo', 'down')}
    ${metricCard('Flujo Financiamiento', fmtM(totalFin), '', null, 'Servicio de deuda', 'down')}
    ${metricCard('Flujo Neto', fmtM(neto), '', null, 'Acumulado 6 meses', neto >= 0 ? 'up' : 'down')}
  </div>`;

  html += `<div class="chart-container" style="max-width:100%;"><canvas id="chartCashFlow"></canvas></div>`;
  html += `<p class="chart-annotation">El flujo de operación cubre las obligaciones de inversión y deuda. La estacionalidad de enero (menor actividad programada) explica el valle inicial.</p>`;

  return html;
}

// --- L-04: KPIs OPERATIVOS ---
function renderKpis() {
  let html = sheetHeader('L-04', 'Indicadores Operativos', `${PERIOD} — métricas clave de desempeño hospitalario`);

  html += `<div class="kpi-grid">`;
  kpiData.forEach(kpi => {
    html += `<div class="kpi-item">
      <div class="kpi-item__label">${kpi.label}</div>
      <div class="kpi-item__value">${kpi.value}<span class="kpi-item__unit">${kpi.unit}</span></div>
      <div class="kpi-item__context">${kpi.prior} · ${kpi.context}</div>
      ${kpi.threshold ? `<div class="kpi-item__threshold">${kpi.threshold}</div>` : ''}
    </div>`;
  });
  html += `</div>`;

  html += `<div class="chart-container" style="max-width:100%;"><canvas id="chartKpiRadar"></canvas></div>`;
  html += `<p class="chart-annotation">Cada indicador comparado contra su meta (línea punteada). Los valores por debajo de la meta requieren plan de acción.</p>`;

  return html;
}

// --- L-05: PRESUPUESTO VS REAL ---
function renderBudget() {
  const totalPresIng = budgetData.reduce((s, d) => s + d.presupuesto, 0);
  const totalRealIng = budgetData.reduce((s, d) => s + d.real, 0);
  const totalPresCos = budgetCostData.reduce((s, d) => s + d.presupuesto, 0);
  const totalRealCos = budgetCostData.reduce((s, d) => s + d.real, 0);
  const varIng = totalRealIng - totalPresIng;
  const varCos = totalRealCos - totalPresCos;

  let html = sheetHeader('L-05', 'Presupuesto vs Real', `${PERIOD} — ejecución presupuestaria`);

  html += `<div class="metrics-row">
    ${metricCard('Ingreso Real', fmtM(totalRealIng), '', null, 'Presupuesto: ' + fmtM(totalPresIng), varIng >= 0 ? 'up' : 'down')}
    ${metricCard('Variación Ingreso', (varIng >= 0 ? '+' : '') + fmtPct((varIng / totalPresIng) * 100), '', null, (varIng >= 0 ? '+' : '') + fmtM(varIng), varIng >= 0 ? 'up' : 'down')}
    ${metricCard('Costo Real', fmtM(totalRealCos), '', null, 'Presupuesto: ' + fmtM(totalPresCos), 'down')}
    ${metricCard('Variación Costo', '+' + fmtPct((varCos / totalPresCos) * 100), '', null, '+' + fmtM(varCos), 'down')}
  </div>`;

  html += `<h2 class="section-title">Ingresos por departamento</h2>`;
  html += `<div class="chart-container" style="max-width:100%;"><canvas id="chartBudgetRev"></canvas></div>`;

  html += `<h2 class="section-title">Costos por rubro</h2>`;
  html += `<div class="chart-container" style="max-width:100%;"><canvas id="chartBudgetCost"></canvas></div>`;
  html += `<p class="chart-annotation">Los desvíos en insumos médicos (+5.7%) y medicamentos (+2.3%) requieren revisión. Ingresos por encima del presupuesto en todos los servicios compensan parcialmente.</p>`;

  return html;
}

// --- L-06: PROYECCIONES ---
function renderProjections() {
  const lastActual = budgetData.reduce((s, d) => s + d.real, 0);
  const baseEnd = projectionData.base[projectionData.base.length - 1];
  const growth = ((baseEnd / lastActual) - 1) * 100;

  let html = sheetHeader('L-06', 'Proyecciones 2026', `Julio – Diciembre — tres escenarios`);

  html += `<div class="metrics-row">
    ${metricCard('Proyección Base (Dic)', fmtM(baseEnd), '', null, 'Crecimiento est.: +' + fmtPct(growth), 'up')}
    ${metricCard('Escenario Optimista', fmtM(projectionData.optimistic[projectionData.optimistic.length - 1]), '', null, 'Con apertura de nueva ala', 'up')}
    ${metricCard('Escenario Pesimista', fmtM(projectionData.pessimistic[projectionData.pessimistic.length - 1]), '', null, 'Con restricción presupuestal', 'down')}
    ${metricCard('Ingreso Anual Proy.', fmtM(baseEnd + totalRealIng), '', null, 'Acumulado estimado 2026', 'up')}
  </div>`;

  html += `<div class="chart-container" style="max-width:100%;"><canvas id="chartProjections"></canvas></div>`;
  html += `<p class="chart-annotation">Escenario base asume volumen actual y ajuste inflacionario del 3.2% en costos. El escenario optimista contempla la apertura del ala de consultorios en septiembre. Las proyecciones se actualizan mensualmente con datos reales.</p>`;

  return html;
}

// --- CHART INITIALIZATION ---

function initCharts(index) {
  const sheet = SHEETS[index];

  if (sheet === 'pnl') {
    initPnLChart();
  }
  if (sheet === 'cashflow') {
    initCashFlowChart();
  }
  if (sheet === 'kpis') {
    initKpiRadar();
  }
  if (sheet === 'budget') {
    initBudgetRevChart();
    initBudgetCostChart();
  }
  if (sheet === 'projections') {
    initProjectionsChart();
  }
}

function initPnLChart() {
  const ctx = document.getElementById('chartPnL');
  if (!ctx) return;
  const labels = pnlData.ingresos.map(i => i.concepto);
  const actuals = pnlData.ingresos.map(i => i.actual);
  const priors = pnlData.ingresos.map(i => i.anterior);

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: PERIOD,
          data: actuals,
          backgroundColor: '#1B5E84',
          borderRadius: 2,
          borderSkipped: false,
        },
        {
          label: PRIOR_PERIOD,
          data: priors,
          backgroundColor: 'rgba(27, 94, 132, 0.18)',
          borderRadius: 2,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.2,
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, pointStyleWidth: 8, padding: 24, font: { family: "'Work Sans', sans-serif", size: 11 } } },
        tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${fmtM(ctx.raw)}` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        y: { grid: { color: 'rgba(27, 94, 132, 0.06)' }, ticks: { callback: v => fmtM(v), font: { family: "'JetBrains Mono', monospace", size: 10 } } },
      },
    },
  });
  charts.push(chart);
}

function initCashFlowChart() {
  const ctx = document.getElementById('chartCashFlow');
  if (!ctx) return;
  const labels = cashFlowMonthly.map(d => d.mes);

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Operación', data: cashFlowMonthly.map(d => d.operacion), backgroundColor: '#2D6A4F', borderRadius: 2, borderSkipped: false, stack: 'stack1' },
        { label: 'Inversión', data: cashFlowMonthly.map(d => d.inversion), backgroundColor: '#B83A2E', borderRadius: 2, borderSkipped: false, stack: 'stack2' },
        { label: 'Financiamiento', data: cashFlowMonthly.map(d => d.financiamiento), backgroundColor: 'rgba(27, 94, 132, 0.4)', borderRadius: 2, borderSkipped: false, stack: 'stack2' },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.2,
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, pointStyleWidth: 8, padding: 24, font: { family: "'Work Sans', sans-serif", size: 11 } } },
        tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${fmtM(ctx.raw)}` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        y: { grid: { color: 'rgba(27, 94, 132, 0.06)' }, ticks: { callback: v => fmtM(v), font: { family: "'JetBrains Mono', monospace", size: 10 } } },
      },
    },
  });
  charts.push(chart);
}

function initKpiRadar() {
  const ctx = document.getElementById('chartKpiRadar');
  if (!ctx) return;
  const labels = kpiData.map(k => k.label.split(' ')[0]);
  const actuals = kpiData.map(k => parseFloat(k.value.replace(',', '')));
  const targets = [80, 4.0, 6600, 18, 85, 3.0, 45, 12];

  // Normalize to 0-100 for radar
  const maxVals = actuals.map((v, i) => Math.max(v, targets[i]) * 1.2);
  const normActuals = actuals.map((v, i) => (v / maxVals[i]) * 100);
  const normTargets = targets.map((v, i) => (v / maxVals[i]) * 100);

  const chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [
        { label: PERIOD, data: normActuals, borderColor: '#1B5E84', backgroundColor: 'rgba(27, 94, 132, 0.08)', borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#1B5E84' },
        { label: 'Meta', data: normTargets, borderColor: 'rgba(27, 94, 132, 0.3)', backgroundColor: 'transparent', borderWidth: 1.5, borderDash: [4, 4], pointRadius: 0 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, pointStyleWidth: 8, padding: 24, font: { family: "'Work Sans', sans-serif", size: 11 } } },
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { display: false },
          grid: { color: 'rgba(27, 94, 132, 0.08)' },
          pointLabels: { font: { size: 9, family: "'Work Sans', sans-serif" }, color: '#4A4D52' },
        },
      },
    },
  });
  charts.push(chart);
}

function initBudgetRevChart() {
  const ctx = document.getElementById('chartBudgetRev');
  if (!ctx) return;
  const labels = budgetData.map(d => d.departamento);

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Real', data: budgetData.map(d => d.real), backgroundColor: '#1B5E84', borderRadius: 2, borderSkipped: false },
        { label: 'Presupuesto', data: budgetData.map(d => d.presupuesto), backgroundColor: 'rgba(27, 94, 132, 0.18)', borderRadius: 2, borderSkipped: false },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.2,
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, pointStyleWidth: 8, padding: 24, font: { family: "'Work Sans', sans-serif", size: 11 } } },
        tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${fmtM(ctx.raw)}` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        y: { grid: { color: 'rgba(27, 94, 132, 0.06)' }, ticks: { callback: v => fmtM(v), font: { family: "'JetBrains Mono', monospace", size: 10 } } },
      },
    },
  });
  charts.push(chart);
}

function initBudgetCostChart() {
  const ctx = document.getElementById('chartBudgetCost');
  if (!ctx) return;
  const labels = budgetCostData.map(d => d.departamento);

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Real', data: budgetCostData.map(d => d.real), backgroundColor: '#B83A2E', borderRadius: 2, borderSkipped: false },
        { label: 'Presupuesto', data: budgetCostData.map(d => d.presupuesto), backgroundColor: 'rgba(184, 58, 46, 0.18)', borderRadius: 2, borderSkipped: false },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.2,
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, pointStyleWidth: 8, padding: 24, font: { family: "'Work Sans', sans-serif", size: 11 } } },
        tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${fmtM(ctx.raw)}` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        y: { grid: { color: 'rgba(27, 94, 132, 0.06)' }, ticks: { callback: v => fmtM(v), font: { family: "'JetBrains Mono', monospace", size: 10 } } },
      },
    },
  });
  charts.push(chart);
}

function initProjectionsChart() {
  const ctx = document.getElementById('chartProjections');
  if (!ctx) return;
  const labels = projectionData.labels;

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Optimista',
          data: projectionData.optimistic,
          borderColor: '#2D6A4F',
          backgroundColor: 'rgba(45, 106, 79, 0.06)',
          fill: true,
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: '#2D6A4F',
        },
        {
          label: 'Base',
          data: projectionData.base,
          borderColor: '#1B5E84',
          backgroundColor: 'rgba(27, 94, 132, 0.06)',
          fill: true,
          borderWidth: 2.5,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: '#1B5E84',
        },
        {
          label: 'Pesimista',
          data: projectionData.pessimistic,
          borderColor: '#B83A2E',
          backgroundColor: 'rgba(184, 58, 46, 0.04)',
          fill: true,
          borderWidth: 2,
          borderDash: [4, 3],
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: '#B83A2E',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.2,
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, pointStyleWidth: 8, padding: 24, font: { family: "'Work Sans', sans-serif", size: 11 } } },
        tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${fmtM(ctx.raw)}` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        y: {
          grid: { color: 'rgba(27, 94, 132, 0.06)' },
          ticks: { callback: v => fmtM(v), font: { family: "'JetBrains Mono', monospace", size: 10 } },
          min: 21000000,
        },
      },
    },
  });
  charts.push(chart);
}

// --- Initial render ---
renderSheet(0);
updateNav();
