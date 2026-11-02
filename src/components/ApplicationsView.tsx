"use client";

import { useState } from "react";

type Kind = "Host" | "Agency" | "BD";
type Status = "Pending" | "Approved" | "Rejected";

type App = {
  id: string;
  name: string;
  uid: string;
  kind: Kind;
  status: Status;
  submitted: string;
  country: string;
  experience: string;
  level: string;
  referrer: string;
  note: string;
  reason?: string;
};

const initial: App[] = [
  { id: "1", name: "Aisha Rahman", uid: "UID 30291", kind: "Host", status: "Pending", submitted: "2 hours ago", country: "India", experience: "4 months", level: "Lv 8", referrer: "Agency · Starlight", note: "Voice host for 4 months. I do daily music and chat rooms and want to join an agency.", reason: "Incomplete verification details." },
  { id: "2", name: "Starlight Agency", uid: "UID 30112", kind: "Agency", status: "Pending", submitted: "5 hours ago", country: "UAE", experience: "2 years", level: "Lv 12", referrer: "BD · Karim", note: "We manage 40+ hosts across the Gulf region and are looking to onboard onto Chatter.", reason: "Incomplete verification details." },
  { id: "3", name: "Karim Haddad", uid: "UID 29877", kind: "BD", status: "Pending", submitted: "Yesterday", country: "Egypt", experience: "1 year", level: "Lv 5", referrer: "Direct", note: "Business development lead with experience recruiting hosts and agencies.", reason: "Incomplete verification details." },
  { id: "4", name: "Priya Nair", uid: "UID 29102", kind: "Host", status: "Pending", submitted: "Yesterday", country: "India", experience: "8 months", level: "Lv 6", referrer: "Agency · Nova", note: "I host late-night storytelling rooms with a steady audience.", reason: "Incomplete verification details." },
  { id: "5", name: "Omar Said", uid: "UID 27744", kind: "Host", status: "Approved", submitted: "3 days ago", country: "Jordan", experience: "1 year", level: "Lv 9", referrer: "Direct", note: "Experienced host, verified in person.", reason: "Incomplete verification details." },
  { id: "6", name: "Lina Park", uid: "UID 26001", kind: "Agency", status: "Rejected", submitted: "4 days ago", country: "Korea", experience: "6 months", level: "Lv 3", referrer: "Direct", note: "New agency with 6 hosts.", reason: "Documents unreadable." },
];

const reasons = [
  "Incomplete verification details.",
  "Documents unreadable.",
  "Does not meet level requirement.",
  "Duplicate or suspicious account.",
];

const statuses: Status[] = ["Pending", "Approved", "Rejected"];
const kinds = ["All", "Host", "Agency", "BD"] as const;

const kindAbbr: Record<Kind, string> = { Host: "HOST", Agency: "AGY", BD: "BD" };

const pillTone: Record<Status, string> = {
  Pending: "bg-[#FFF1D6] text-[#B45F06]",
  Approved: "bg-[#DDF5E6] text-[#1A7F45]",
  Rejected: "bg-[#FDE8E8] text-[#B42318]",
};

function Pill({ status }: { status: Status }) {
  return (
    <span className={`shrink-0 rounded-md px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${pillTone[status]}`}>
      {status}
    </span>
  );
}

export default function ApplicationsView() {
  const [apps, setApps] = useState(initial);
  const [tab, setTab] = useState<Status>("Pending");
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const [selectedId, setSelectedId] = useState("1");
  const [reasonFor, setReasonFor] = useState<Record<string, string>>({});

  const count = (s: Status) => apps.filter((a) => a.status === s).length;
  const list = apps.filter((a) => a.status === tab && (kind === "All" || a.kind === kind));
  const selected = list.find((a) => a.id === selectedId) ?? list[0];

  const decide = (id: string, status: Status) =>
    setApps((all) =>
      all.map((a) =>
        a.id === id
          ? { ...a, status, reason: status === "Rejected" ? reasonFor[id] ?? reasons[0] : a.reason }
          : a,
      ),
    );

  return (
    <>
      <header>
        <h1 className="text-[22px] font-semibold leading-tight">Applications</h1>
        <p className="mt-0.5 text-xs text-[#12131A]/55">
          Review Host, Agency and BD requests. Approving grants the role immediately.
        </p>
      </header>

      <div className="mt-4 flex flex-col gap-3 border-b border-[#12131A]/8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-5">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setTab(s)}
              className={`-mb-px flex items-center gap-1.5 border-b-2 pb-2.5 text-[12px] font-semibold ${
                tab === s ? "border-[#6C4DF5] text-[#5B3DF5]" : "border-transparent text-[#12131A]/55"
              }`}
            >
              {s}
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] text-[#12131A]/60 ring-1 ring-[#12131A]/8">
                {count(s)}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 pb-2.5">
          {kinds.map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                kind === k
                  ? "bg-[#12131A] text-white"
                  : "border border-[#12131A]/8 bg-white text-[#12131A]/70"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        {/* Queue */}
        <ul className="space-y-2.5 self-start">
          {list.map((a) => {
            const on = selected?.id === a.id;
            return (
              <li key={a.id}>
                <button
                  onClick={() => setSelectedId(a.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border bg-white p-3 text-left ${
                    on ? "border-[#B8A9FF] ring-2 ring-[#6C4DF5]/15" : "border-[#12131A]/8"
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF1D6] text-[9px] font-bold text-[#8A4B00]">
                    {kindAbbr[a.kind]}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12.5px] font-semibold">{a.name}</span>
                    <span className="mt-0.5 block truncate text-[10.5px] text-[#12131A]/50">
                      {a.uid} · {a.submitted}
                    </span>
                  </span>
                  <Pill status={a.status} />
                </button>
              </li>
            );
          })}
          {list.length === 0 && (
            <li className="rounded-xl border border-dashed border-[#12131A]/15 bg-white px-4 py-10 text-center text-xs text-[#12131A]/50">
              No {tab.toLowerCase()} applications.
            </li>
          )}
        </ul>

        {/* Detail */}
        {selected && (
          <section className="min-w-0 self-start rounded-2xl border border-[#12131A]/8 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#B45F06]">
                  {selected.kind} application
                </p>
                <h2 className="mt-1 text-[17px] font-semibold leading-tight">{selected.name}</h2>
                <p className="mt-0.5 text-[11px] text-[#12131A]/50">
                  {selected.uid} · Submitted {selected.submitted}
                </p>
              </div>
              <Pill status={selected.status} />
            </div>

            <dl className="mt-4 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
              {[
                ["Country", selected.country],
                ["Experience", selected.experience],
                ["Current level", selected.level],
                ["Referred by", selected.referrer],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-[#F3F4F7] px-3 py-2.5">
                  <dt className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#12131A]/45">{k}</dt>
                  <dd className="mt-1 text-[12px] font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#12131A]/55">
              Verification documents
            </h3>
            <div className="mt-2 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-3">
              {["ID document · front", "ID document · back"].map((t) => (
                <div
                  key={t}
                  className="flex h-[60px] items-center justify-center rounded-lg bg-[#F3F4F7] px-2 text-center text-[10px] text-[#12131A]/50"
                >
                  {t}
                </div>
              ))}
              <button className="flex h-[60px] items-center justify-center gap-1.5 rounded-lg border border-[#12131A]/8 text-[11px] font-semibold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6 4v16l14-8L6 4Z" />
                </svg>
                Play intro video
              </button>
            </div>

            <h3 className="mt-5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#12131A]/55">
              Applicant note
            </h3>
            <textarea
              readOnly
              value={selected.note}
              rows={3}
              className="mt-2 w-full resize-y rounded-lg border border-[#12131A]/8 bg-white px-3 py-2.5 text-[12px] outline-none"
            />

            <h3 className="mt-4 text-[9px] font-bold uppercase tracking-[0.08em] text-[#12131A]/55">
              Rejection reason
            </h3>
            <p className="text-[10.5px] text-[#12131A]/45">Shown to the applicant if rejected.</p>
            <select
              value={reasonFor[selected.id] ?? selected.reason ?? reasons[0]}
              onChange={(e) => setReasonFor((r) => ({ ...r, [selected.id]: e.target.value }))}
              className="mt-2 w-full rounded-lg border border-[#12131A]/8 bg-white px-3 py-2.5 text-[12px] font-medium outline-none"
            >
              {reasons.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-[#12131A]/6 pt-4">
              <button
                onClick={() => decide(selected.id, "Approved")}
                disabled={selected.status === "Approved"}
                className="rounded-lg bg-[#1A7F45] px-4 py-2.5 text-[12px] font-semibold text-white disabled:opacity-50"
              >
                Approve as {selected.kind.toUpperCase()}
              </button>
              <button
                onClick={() => decide(selected.id, "Rejected")}
                disabled={selected.status === "Rejected"}
                className="rounded-lg border border-[#F5B5B5] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#B42318] disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
