import AppShell from "@/components/AppShell";

const stats = [
  { label: "Pending review", value: "142", link: "Open queue →", tone: "default" },
  { label: "Total users", value: "15,580", link: "Manage users →", tone: "default" },
  { label: "Live rooms", value: "18", link: "View rooms →", tone: "link" },
  { label: "Coin balance", value: "348,920.50", link: "Finance overview →", tone: "link" },
  { label: "Open reports", value: "4", link: "Review now →", tone: "alert" },
] as const;

const attention = [
  {
    kind: "report",
    title: "User report · harassment in room “Midnight Melodies”",
    meta: "Reported by UID 20481 · 12 min ago",
    action: "Review",
  },
  {
    kind: "report",
    title: "User report · spam in Bio from a new account",
    meta: "Reported by UID 18733 · 41 min ago",
    action: "Review",
  },
  {
    kind: "app",
    title: "Host application · [App host name]",
    meta: "Applied 2 hours ago · UID 30291",
    action: "Approve",
  },
  {
    kind: "app",
    title: "Agency application · [Agency name]",
    meta: "Applied 5 hours ago · UID 30112",
    action: "Approve",
  },
  {
    kind: "app",
    title: "Host application · [App host name]",
    meta: "Applied yesterday · UID 29877",
    action: "Approve",
  },
];

const rooms = [
  { name: "Midnight Melodies", meta: "Host UID 20481 · 214 listeners", status: "Live" },
  { name: "Neon Aurora Lounge", meta: "Host UID 18733 · 168 listeners", status: "Live" },
  { name: "Friday PK Battle", meta: "Host UID 30291 · 142 listeners", status: "Live" },
  { name: "Late Night Confessions", meta: "Host UID 30112 · 97 listeners", status: "Live" },
];

const actions = [
  { type: "Ban", tone: "red", target: "UID 20481 · until 30 Nov 2026", by: "admin.sara", when: "4 min ago" },
  { type: "Takedown", tone: "red", target: "Room “Free coins 24/7”", by: "admin.omar", when: "22 min ago" },
  { type: "Role", tone: "blue", target: "UID 30291 → HOST (Level 1) GRANTED", by: "admin.sara", when: "1 hr ago" },
  { type: "Package", tone: "amber", target: "Coin package 5,000 + 500 bonus", by: "admin.lina", when: "2 hr ago" },
  { type: "Approve", tone: "green", target: "UID 30112", by: "admin.omar", when: "3 hr ago" },
] as const;

const quick = [
  { title: "New coin package", sub: "Pricing, coins, bonus" },
  { title: "Publish banner", sub: "Home screen promo" },
  { title: "Add gift", sub: "Store catalog entry" },
  { title: "Adjust coins", sub: "Credit or debit a user" },
];

const pill = {
  red: "bg-[#FDE8E8] text-[#B42318]",
  blue: "bg-[#E8E9FF] text-[#4338CA]",
  amber: "bg-[#FFF1D6] text-[#B45F06]",
  green: "bg-[#DDF5E6] text-[#1A7F45]",
};

const card = "rounded-2xl border border-[#12131A]/8 bg-white";

function CardHeader({ title, link }: { title: string; link: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[13px] font-semibold">{title}</h2>
      <a href="#" className="text-[11px] font-medium text-[#5B3DF5]">
        {link}
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <AppShell>
        {/* Header */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[22px] font-semibold leading-tight">Dashboard</h1>
            <p className="mt-0.5 text-xs text-[#12131A]/55">
              Dashboard · platform health, moderation queue and revenue.
            </p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">
            <div className="flex w-full items-center sm:w-[260px] gap-2 rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs text-[#12131A]/45">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              Search UID, name, phone, email
            </div>
            <span className="flex items-center gap-1.5 rounded-lg border border-[#22C55E]/30 bg-[#E7F8EE] px-3 py-2 text-xs font-medium text-[#1A7F45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              Live
            </span>
            <button className="rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs font-medium">
              Refresh
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {stats.map((s) => {
            const alert = s.tone === "alert";
            return (
              <div
                key={s.label}
                className={`rounded-2xl border p-4 last:col-span-2 sm:last:col-span-1 ${
                  alert
                    ? "border-[#F5B5B5] bg-[#FFF0F0]"
                    : "border-[#12131A]/8 bg-white"
                }`}
              >
                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.06em] ${
                    alert ? "text-[#B42318]" : "text-[#12131A]/55"
                  }`}
                >
                  {s.label}
                </p>
                <p
                  className={`mt-2 text-2xl font-semibold tabular-nums ${
                    alert ? "text-[#B42318]" : ""
                  }`}
                >
                  {s.value}
                </p>
                <a
                  href="#"
                  className={`mt-3 block text-[11px] font-medium ${
                    alert ? "text-[#B42318]" : s.tone === "link" ? "text-[#5B3DF5]" : "text-[#12131A]/55"
                  }`}
                >
                  {s.link}
                </a>
              </div>
            );
          })}
        </section>

        {/* Needs attention + Busiest rooms */}
        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className={`${card} p-5`}>
            <CardHeader title="Needs attention" link="All applications →" />
            <ul className="divide-y divide-[#12131A]/6">
              {attention.map((a, i) => (
                <li key={i} className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:flex-nowrap">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold ${
                      a.kind === "report" ? pill.red : pill.amber
                    }`}
                  >
                    {a.kind === "report" ? "RPT" : "APP"}
                  </span>
                  <div className="min-w-0 flex-1 basis-[calc(100%-2.75rem)] sm:basis-auto">
                    <p className="text-[12.5px] font-semibold sm:truncate">{a.title}</p>
                    <p className="truncate text-[11px] text-[#12131A]/50">{a.meta}</p>
                  </div>
                  <button className="ml-11 rounded-lg border border-[#12131A]/10 px-3 py-1.5 sm:ml-0 text-[11px] font-medium">
                    {a.kind === "report" ? "Dismiss" : "Reject"}
                  </button>
                  <button className="rounded-lg bg-[#6C4DF5] px-3 py-1.5 text-[11px] font-semibold text-white">
                    {a.action}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${card} self-start p-5`}>
            <CardHeader title="Busiest live rooms" link="View all →" />
            <ul className="space-y-3.5">
              {rooms.map((r) => (
                <li key={r.name} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ECE9FF] text-[#6C4DF5]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="9" y="3" width="6" height="11" rx="3" />
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold">{r.name}</p>
                    <p className="truncate text-[11px] text-[#12131A]/50">{r.meta}</p>
                  </div>
                  <span className="rounded-md bg-[#DDF5E6] px-2 py-1 text-[10px] font-semibold text-[#1A7F45]">
                    {r.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Recent actions + Quick actions */}
        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className={`${card} p-5`}>
            <CardHeader title="Recent moderator actions" link="Full audit log →" />
            <div className="-mx-5 overflow-x-auto px-5">
            <table className="w-full min-w-[520px] text-left text-[12px]">
              <thead>
                <tr className="text-[9px] uppercase tracking-[0.06em] text-[#12131A]/45">
                  <th className="pb-2 font-semibold">Action</th>
                  <th className="pb-2 font-semibold">Target</th>
                  <th className="pb-2 font-semibold">Moderator</th>
                  <th className="pb-2 text-right font-semibold">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#12131A]/6">
                {actions.map((a, i) => (
                  <tr key={i}>
                    <td className="py-2.5">
                      <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${pill[a.tone]}`}>
                        {a.type}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 font-semibold">{a.target}</td>
                    <td className="py-2.5 text-[#12131A]/55">{a.by}</td>
                    <td className="py-2.5 text-right text-[#12131A]/55">{a.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <div className={`${card} self-start p-5`}>
            <h2 className="mb-3 text-[13px] font-semibold">Quick actions</h2>
            <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
              {quick.map((q) => (
                <button
                  key={q.title}
                  className="rounded-xl border border-[#12131A]/8 p-3 text-left transition-colors hover:bg-[#F3F4F7]"
                >
                  <p className="text-[12px] font-semibold">{q.title}</p>
                  <p className="mt-0.5 text-[10.5px] text-[#5B3DF5]">{q.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
    </AppShell>
  );
}
