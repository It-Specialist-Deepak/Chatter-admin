"use client";

import { useState } from "react";

type Setting = { key: string; label: string; unit: string; help: string; value: string };

const defaults: Setting[] = [
  { key: "hold", label: "Payout hold", unit: "days", value: "7", help: "Days before earnings can be cashed out" },
  { key: "fee", label: "Platform fee", unit: "%", value: "30", help: "Share kept by Chatter on gifts" },
  { key: "agency", label: "Agency commission", unit: "%", value: "10", help: "Paid to the agency of a host" },
  { key: "bd", label: "BD commission", unit: "%", value: "4", help: "Paid to the BD of an agency" },
  { key: "referral", label: "Referral bonus", unit: "%", value: "3", help: "Applied to referred users' top-ups" },
  { key: "cashout", label: "Minimum cashout", unit: "coins", value: "10000", help: "Smallest amount a host can request" },
];

type Tone = "red" | "blue" | "amber" | "green";
type Kind = "Bans" | "Permissions" | "Role approvals" | "Packages" | "Config";

type Entry = {
  at: string;
  action: string;
  tone: Tone;
  kind: Kind;
  target: string;
  details: string;
  by: string;
};

const log: Entry[] = [
  { at: "2 Nov 2026 · 10:42", action: "Ban", tone: "red", kind: "Bans", target: "UID 8412300", details: "Violation of community rules, until 30 Nov 2026", by: "admin.sara" },
  { at: "2 Nov 2026 · 10:18", action: "Takedown", tone: "red", kind: "Bans", target: "Room “Free coins 24/7”", details: "Promoted a prohibited scheme", by: "admin.omar" },
  { at: "2 Nov 2026 · 09:55", action: "Role", tone: "blue", kind: "Permissions", target: "UID 30291", details: "UID 30291 → HOST (Level 1) granted", by: "admin.sara" },
  { at: "2 Nov 2026 · 09:30", action: "Package", tone: "amber", kind: "Packages", target: "Coin package", details: "Created 5,000 + 500 bonus", by: "admin.lina" },
  { at: "2 Nov 2026 · 09:12", action: "Approve", tone: "green", kind: "Role approvals", target: "UID 30112", details: "Approved host application", by: "admin.omar" },
  { at: "2 Nov 2026 · 08:47", action: "Approved", tone: "green", kind: "Role approvals", target: "Application · HOST", details: "Verified ID documents and audio checks", by: "admin.sara" },
  { at: "1 Nov 2026 · 22:05", action: "Config", tone: "amber", kind: "Config", target: "Platform config", details: "Host share changed 60% → 65%", by: "admin.lina" },
  { at: "1 Nov 2026 · 21:40", action: "Rejected", tone: "red", kind: "Role approvals", target: "Application · AGENCY", details: "Incomplete verification details", by: "admin.omar" },
  { at: "1 Nov 2026 · 20:16", action: "Package", tone: "amber", kind: "Packages", target: "Bonus coin tiers", details: "25,000 – 99,999 coins bonus 8% → 12%", by: "admin.lina" },
  { at: "1 Nov 2026 · 19:02", action: "Ban", tone: "red", kind: "Bans", target: "UID 8279304", details: "Spamming in rooms, permanent", by: "admin.sara" },
];

const filters = ["All", "Bans", "Permissions", "Role approvals", "Packages", "Config"] as const;

const tone: Record<Tone, string> = {
  red: "bg-[#FDE8E8] text-[#B42318]",
  blue: "bg-[#E8E9FF] text-[#4338CA]",
  amber: "bg-[#FFF1D6] text-[#B45F06]",
  green: "bg-[#DDF5E6] text-[#1A7F45]",
};

export default function SettingsView() {
  const [saved, setSaved] = useState(defaults);
  const [draft, setDraft] = useState(defaults);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [toast, setToast] = useState(false);

  const dirty = draft.some((d, i) => d.value !== saved[i].value);
  const rows = log.filter((e) => filter === "All" || e.kind === filter);

  const save = () => {
    setSaved(draft);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <>
      <header>
        <h1 className="text-[22px] font-semibold leading-tight">Config &amp; audit log</h1>
        <p className="mt-0.5 text-xs text-[#12131A]/55">
          Platform-wide rates and rules, plus a record of every privileged action taken by moderators.
        </p>
      </header>

      {/* Rates */}
      <section className="mt-4 rounded-2xl border border-[#12131A]/8 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-[13px] font-semibold">Fees &amp; margins</h2>
            <p className="mt-0.5 text-[10.5px] text-[#12131A]/50">
              Changes apply to new transactions only and are recorded in the audit log.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setDraft(saved)}
              disabled={!dirty}
              className="rounded-lg border border-[#12131A]/8 bg-white px-3.5 py-2 text-[12px] font-semibold disabled:opacity-40"
            >
              Reset
            </button>
            <button
              onClick={save}
              disabled={!dirty}
              className="rounded-lg bg-[#6C4DF5] px-3.5 py-2 text-[12px] font-semibold text-white disabled:opacity-50"
            >
              Save rules
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 min-[520px]:grid-cols-2 xl:grid-cols-4">
          {draft.map((s, i) => (
            <label key={s.key} className="block">
              <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.08em] text-[#12131A]/50">
                {s.label}
              </span>
              <span className="flex overflow-hidden rounded-lg border border-[#12131A]/8 focus-within:border-[#6C4DF5]">
                <input
                  value={s.value}
                  inputMode="numeric"
                  onChange={(e) =>
                    setDraft((d) =>
                      d.map((x, j) => (j === i ? { ...x, value: e.target.value.replace(/\D/g, "") } : x)),
                    )
                  }
                  className="min-w-0 flex-1 bg-white px-3 py-2.5 text-[12px] font-semibold outline-none"
                />
                <span className="flex items-center bg-[#F3F4F7] px-3 text-[11px] text-[#12131A]/55">
                  {s.unit}
                </span>
              </span>
              <span className="mt-1.5 block text-[10px] text-[#12131A]/45">{s.help}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Audit log */}
      <section className="mt-4 rounded-2xl border border-[#12131A]/8 bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[13px] font-semibold">Audit log</h2>
          <div className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                  filter === f ? "bg-[#12131A] text-white" : "border border-[#12131A]/8 bg-white text-[#12131A]/70"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="-mx-5 mt-3 overflow-x-auto px-5">
          <table className="w-full min-w-[720px] text-left text-[12px]">
            <thead>
              <tr className="bg-[#F8F8FB] text-[9px] uppercase tracking-[0.06em] text-[#12131A]/45">
                <th className="rounded-l-lg px-3 py-2.5 font-semibold">Timestamp</th>
                <th className="px-3 py-2.5 font-semibold">Action</th>
                <th className="px-3 py-2.5 font-semibold">Target</th>
                <th className="px-3 py-2.5 font-semibold">Details</th>
                <th className="rounded-r-lg px-3 py-2.5 font-semibold">Moderator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#12131A]/6">
              {rows.map((e, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-3 py-2.5 text-[11px] text-[#12131A]/55">{e.at}</td>
                  <td className="px-3 py-2.5">
                    <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${tone[e.tone]}`}>
                      {e.action}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 font-semibold">{e.target}</td>
                  <td className="px-3 py-2.5 text-[#12131A]/75">{e.details}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 font-semibold">{e.by}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-10 text-center text-[#12131A]/50">
                    No entries for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-[#12131A]/55">
          <span>
            {rows.length} of {filter === "All" ? "2,481" : rows.length} entries
          </span>
          <div className="flex gap-1.5">
            <button className="rounded-lg border border-[#12131A]/8 px-3 py-1.5 font-semibold text-[#12131A]/40">
              Prev
            </button>
            <button className="rounded-lg border border-[#12131A]/8 px-3 py-1.5 font-semibold text-[#12131A]">
              Next
            </button>
          </div>
        </div>
      </section>

      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 rounded-lg bg-[#12131A] px-4 py-2.5 text-[12px] font-semibold text-white shadow-lg"
        >
          Rules saved
        </div>
      )}
    </>
  );
}
