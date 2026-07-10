"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CreditCard,
  LogOut,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  ChevronDown,
  Activity,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Filter,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

type Payment = {
  id: number;
  order_id: number;
  user_name: string;
  user_email: string;
  service_name: string;
  qty: number | string;
  total: number | string;
  paypal_order_id: string;
  created_at: string;
};

type MonthlyData = {
  month: string;
  monthNum: number;
  year: number;
  revenue: number;
  orders: number;
  paid: number;
  unpaid: number;
  aov: number;
};

type YearlyData = {
  year: number;
  totalRevenue: number;
  totalOrders: number;
  paidOrders: number;
  unpaidOrders: number;
  growth: number;
  aov: number;
};

type ServiceStats = {
  name: string;
  revenue: number;
  orders: number;
  quantity: number;
};

export default function AdminSalesGrowth() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<"revenue" | "orders">("revenue");
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dateRange, setDateRange] = useState<"all" | "ytd" | "last12">("all");
  const [currentDate, setCurrentDate] = useState("");
  
  // Processed data states
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  const [serviceStats, setServiceStats] = useState<ServiceStats[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  // Set current date on client side only
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  // 🔐 Check Admin Auth
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/admin/check");
      const data = await res.json();
      if (!data.loggedIn) router.push("/admin");
    };
    checkAuth();
  }, [router]);

  // 📊 Fetch and Process Payments Data
  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/payments");
        const data = await res.json();
        
        if (data.success) {
          setPayments(data.payments);
          processPaymentsData(data.payments);
        }
      } catch (err) {
        console.error("Error fetching payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  // Reprocess when year changes
  useEffect(() => {
    if (payments.length > 0) {
      processPaymentsData(payments);
    }
  }, [selectedYear, dateRange]);

  const parseValue = (value: number | string) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const normalized = value.replace(/[^0-9.-]+/g, '');
      return Number(normalized) || 0;
    }
    return 0;
  };

  const processPaymentsData = (paymentsData: Payment[]) => {
    // Filter payments based on selected date range
    let filteredPayments = [...paymentsData];
    const now = new Date();
    
    if (dateRange === "ytd") {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      filteredPayments = paymentsData.filter(p => new Date(p.created_at) >= startOfYear);
    } else if (dateRange === "last12") {
      const twelveMonthsAgo = new Date(now.setMonth(now.getMonth() - 12));
      filteredPayments = paymentsData.filter(p => new Date(p.created_at) >= twelveMonthsAgo);
    }

    // Process monthly data
    const monthlyMap = new Map<string, MonthlyData>();
    const yearlyMap = new Map<number, YearlyData>();
    const serviceMap = new Map<string, ServiceStats>();

    filteredPayments.forEach(payment => {
      const date = new Date(payment.created_at);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'short' });
      const monthNum = date.getMonth();
      const key = `${year}-${month}`;
      const isPaid = !payment.paypal_order_id.toLowerCase().startsWith("paylater");
      const paymentTotal = parseValue(payment.total);
      const paymentQty = parseValue(payment.qty);

      // Monthly stats
      if (!monthlyMap.has(key)) {
        monthlyMap.set(key, {
          month,
          monthNum,
          year,
          revenue: 0,
          orders: 0,
          paid: 0,
          unpaid: 0,
          aov: 0
        });
      }
      
      const monthData = monthlyMap.get(key)!;
      monthData.revenue += paymentTotal;
      monthData.orders += 1;
      if (isPaid) {
        monthData.paid += 1;
      } else {
        monthData.unpaid += 1;
      }
      monthData.aov = monthData.revenue / monthData.orders;

      // Yearly stats
      if (!yearlyMap.has(year)) {
        yearlyMap.set(year, {
          year,
          totalRevenue: 0,
          totalOrders: 0,
          paidOrders: 0,
          unpaidOrders: 0,
          growth: 0,
          aov: 0
        });
      }

      const yearData = yearlyMap.get(year)!;
      yearData.totalRevenue += paymentTotal;
      yearData.totalOrders += 1;
      if (isPaid) {
        yearData.paidOrders += 1;
      } else {
        yearData.unpaidOrders += 1;
      }
      yearData.aov = yearData.totalRevenue / yearData.totalOrders;

      // Service stats
      if (!serviceMap.has(payment.service_name)) {
        serviceMap.set(payment.service_name, {
          name: payment.service_name,
          revenue: 0,
          orders: 0,
          quantity: 0
        });
      }

      const service = serviceMap.get(payment.service_name)!;
      service.revenue += paymentTotal;
      service.orders += 1;
      service.quantity += paymentQty;
    });

    // Convert maps to arrays and sort
    let monthlyArray = Array.from(monthlyMap.values());
    monthlyArray.sort((a, b) => a.year - b.year || a.monthNum - b.monthNum);
    
    // Filter by selected year
    if (selectedYear) {
      monthlyArray = monthlyArray.filter(m => m.year === selectedYear);
    }
    
    setMonthlyData(monthlyArray);

    // Process yearly data with growth rates
    const yearlyArray = Array.from(yearlyMap.values());
    yearlyArray.sort((a, b) => b.year - a.year);
    
    // Calculate year-over-year growth
    const yearlyWithGrowth = yearlyArray.map((year, index) => {
      const prevYear = yearlyArray[index + 1];
      if (prevYear) {
        year.growth = ((year.totalRevenue - prevYear.totalRevenue) / prevYear.totalRevenue) * 100;
      } else {
        year.growth = 0;
      }
      return year;
    });
    
    setYearlyData(yearlyWithGrowth);
    setAvailableYears(yearlyArray.map(y => y.year).sort((a, b) => b - a));

    // Process top services
    const serviceArray = Array.from(serviceMap.values());
    serviceArray.sort((a, b) => b.revenue - a.revenue);
    setServiceStats(serviceArray.slice(0, 5));
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout");
      router.push("/admin");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Try again.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Calculate current metrics
  const currentYearData = yearlyData.find(y => y.year === selectedYear) || {
    totalRevenue: 0,
    totalOrders: 0,
    paidOrders: 0,
    unpaidOrders: 0,
    aov: 0
  };

  const uniqueOrders = new Map<number, number>();
  payments.forEach((p) => {
    if (!uniqueOrders.has(p.order_id)) {
      uniqueOrders.set(p.order_id, parseValue(p.total));
    }
  });

  const totalRevenue = Array.from(uniqueOrders.values()).reduce(
    (sum, total) => sum + total,
    0
  );

  const totalOrders = monthlyData.reduce((sum, month) => sum + month.orders, 0);
  const totalPaid = monthlyData.reduce((sum, month) => sum + month.paid, 0);
  const totalUnpaid = monthlyData.reduce((sum, month) => sum + month.unpaid, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Calculate growth
  const calculateMonthlyGrowth = () => {
    if (monthlyData.length < 2) return 0;
    const lastMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];
    return ((lastMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100);
  };
  const monthlyGrowth = calculateMonthlyGrowth();

  // Get previous year data for comparison
  const previousYear = yearlyData.find(y => y.year === selectedYear - 1);
  const yearlyGrowth = previousYear 
    ? ((currentYearData.totalRevenue - previousYear.totalRevenue) / previousYear.totalRevenue * 100)
    : 0;

  // Get quarterly data
  const getQuarterlyData = () => {
    const quarters = [
      { name: 'Q1', months: [0, 1, 2] },
      { name: 'Q2', months: [3, 4, 5] },
      { name: 'Q3', months: [6, 7, 8] },
      { name: 'Q4', months: [9, 10, 11] }
    ];

    return quarters.map(quarter => {
      const quarterMonths = monthlyData.filter(m => 
        quarter.months.includes(m.monthNum) && m.year === selectedYear
      );
      
      return {
        name: quarter.name,
        revenue: quarterMonths.reduce((sum, m) => sum + m.revenue, 0),
        orders: quarterMonths.reduce((sum, m) => sum + m.orders, 0),
        paid: quarterMonths.reduce((sum, m) => sum + m.paid, 0),
        unpaid: quarterMonths.reduce((sum, m) => sum + m.unpaid, 0)
      };
    });
  };

  const quarterlyData = getQuarterlyData();

  // Simple bar chart visualization
  const BarChart = ({ data, dataKey, color }: any) => {
    const maxValue = Math.max(...data.map((d: any) => d[dataKey]), 1);
    
    return (
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 flex items-end justify-around px-2">
          {data.map((item: any, i: number) => {
            const height = (item[dataKey] / maxValue) * 200;
            return (
              <div key={i} className="flex flex-col items-center w-16 group">
                <div className="relative">
                  <div 
                    className={`w-10 bg-gradient-to-t ${color} rounded-t-lg transition-all duration-300 group-hover:opacity-90`}
                    style={{ height: `${Math.max(height, 4)}px` }}
                  >
                    <div className="invisible group-hover:visible absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      {dataKey === 'revenue' ? formatCurrency(item[dataKey]) : formatNumber(item[dataKey])}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{item.month || item.name}</span>
              </div>
            );
          })}
        </div>
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-4">
          {[4, 3, 2, 1, 0].map((val, i) => (
            <div key={i} className="border-b border-gray-200 w-full h-0 relative">
              <span className="absolute -left-8 -top-2 text-xs text-gray-400">
                {dataKey === 'revenue' ? formatCurrency(maxValue * (val/4)) : Math.round(maxValue * (val/4))}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Donut chart visualization
  const DonutChart = ({ paid, unpaid }: any) => {
    const total = paid + unpaid;
    const paidPercentage = total > 0 ? (paid / total) * 100 : 0;
    const unpaidPercentage = total > 0 ? (unpaid / total) * 100 : 0;

    return (
      <div className="flex items-center justify-center p-4">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="transform -rotate-90 w-40 h-40">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="15"
            />
            {paid > 0 && (
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10B981"
                strokeWidth="15"
                strokeDasharray={`${paidPercentage * 2.51} 251`}
                strokeLinecap="round"
              />
            )}
            {unpaid > 0 && (
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="15"
                strokeDasharray={`${unpaidPercentage * 2.51} 251`}
                strokeDashoffset={-paidPercentage * 2.51}
                strokeLinecap="round"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-bold text-gray-800">{total}</span>
            <span className="text-xs text-gray-500">Total Orders</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_32%), ${isFullscreen ? 'overflow-hidden' : ''}`}>
      {/* <main className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all ${isFullscreen ? 'max-w-full' : ''}`}> */}
        <div className="mb-6 rounded-[28px] border border-slate-200/60 bg-white p-6 text-slate-800 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-red-600">
                Admin analytics
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">Sales growth overview</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-200">
                Track revenue momentum, order volume, and service performance across your selected period.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Transactions</p>
                <p className="mt-1 text-lg font-semibold">{payments.length}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Updated</p>
                <p className="mt-1 text-lg font-semibold">{currentDate || 'Today'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as 'all' | 'ytd' | 'last12')}
                  className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="all">All Time</option>
                  <option value="ytd">Year to Date</option>
                  <option value="last12">Last 12 Months</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>

              {availableYears.length > 0 && (
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              )}

              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                {(['monthly', 'quarterly', 'yearly'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      timeframe === tf
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    {tf.charAt(0).toUpperCase() + tf.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => processPaymentsData(payments)}
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-white py-24 shadow-sm">
            <RefreshCw className="mb-4 h-8 w-8 animate-spin text-red-600" />
            <p className="text-slate-500">Processing sales data...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1 text-sm text-slate-500">Total Revenue</p>
                    <p className="text-2xl font-semibold text-slate-900">{formatCurrency(totalRevenue)}</p>
                    <div className="mt-3 flex items-center gap-1 text-sm">
                      <span className={`flex items-center ${monthlyGrowth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {monthlyGrowth >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                        {Math.abs(monthlyGrowth).toFixed(1)}%
                      </span>
                      <span className="text-slate-500">vs last month</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-red-100 p-3 text-red-600">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1 text-sm text-slate-500">Total Orders</p>
                    <p className="text-2xl font-semibold text-slate-900">{formatNumber(totalOrders)}</p>
                    <p className="mt-3 text-sm text-slate-500">
                      {monthlyData.length > 0 ? `Avg. ${formatNumber(Math.round(totalOrders / monthlyData.length))} per month` : 'No data'}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-red-50 p-3 text-red-600">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1 text-sm text-slate-500">Average Order Value</p>
                    <p className="text-2xl font-semibold text-slate-900">{formatCurrency(averageOrderValue)}</p>
                    <p className="mt-3 text-sm text-slate-500">{totalOrders} total orders</p>
                  </div>
                  <div className="rounded-2xl bg-red-50 p-3 text-red-600">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1 text-sm text-slate-500">Yearly Growth</p>
                    <p className="text-2xl font-semibold text-slate-900">{yearlyGrowth ? `${yearlyGrowth.toFixed(1)}%` : '0%'}</p>
                    <p className="mt-3 text-sm text-slate-500">{selectedYear} vs {selectedYear - 1}</p>
                  </div>
                  <div className="rounded-2xl bg-red-50 p-3 text-red-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            {timeframe === 'monthly' && (
              <div className="mb-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
                <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-red-50 p-2 text-red-600">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">Monthly revenue</h2>
                        <p className="text-sm text-slate-500">{selectedYear} • {monthlyData.length} months of data</p>
                      </div>
                    </div>

                    <div className="flex rounded-xl bg-slate-100 p-1">
                      <button
                        onClick={() => setViewMode('revenue')}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                          viewMode === 'revenue' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        Revenue
                      </button>
                      <button
                        onClick={() => setViewMode('orders')}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                          viewMode === 'orders' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        Orders
                      </button>
                    </div>
                  </div>

                  {monthlyData.length > 0 ? (
                    <BarChart
                      data={monthlyData}
                      dataKey={viewMode === 'revenue' ? 'revenue' : 'orders'}
                      color={viewMode === 'revenue' ? 'from-red-400 to-red-600' : 'from-red-200 to-red-400'}
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-2xl bg-slate-50 text-slate-500">
                      No data available for {selectedYear}
                    </div>
                  )}
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
                      <PieChart className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Payment split</h2>
                      <p className="text-sm text-slate-500">Paid vs pay later</p>
                    </div>
                  </div>

                  <DonutChart paid={totalPaid} unpaid={totalUnpaid} />

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                        <span className="text-sm text-slate-600">Paid Orders</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-slate-900">{formatNumber(totalPaid)}</span>
                        <span className="text-sm text-slate-500">
                          {totalOrders > 0 ? ((totalPaid / totalOrders) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm text-slate-600">Pay Later</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-slate-900">{formatNumber(totalUnpaid)}</span>
                        <span className="text-sm text-slate-500">
                          {totalOrders > 0 ? ((totalUnpaid / totalOrders) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {timeframe === 'quarterly' && (
              <div className="mb-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
                <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-xl bg-red-50 p-2 text-red-600">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Quarterly performance</h2>
                      <p className="text-sm text-slate-500">{selectedYear} • Quarterly breakdown</p>
                    </div>
                  </div>

                  <BarChart data={quarterlyData} dataKey="revenue" color="from-red-400 to-red-600" />

                  <div className="mt-6 grid gap-2 sm:grid-cols-4">
                    {quarterlyData.map((q) => (
                      <div key={q.name} className="rounded-2xl bg-slate-50 p-3 text-center">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{q.name}</p>
                        <p className="mt-1 font-semibold text-slate-900">{formatCurrency(q.revenue)}</p>
                        <p className="text-xs text-slate-500">{q.orders} orders</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-red-50 p-2 text-red-600">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Quarterly summary</h2>
                      <p className="text-sm text-slate-500">Best performing quarter</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {quarterlyData
                      .sort((a, b) => b.revenue - a.revenue)
                      .map((q, index) => (
                        <div key={q.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${index === 0 ? 'bg-red-50 text-red-800' : 'bg-slate-200 text-slate-700'}`}>
                              #{index + 1}
                            </span>
                            <span className="font-medium text-slate-800">{q.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">{formatCurrency(q.revenue)}</p>
                            <p className="text-xs text-slate-500">{q.orders} orders</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {timeframe === 'yearly' && (
              <div className="mb-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
                <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-red-50 p-2 text-red-600">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Year-over-year growth</h2>
                      <p className="text-sm text-slate-500">Annual revenue comparison</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {yearlyData.slice(0, 5).map((year, index) => (
                      <div key={year.year} className="rounded-2xl border border-slate-100 p-3 transition hover:bg-slate-50">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-slate-900">{year.year}</span>
                            {index === 0 && (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                                Current
                              </span>
                            )}
                          </div>
                          <span className={`text-sm font-medium ${year.growth > 0 ? 'text-emerald-600' : year.growth < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                            {year.growth > 0 ? '+' : ''}{year.growth.toFixed(1)}%
                          </span>
                        </div>
                        <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                          <span>{formatCurrency(year.totalRevenue)}</span>
                          <span>{formatNumber(year.totalOrders)} orders</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-red-600 transition-all duration-500"
                            style={{ width: `${(year.totalRevenue / yearlyData[0]?.totalRevenue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-red-50 p-2 text-red-600">
                      <Activity className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Annual metrics</h2>
                      <p className="text-sm text-slate-500">Key performance indicators</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="mb-1 text-sm text-slate-500">Best year</p>
                      <p className="text-xl font-semibold text-slate-900">
                        {yearlyData.length > 0
                          ? [...yearlyData].sort((a, b) => b.totalRevenue - a.totalRevenue)[0]?.year
                          : 'N/A'}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {yearlyData.length > 0 ? formatCurrency(Math.max(...yearlyData.map((y) => y.totalRevenue))) : '$0'}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="mb-1 text-sm text-slate-500">Average annual revenue</p>
                      <p className="text-xl font-semibold text-slate-900">
                        {yearlyData.length > 0
                          ? formatCurrency(yearlyData.reduce((sum, y) => sum + y.totalRevenue, 0) / yearlyData.length)
                          : '$0'}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="mb-1 text-sm text-slate-500">Total orders (all time)</p>
                      <p className="text-xl font-semibold text-slate-900">
                        {formatNumber(yearlyData.reduce((sum, y) => sum + y.totalOrders, 0))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-red-50 p-2 text-red-600">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">Top services by revenue</h2>
                  </div>
                  <span className="text-sm text-slate-500">{selectedYear} • {serviceStats.length} services</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Service</th>
                        <th className="pb-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Revenue</th>
                        <th className="pb-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Orders</th>
                        <th className="pb-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Qty</th>
                        <th className="pb-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Share</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {serviceStats.map((service, index) => {
                        const share = (service.revenue / totalRevenue) * 100;
                        return (
                          <tr key={service.name} className="transition hover:bg-slate-50">
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${index === 0 ? 'bg-red-50 text-red-800' : index === 1 ? 'bg-slate-100 text-slate-700' : index === 2 ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-600'}`}>
                                  #{index + 1}
                                </span>
                                <span className="font-medium text-slate-800">{service.name}</span>
                              </div>
                            </td>
                            <td className="py-3 text-right font-semibold text-slate-900">{formatCurrency(service.revenue)}</td>
                            <td className="py-3 text-right text-slate-600">{formatNumber(service.orders)}</td>
                            <td className="py-3 text-right text-slate-600">{formatNumber(service.quantity)}</td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <div className="h-1.5 w-16 rounded-full bg-slate-200">
                                  <div className="h-1.5 rounded-full bg-red-600" style={{ width: `${Math.min(share, 100)}%` }}></div>
                                </div>
                                <span className="text-sm text-slate-500">{share.toFixed(1)}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">Monthly summary</h2>
                  </div>
                  <span className="text-sm text-slate-500">{selectedYear}</span>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  <table className="min-w-full">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-slate-200">
                        <th className="pb-2 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Month</th>
                        <th className="pb-2 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Revenue</th>
                        <th className="pb-2 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Orders</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {monthlyData.map((month) => {
                        const growth = monthlyData.find((m) => m.monthNum === month.monthNum - 1 && m.year === month.year);
                        const growthRate = growth ? ((month.revenue - growth.revenue) / growth.revenue) * 100 : 0;

                        return (
                          <tr key={`${month.year}-${month.month}`} className="transition hover:bg-slate-50">
                            <td className="py-2 text-sm font-medium text-slate-800">{month.month}</td>
                            <td className="py-2 text-right text-sm text-slate-800">{formatCurrency(month.revenue)}</td>
                            <td className="py-2 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-sm text-slate-600">{month.orders}</span>
                                {growthRate !== 0 && (
                                  <span className={`flex items-center text-xs ${growthRate > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {growthRate > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {Math.abs(growthRate).toFixed(0)}%
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="sticky bottom-0 border-t border-slate-200 bg-slate-50">
                      <tr>
                        <td className="pt-3 text-sm font-semibold text-slate-900">Total</td>
                        <td className="pt-3 text-right text-sm font-semibold text-slate-900">{formatCurrency(totalRevenue)}</td>
                        <td className="pt-3 text-right text-sm font-semibold text-slate-900">{formatNumber(totalOrders)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {timeframe === 'yearly' && (
              <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl bg-red-50 p-2 text-red-600">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                  <h2 className="text-lg font-semibold text-slate-900">Annual performance history</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Year</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Revenue</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Orders</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Paid</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Pay Later</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">AOV</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Growth</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {yearlyData.map((year) => (
                        <tr key={year.year} className="transition hover:bg-slate-50">
                          <td className="px-4 py-3 font-semibold text-slate-900">{year.year}</td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-900">{formatCurrency(year.totalRevenue)}</td>
                          <td className="px-4 py-3 text-right text-slate-600">{formatNumber(year.totalOrders)}</td>
                          <td className="px-4 py-3 text-right text-slate-600">{formatNumber(year.paidOrders)}</td>
                          <td className="px-4 py-3 text-right text-slate-600">{formatNumber(year.unpaidOrders)}</td>
                          <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(year.aov)}</td>
                          <td className="px-4 py-3 text-right">
                            <span className={`inline-flex items-center gap-1 text-sm font-medium ${year.growth > 0 ? 'text-emerald-600' : year.growth < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                              {year.growth > 0 && '+'}
                              {year.growth.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      {/* </main> */}
    </div>
  );
}