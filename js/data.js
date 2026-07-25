// Datos sintéticos para demostración — reemplazar con datos reales de Excel
// Período: Junio 2026 vs Mayo 2026 vs Presupuesto Junio 2026

const PERIOD = 'Junio 2026';
const PRIOR_PERIOD = 'Mayo 2026';
const CURRENCY = 'MXN';

const FMT = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const PCT = new Intl.NumberFormat('es-MX', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 });
const NUM = new Intl.NumberFormat('es-MX', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function fmtM(value) {
  if (Math.abs(value) >= 1000000) return FMT.format(value);
  return FMT.format(value);
}

function fmtPct(value) {
  return PCT.format(value / 100);
}

// --- BALANCE GENERAL ---
const balanceData = {
  activo: {
    corriente: [
      { concepto: 'Efectivo y equivalentes', actual: 12800000, anterior: 11400000 },
      { concepto: 'Cuentas por cobrar', actual: 18200000, anterior: 19700000 },
      { concepto: 'Inventarios (farmacia e insumos)', actual: 9400000, anterior: 9100000 },
      { concepto: 'Otros activos corrientes', actual: 2100000, anterior: 2300000 },
    ],
    noCorriente: [
      { concepto: 'Propiedad, planta y equipo', actual: 156000000, anterior: 156500000 },
      { concepto: 'Depreciación acumulada', actual: -42000000, anterior: -40800000 },
      { concepto: 'Activos intangibles', actual: 3200000, anterior: 3400000 },
    ],
  },
  pasivo: {
    corriente: [
      { concepto: 'Proveedores', actual: 15200000, anterior: 14800000 },
      { concepto: 'Acreedores diversos', actual: 5800000, anterior: 6200000 },
      { concepto: 'Préstamos corto plazo', actual: 8000000, anterior: 8000000 },
    ],
    noCorriente: [
      { concepto: 'Préstamos largo plazo', actual: 48000000, anterior: 50000000 },
      { concepto: 'Obligaciones laborales', actual: 11200000, anterior: 10900000 },
    ],
  },
  capital: [
    { concepto: 'Capital social', actual: 45000000, anterior: 45000000 },
    { concepto: 'Utilidades retenidas', actual: 38200000, anterior: 36600000 },
    { concepto: 'Resultado del ejercicio', actual: 6700000, anterior: 5800000 },
  ],
};

function sumItems(items) { return items.reduce((s, i) => s + i.actual, 0); }
function sumItemsPrior(items) { return items.reduce((s, i) => s + i.anterior, 0); }

// --- ESTADO DE RESULTADOS ---
const pnlData = {
  ingresos: [
    { concepto: 'Hospitalización', actual: 8200000, anterior: 7900000, presupuesto: 8000000 },
    { concepto: 'Cirugía', actual: 6100000, anterior: 5800000, presupuesto: 5900000 },
    { concepto: 'Consulta externa', actual: 3200000, anterior: 3100000, presupuesto: 3100000 },
    { concepto: 'Urgencias', actual: 2800000, anterior: 2600000, presupuesto: 2700000 },
    { concepto: 'Imagenología', actual: 1900000, anterior: 1800000, presupuesto: 1850000 },
    { concepto: 'Laboratorio', actual: 1500000, anterior: 1450000, presupuesto: 1480000 },
    { concepto: 'Farmacia', actual: 1200000, anterior: 1150000, presupuesto: 1180000 },
  ],
  costos: [
    { concepto: 'Personal médico', actual: 5800000, anterior: 5600000, presupuesto: 5700000 },
    { concepto: 'Personal enfermería', actual: 3400000, anterior: 3300000, presupuesto: 3350000 },
    { concepto: 'Insumos médicos', actual: 2800000, anterior: 2700000, presupuesto: 2650000 },
    { concepto: 'Medicamentos', actual: 2200000, anterior: 2100000, presupuesto: 2150000 },
    { concepto: 'Mantenimiento', actual: 950000, anterior: 920000, presupuesto: 940000 },
    { concepto: 'Servicios generales', actual: 780000, anterior: 760000, presupuesto: 770000 },
  ],
  gastosOperativos: [
    { concepto: 'Administración', actual: 2100000, anterior: 2050000, presupuesto: 2080000 },
    { concepto: 'Tecnología y sistemas', actual: 650000, anterior: 630000, presupuesto: 640000 },
    { concepto: 'Seguros', actual: 420000, anterior: 410000, presupuesto: 415000 },
    { concepto: 'Otros gastos', actual: 310000, anterior: 300000, presupuesto: 305000 },
  ],
};

// --- FLUJO DE CAJA ---
const cashFlowMonthly = [
  { mes: 'Ene', operacion: 2100000, inversion: -800000, financiamiento: -500000 },
  { mes: 'Feb', operacion: 1800000, inversion: -1200000, financiamiento: -500000 },
  { mes: 'Mar', operacion: 2400000, inversion: -600000, financiamiento: -500000 },
  { mes: 'Abr', operacion: 1900000, inversion: -400000, financiamiento: -500000 },
  { mes: 'May', operacion: 2200000, inversion: -900000, financiamiento: -500000 },
  { mes: 'Jun', operacion: 2600000, inversion: -700000, financiamiento: -500000 },
];

// --- KPIs OPERATIVOS ---
const kpiData = [
  {
    label: 'Ocupación hospitalaria',
    value: '78.4',
    unit: '%',
    prior: '76.1%',
    context: 'Meta: 80%',
    delta: 2.3,
    threshold: null,
  },
  {
    label: 'Estancia promedio',
    value: '4.2',
    unit: 'días',
    prior: '4.4 días',
    context: 'Meta: ≤4.0 días',
    delta: -0.2,
    threshold: null,
  },
  {
    label: 'Costo por cama-día',
    value: '6,850',
    unit: 'MXN',
    prior: '6,720 MXN',
    context: 'Presupuesto: 6,600',
    delta: 1.9,
    threshold: 'PRESUPUESTO',
  },
  {
    label: 'Margen operativo',
    value: '18.6',
    unit: '%',
    prior: '17.2%',
    context: 'Meta: ≥18%',
    delta: 1.4,
    threshold: null,
  },
  {
    label: 'Quirófanos utilizados',
    value: '82.5',
    unit: '%',
    prior: '80.3%',
    context: '4 de 5 activos',
    delta: 2.2,
    threshold: null,
  },
  {
    label: 'Glosa',
    value: '3.8',
    unit: '%',
    prior: '4.1%',
    context: 'Sobre facturación total',
    delta: -0.3,
    threshold: 'META ≤3%',
  },
  {
    label: 'Días de cartera vencida',
    value: '52',
    unit: 'días',
    prior: '56 días',
    context: 'Meta: ≤45 días',
    delta: -4,
    threshold: 'META',
  },
  {
    label: 'Rotación de personal',
    value: '11.2',
    unit: '%',
    prior: '12.5%',
    context: 'Sector salud: ~15%',
    delta: -1.3,
    threshold: null,
  },
];

// --- PRESUPUESTO VS REAL ---
const budgetData = [
  { departamento: 'Hospitalización', presupuesto: 8000000, real: 8200000, anterior: 7900000 },
  { departamento: 'Cirugía', presupuesto: 5900000, real: 6100000, anterior: 5800000 },
  { departamento: 'Consulta externa', presupuesto: 3100000, real: 3200000, anterior: 3100000 },
  { departamento: 'Urgencias', presupuesto: 2700000, real: 2800000, anterior: 2600000 },
  { departamento: 'Imagenología', presupuesto: 1850000, real: 1900000, anterior: 1800000 },
  { departamento: 'Laboratorio', presupuesto: 1480000, real: 1500000, anterior: 1450000 },
  { departamento: 'Farmacia', presupuesto: 1180000, real: 1200000, anterior: 1150000 },
];

const budgetCostData = [
  { departamento: 'Personal médico', presupuesto: 5700000, real: 5800000, anterior: 5600000 },
  { departamento: 'Personal enfermería', presupuesto: 3350000, real: 3400000, anterior: 3300000 },
  { departamento: 'Insumos médicos', presupuesto: 2650000, real: 2800000, anterior: 2700000 },
  { departamento: 'Medicamentos', presupuesto: 2150000, real: 2200000, anterior: 2100000 },
  { departamento: 'Mantenimiento', presupuesto: 940000, real: 950000, anterior: 920000 },
  { departamento: 'Servicios generales', presupuesto: 770000, real: 780000, anterior: 760000 },
];

// --- PROYECCIONES ---
const projectionData = {
  labels: ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  optimistic: [26500000, 27000000, 27500000, 26800000, 27200000, 28000000],
  base: [25500000, 25800000, 26000000, 25600000, 26200000, 26500000],
  pessimistic: [24000000, 23500000, 23800000, 23000000, 23200000, 22800000],
};
