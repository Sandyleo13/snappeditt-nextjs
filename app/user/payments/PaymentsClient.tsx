"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, CheckCircle2, Clock, Wallet, ChevronRight } from "lucide-react";
import TabNav from "../orders/TabNav";

type Payment = {
  id: number;
  order_id: number;
  total: number;
  paypal_order_id: string | null;
  created_at: string;
  service_name: string | null;
};

type Filter = "all" | "paid" | "paylater";

type Props = {
  payments: Payment[];
  totalPaid: number;
  totalPending: number;
};

export default function PaymentsClient({ payments, totalPaid, totalPending }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = payments.filter((p) => {
    const isPaylater = p.paypal_order_id?.startsWith("PAYLATER-");
    if (filter === "paid")     return !isPaylater;
    if (filter === "paylater") return isPaylater;
    return true;
  });

  const filterBtns: { key: Filter; label: string }[] = [
    { key: "all",      label: "All" },
    { key: "paid",     label: "Paid" },
    { key: "paylater", label: "Pay Later" },
  ];

  return (
    <div className="space-y-6">
      {/* Header + tab nav */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of all your payment transactions.
          </p>
        </div>
        <TabNav />
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={<Wallet className="h-5 w-5 text-blue-500" />}
          iconBg="bg-blue-50"
          label="Total Transactions"
          value={payments.length}
        />
        <SummaryCard
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
          iconBg="bg-emerald-50"
          label="Total Paid"
          value={`$${totalPaid.toFixed(2)}`}
          valueColor="text-emerald-600"
        />
        <SummaryCard
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          iconBg="bg-amber-50"
          label="Pay Later Balance"
          value={`$${totalPending.toFixed(2)}`}
          valueColor="text-amber-500"
        />
      </div>

      {/* Transaction list with filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        {/* Title + filter pills */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Transaction History</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {filtered.length} of {payments.length} transactions
            </p>
          </div>

          <div className="flex items-center gap-2">
            {filterBtns.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  filter === btn.key
                    ? btn.key === "paid"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : btn.key === "paylater"
                      ? "bg-amber-400 text-white shadow-sm"
                      : "bg-[#E53E3E] text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-10 text-center text-sm text-slate-500">
            No {filter === "all" ? "" : filter === "paid" ? "paid" : "pay later"} transactions found.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((payment) => {
              const isPaylater = payment.paypal_order_id?.startsWith("PAYLATER-");
              return (
                <Link
                  key={payment.id}
                  href={`/user/orders/${payment.order_id}`}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 transition hover:border-slate-200 hover:bg-white hover:shadow-sm"
                >
                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                      isPaylater ? "bg-amber-50" : "bg-emerald-50"
                    }`}
                  >
                    <CreditCard
                      className={`h-5 w-5 ${
                        isPaylater ? "text-amber-500" : "text-emerald-500"
                      }`}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      Order #{payment.order_id}
                    </p>
                    {payment.service_name && (
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {payment.service_name}
                      </p>
                    )}
                    <p className="text-xs text-slate-400">
                      {new Date(payment.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Amount + badge */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-slate-900">
                      ${Number(payment.total || 0).toFixed(2)}
                    </p>
                    <span
                      className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        isPaylater
                          ? "bg-amber-100 text-amber-600"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {isPaylater ? "Pay Later" : "Paid"}
                    </span>
                  </div>

                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-300" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  iconBg,
  label,
  value,
  valueColor = "text-slate-900",
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
  valueColor?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
