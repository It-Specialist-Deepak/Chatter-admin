"use client";

import { useState } from "react";

type Pkg = { id: string; coins: number; bonus: number; price: number; tag?: string; active: boolean };
type Tier = { id: string; from: number; to: number; pct: number; active: boolean };

const initialPkgs: Pkg[] = [
  { id: "1", coins: 500, bonus: 0, price: 0.99, active: true },
  { id: "2", coins: 2500, bonus: 100, price: 4.99, tag: "Popular", active: true },
  { id: "3", coins: 5000, bonus: 500, price: 9.99, active: true },
  { id: "4", coins: 25000, bonus: 3000, price: 49.99, tag: "Best value", active: true },
  { id: "5", coins: 100000, bonus: 15000, price: 199.99, active: false },
];

const initialTiers: Tier[] = [
  { id: "1", from: 1000, to: 4999, pct: 5, active: true },
  { id: "2", from: 5000, to: 24999, pct: 8, active: true },
  { id: "3", from: 25000, to: 99999, pct: 12, active: true },
  { id: "4", from: 100000, to: 500000, pct: 15, active: true },
];

const payrollCycles = ["Weekly", "Bi-weekly", "Monthly", "Per agency"];
const payrollRules = [
  { id: "min", title: "Minimum payout", desc: "Hosts need at least 10,000 diamonds" },
  { id: "kyc", title: "KYC required", desc: "Verified identity before payout" },
  { id: "hold", title: "Hold for review", desc: "Delay first payout by 7 days" },
];

const levels = [
  { lv: "Lv 1", xp: "0", share: "0%", color: "#D5D8E0" },
  { lv: "Lv 5", xp: "5,000", share: "5%", color: "#C7D6F5" },
  { lv: "Lv 10", xp: "25,000", share: "8%", color: "#F5D48A" },
  { lv: "Lv 20", xp: "100,000", share: "12%", color: "#DCCBFF" },
];

const fmt = (n: number) => n.toLocaleString("en-US");

const card = "rounded-2xl border border-[#12131A]/8 bg-white p-5";
const ghost = "rounded-lg border border-[#12131A]/8 bg-white px-3 py-1.5 text-[11px] font-semibold";

function CardHead({ title, sub, action }: { title: string; sub: string; action: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-[13px] font-semibold">{title}</h2>
        <p className="mt-0.5 text-[10.5px] text-[#12131A]/50">{sub}</p>
      </div>
      {action}
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-[#1A7F45]" : "bg-[#12131A]/20"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-0.5"}`}
      />
    </button>
  );
}

export default function FinanceView() {
  const [pkgs, setPkgs] = useState(initialPkgs);
  const [tiers, setTiers] = useState(initialTiers);
  const [cycle, setCycle] = useState("Weekly");
  const [rules, setRules] = useState<Record<string, boolean>>({ min: true, kyc: true, hold: false });
  const [range, setRange] = useState("Last 30 days");
  const [currency, setCurrency] = useState("USD");

  const addPackage = () =>
    setPkgs((p) => [
      ...p,
      { id: String(Date.now()), coins: 1000, bonus: 0, price: 1.99, active: false },
    ]);

  const update = (id: string, patch: Partial<Pkg>) =>
    setPkgs((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const stats = [
    { label: "Coin balance", value: "348,920.50", sub: "Total coins in circulation" },
    { label: "Revenue", value: "—", sub: "Connect payments to see data" },
    { label: "Payouts", value: "—", sub: "Pending and paid cashouts" },
    { label: "Active buyers", value: "—", sub: "Users who bought coins" },
  ];

  return (
    <>
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-[22px] font-semibold leading-tight">Finance &amp; packages</h1>
          <p className="mt-0.5 text-xs text-[#12131A]/55">
            Coin packages, bonus rules, payroll settings and level thresholds.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs font-semibold outline-none"
          >
            {["Last 7 days", "Last 30 days", "Last 90 days"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs font-semibold outline-none"
          >
            {["USD", "AED", "INR"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <button className="rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs font-semibold">
            Export report
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[#12131A]/8 bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#12131A]/55">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{s.value}</p>
            <p className="mt-2 text-[10.5px] text-[#12131A]/45">{s.sub}</p>
          </div>
        ))}
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* Packages */}
        <div className={card}>
          <CardHead
            title="Coin top-up packages"
            sub={`${pkgs.filter((p) => p.active).length} active · prices in ${currency}`}
            action={
              <button
                onClick={addPackage}
                className="shrink-0 rounded-lg bg-[#6C4DF5] px-3 py-2 text-[11px] font-semibold text-white"
              >
                + New package
              </button>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] text-left text-[12px]">
              <thead>
                <tr className="text-[9px] uppercase tracking-[0.06em] text-[#12131A]/45">
                  <th className="pb-2 font-semibold">Coins</th>
                  <th className="pb-2 font-semibold">Bonus</th>
                  <th className="pb-2 font-semibold">Price</th>
                  <th className="pb-2 font-semibold">Tag</th>
                  <th className="pb-2 font-semibold">Active</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#12131A]/6">
                {pkgs.map((p) => (
                  <tr key={p.id} className={p.active ? "" : "opacity-60"}>
                    <td className="py-2.5">
                      <span className="flex items-center gap-2 font-semibold">
                        <span className="h-3.5 w-3.5 rounded-full bg-[#F5A524]" />
                        {fmt(p.coins)}
                      </span>
                    </td>
                    <td className="py-2.5">
                      {p.bonus ? (
                        <span className="rounded bg-[#FFF1D6] px-1.5 py-0.5 text-[10px] font-bold text-[#B45F06]">
                          +{fmt(p.bonus)}
                        </span>
                      ) : (
                        <span className="text-[#12131A]/35">—</span>
                      )}
                    </td>
                    <td className="py-2.5 font-semibold tabular-nums">{p.price.toFixed(2)}</td>
                    <td className="py-2.5 text-[11px] text-[#4338CA]">{p.tag ?? "—"}</td>
                    <td className="py-2.5">
                      <Toggle
                        on={p.active}
                        onChange={() => update(p.id, { active: !p.active })}
                        label={`Toggle ${fmt(p.coins)} coin package`}
                      />
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => setPkgs((all) => all.filter((x) => x.id !== p.id))}
                        className={ghost}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bonus tiers */}
        <div className={`${card} self-start`}>
          <CardHead
            title="Bonus coin tiers"
            sub="Extra coins by purchase amount"
            action={
              <button
                onClick={() =>
                  setTiers((t) => [...t, { id: String(Date.now()), from: 0, to: 0, pct: 0, active: false }])
                }
                className={ghost}
              >
                Add
              </button>
            }
          />
          <ul className="divide-y divide-[#12131A]/6">
            {tiers.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <span className="min-w-0 flex-1 truncate text-[12px] font-semibold">
                  {fmt(t.from)} – {fmt(t.to)} coins
                </span>
                <span className="rounded bg-[#DDF5E6] px-2 py-1 text-[10px] font-bold text-[#1A7F45]">
                  +{t.pct}%
                </span>
                <Toggle
                  on={t.active}
                  onChange={() =>
                    setTiers((all) => all.map((x) => (x.id === t.id ? { ...x, active: !x.active } : x)))
                  }
                  label={`Toggle tier ${fmt(t.from)} to ${fmt(t.to)}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Payroll */}
        <div className={card}>
          <CardHead
            title="Payroll rules"
            sub="How and when hosts and agencies are paid"
            action={null}
          />
          <div className="flex flex-wrap gap-2">
            {payrollCycles.map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                  cycle === c
                    ? "border-[#6C4DF5] bg-[#6C4DF5] text-white"
                    : "border-[#12131A]/10 bg-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.08em] text-[#12131A]/50">
            Conditions
          </p>
          <ul className="mt-1 divide-y divide-[#12131A]/6">
            {payrollRules.map((r) => (
              <li key={r.id}>
                <label className="flex cursor-pointer items-center gap-3 py-2.5">
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block text-[12px] font-semibold">{r.title}</span>
                    <span className="mt-0.5 block text-[10.5px] text-[#12131A]/50">{r.desc}</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={rules[r.id]}
                    onChange={() => setRules((s) => ({ ...s, [r.id]: !s[r.id] }))}
                    className="h-4 w-4 cursor-pointer accent-[#6C4DF5]"
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Level thresholds */}
        <div className={`${card} self-start`}>
          <CardHead
            title="Level thresholds"
            sub="XP needed per level and revenue share"
            action={<button className={ghost}>Edit</button>}
          />
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="text-[9px] uppercase tracking-[0.06em] text-[#12131A]/45">
                <th className="pb-2 font-semibold">Level</th>
                <th className="pb-2 font-semibold">XP</th>
                <th className="pb-2 font-semibold">Share</th>
                <th className="pb-2 text-right font-semibold">Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#12131A]/6">
              {levels.map((l) => (
                <tr key={l.lv}>
                  <td className="py-2.5 font-semibold">{l.lv}</td>
                  <td className="py-2.5 tabular-nums">{l.xp}</td>
                  <td className="py-2.5">{l.share}</td>
                  <td className="py-2.5 text-right">
                    <span className="inline-block h-5 w-5 rounded-md" style={{ background: l.color }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
