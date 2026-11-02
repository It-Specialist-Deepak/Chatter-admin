"use client";

import { useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  uid: string;
  color: string;
  roles: string[];
  levels: string;
  status: "Active" | "Blocked";
  phone: string;
};

const users: User[] = [
  { id: "1", name: "Mira K.", uid: "UID 20481", color: "#6C4DF5", roles: ["Host", "Agency owner"], levels: "Lv 8 · Lv 8", status: "Active", phone: "+971 50 ••• 1182" },
  { id: "2", name: "Arjun S.", uid: "UID 18733", color: "#BE1E5B", roles: [], levels: "Lv 2 · Lv 1", status: "Blocked", phone: "+91 98 ••• 4410" },
  { id: "3", name: "Lena V.", uid: "UID 30291", color: "#0F766E", roles: ["Host", "Moderator"], levels: "Lv 8 · Lv 11", status: "Active", phone: "+49 151 ••• 2290" },
  { id: "4", name: "Tomás B.", uid: "UID 30112", color: "#C2410C", roles: ["Host", "Support"], levels: "Lv 4 · Lv 7", status: "Active", phone: "+34 612 ••• 908" },
  { id: "5", name: "Fatya H.", uid: "UID 29877", color: "#2563EB", roles: [], levels: "Lv 3 · Lv 3", status: "Active", phone: "+62 812 ••• 3345" },
  { id: "6", name: "Omar H.", uid: "UID 27744", color: "#7C3AED", roles: [], levels: "Lv 1 · Lv 8", status: "Blocked", phone: "+20 100 ••• 7721" },
  { id: "7", name: "Valid T.", uid: "UID 26518", color: "#047857", roles: ["Agency owner", "Host agent"], levels: "Lv 12 · Lv 4", status: "Active", phone: "+966 55 ••• 1903" },
  { id: "8", name: "Sana F.", uid: "UID 25091", color: "#334155", roles: ["Super admin", "Finance"], levels: "Lv 8 · Lv 8", status: "Active", phone: "+92 300 ••• 5566" },
];

const roleGroups = [
  ["User", "Host", "Agency owner", "Moderator", "Support"],
  ["Super admin", "Finance", "Content", "Analyst"],
];

const tabs = ["Roles", "XP & Levels", "Badges", "Ban"];
const filters = ["All", "Active", "Blocked"] as const;

const initials = (n: string) =>
  n
    .replace(".", "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();

function StatusPill({ status }: { status: User["status"] }) {
  return (
    <span
      className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
        status === "Active"
          ? "bg-[#DDF5E6] text-[#1A7F45]"
          : "bg-[#FDE8E8] text-[#B42318]"
      }`}
    >
      {status}
    </span>
  );
}

export default function UsersView() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All roles");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selectedId, setSelectedId] = useState("1");
  const [tab, setTab] = useState("Roles");
  const [assigned, setAssigned] = useState<Record<string, string[]>>(
    Object.fromEntries(users.map((u) => [u.id, u.roles])),
  );

  const rows = useMemo(
    () =>
      users.filter((u) => {
        const q = query.trim().toLowerCase();
        if (q && !`${u.name} ${u.uid} ${u.phone}`.toLowerCase().includes(q)) return false;
        if (filter !== "All" && u.status !== filter) return false;
        if (role !== "All roles" && !assigned[u.id].includes(role)) return false;
        return true;
      }),
    [query, filter, role, assigned],
  );

  const selected = users.find((u) => u.id === selectedId)!;
  const selRoles = assigned[selected.id];

  const toggleRole = (r: string) =>
    setAssigned((a) => ({
      ...a,
      [selected.id]: a[selected.id].includes(r)
        ? a[selected.id].filter((x) => x !== r)
        : [...a[selected.id], r],
    }));

  const allRoles = roleGroups.flat();

  return (
    <>
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[22px] font-semibold leading-tight">Users</h1>
          <p className="mt-0.5 text-xs text-[#12131A]/55">
            15,580 accounts · search, view levels, assign roles and moderate.
          </p>
        </div>
        <button className="shrink-0 rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs font-semibold">
          Export CSV
        </button>
      </header>

      {/* Toolbar */}
      <div className="mt-4 flex flex-col gap-2 md:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs text-[#12131A]/50">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search UID, display name, phone or email"
            className="w-full bg-transparent text-[#12131A] outline-none placeholder:text-[#12131A]/45"
          />
        </label>
        <div className="flex gap-2">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs font-semibold outline-none md:flex-none"
          >
            <option>All roles</option>
            {allRoles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <div className="flex rounded-lg border border-[#12131A]/8 bg-[#E9EAEF] p-0.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-[11px] font-semibold ${
                  filter === f ? "bg-white shadow-sm" : "text-[#12131A]/55"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-[#12131A]/8 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-[12px]">
              <thead>
                <tr className="bg-[#F8F8FB] text-[9px] uppercase tracking-[0.06em] text-[#12131A]/45">
                  <th className="px-4 py-2.5 font-semibold">User</th>
                  <th className="px-2 py-2.5 font-semibold">Roles</th>
                  <th className="px-2 py-2.5 font-semibold">Host · Wealth level</th>
                  <th className="px-2 py-2.5 font-semibold">Status</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => setSelectedId(u.id)}
                    className={`cursor-pointer border-t border-[#12131A]/6 ${
                      u.id === selectedId ? "bg-[#F1EFFF]" : "hover:bg-[#F8F8FB]"
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ background: u.color }}
                        >
                          {initials(u.name)}
                        </span>
                        <div className="leading-tight">
                          <p className="font-semibold">{u.name}</p>
                          <p className="text-[10px] text-[#12131A]/45">{u.uid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-[10px] font-bold uppercase text-[#4338CA]">
                      {assigned[u.id].length ? assigned[u.id].join(" · ") : "User"}
                    </td>
                    <td className="px-2 py-2.5 text-[#12131A]/70">{u.levels}</td>
                    <td className="px-2 py-2.5">
                      <StatusPill status={u.status} />
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        onClick={() => setSelectedId(u.id)}
                        className="rounded-lg border border-[#12131A]/8 bg-white px-3 py-1.5 text-[11px] font-semibold"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-[#12131A]/50">
                      No users match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-[#12131A]/6 px-4 py-3 text-[11px] text-[#12131A]/55">
            <span>Showing 1–{rows.length} of 15,580</span>
            <div className="flex gap-1.5">
              <button className="rounded-lg border border-[#12131A]/8 px-3 py-1.5 font-semibold text-[#12131A]/40">
                Prev
              </button>
              <button className="rounded-lg border border-[#12131A]/8 px-3 py-1.5 font-semibold text-[#12131A]">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <aside className="self-start rounded-2xl border border-[#12131A]/8 bg-white p-5">
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: selected.color }}
            >
              {initials(selected.name)}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-[15px] font-semibold">{selected.name}</p>
              <p className="truncate text-[11px] text-[#12131A]/50">
                {selected.uid} · {selected.phone}
              </p>
            </div>
            <StatusPill status={selected.status} />
          </div>

          <div className="mt-4 flex gap-4 border-b border-[#12131A]/8 text-[12px] font-medium">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`-mb-px border-b-2 pb-2 ${
                  tab === t
                    ? "border-[#6C4DF5] text-[#5B3DF5]"
                    : "border-transparent text-[#12131A]/55"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "Roles" ? (
            <>
              <p className="mt-3 text-[11px] leading-relaxed text-[#12131A]/55">
                Roles control what this account can do. Changes are logged in the
                audit log.
              </p>
              <div className="mt-3 space-y-2">
                {roleGroups.map((group, i) => (
                  <div key={i} className="flex flex-wrap gap-2">
                    {group.map((r) => {
                      const on = selRoles.includes(r);
                      return (
                        <button
                          key={r}
                          onClick={() => toggleRole(r)}
                          aria-pressed={on}
                          className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                            on
                              ? "border-[#6C4DF5] bg-[#6C4DF5] text-white"
                              : "border-[#12131A]/10 bg-white text-[#12131A]"
                          }`}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              <button className="mt-4 rounded-lg bg-[#6C4DF5] px-4 py-2 text-[12px] font-semibold text-white">
                Save roles
              </button>
            </>
          ) : (
            <p className="mt-6 text-center text-[12px] text-[#12131A]/50">
              {tab} settings for {selected.name} will appear here.
            </p>
          )}
        </aside>
      </div>
    </>
  );
}
