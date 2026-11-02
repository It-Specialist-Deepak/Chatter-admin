"use client";

import { Fragment, useState } from "react";

type Perm = { id: string; title: string; desc: string };
type Group = { title: string; perms: Perm[] };

const groups: Group[] = [
  {
    title: "Rooms",
    perms: [
      { id: "room.create", title: "Create rooms", desc: "Open public and private voice rooms" },
      { id: "room.moderate", title: "Moderate rooms", desc: "Mute, kick and close live sessions" },
      { id: "room.takedown", title: "Take down rooms", desc: "Remove rooms that violate policy" },
    ],
  },
  {
    title: "Social",
    perms: [
      { id: "profile.edit", title: "Edit own profile", desc: "Name, photo, bio and badges" },
      { id: "message.send", title: "Send messages", desc: "Direct and room chat messages" },
    ],
  },
  {
    title: "Economy",
    perms: [
      { id: "gift.send", title: "Send gifts", desc: "Spend coins on gifts in rooms" },
      { id: "gift.receive", title: "Receive gifts", desc: "Earn diamonds from received gifts" },
      { id: "coin.cashout", title: "Cash out earnings", desc: "Request payouts for diamonds" },
    ],
  },
  {
    title: "Moderation",
    perms: [
      { id: "report.view", title: "View reports", desc: "See user and room reports" },
      { id: "report.resolve", title: "Resolve reports", desc: "Dismiss, warn or ban accounts" },
    ],
  },
  {
    title: "Agency",
    perms: [
      { id: "agency.manage", title: "Manage agency hosts", desc: "View earnings and activity of hosts" },
      { id: "agency.invite", title: "Invite hosts", desc: "Send host invitations to users" },
    ],
  },
  {
    title: "Administration",
    perms: [
      { id: "role.assign", title: "Assign roles", desc: "Grant or revoke roles on accounts" },
      { id: "finance.adjust", title: "Adjust balances", desc: "Credit or debit coin balances" },
      { id: "audit.view", title: "View audit log", desc: "Read all moderator and admin actions" },
    ],
  },
];

const allPerms = groups.flatMap((g) => g.perms.map((p) => p.id));

const roles = ["User", "Host", "Coin seller", "Agency", "BD", "Merchant", "Reseller", "Payroll", "Admin"];

const presets: Record<string, string[]> = {
  User: ["profile.edit", "message.send", "gift.send"],
  Host: [
    "room.create", "room.moderate",
    "profile.edit", "message.send",
    "gift.send", "gift.receive", "coin.cashout",
  ],
  "Coin seller": ["profile.edit", "message.send", "gift.send", "finance.adjust"],
  Agency: [
    "room.create", "profile.edit", "message.send", "gift.send", "gift.receive",
    "coin.cashout", "agency.manage", "agency.invite",
  ],
  BD: ["profile.edit", "message.send", "agency.manage", "agency.invite", "report.view"],
  Merchant: ["profile.edit", "message.send", "gift.send", "coin.cashout"],
  Reseller: ["profile.edit", "message.send", "gift.send", "finance.adjust"],
  Payroll: ["profile.edit", "coin.cashout", "finance.adjust", "audit.view"],
  Admin: allPerms,
};

type State = Record<string, string[]>;

export default function RolesView() {
  const [saved, setSaved] = useState<State>(presets);
  const [draft, setDraft] = useState<State>(presets);
  const [role, setRole] = useState("Host");
  const [mode, setMode] = useState<"role" | "matrix">("role");
  const [toast, setToast] = useState(false);

  const current = draft[role];
  const dirty = current.length !== saved[role].length || current.some((p) => !saved[role].includes(p));

  const toggle = (r: string, id: string) =>
    setDraft((d) => ({
      ...d,
      [r]: d[r].includes(id) ? d[r].filter((x) => x !== id) : [...d[r], id],
    }));

  const save = () => {
    setSaved(draft);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <>
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[22px] font-semibold leading-tight">Roles &amp; permissions</h1>
          <p className="mt-0.5 text-xs text-[#12131A]/55">
            Choose a role, then tick what it can do. Changes apply to every account with that role.
          </p>
        </div>
        <div className="flex shrink-0 rounded-lg border border-[#12131A]/8 bg-[#E9EAEF] p-0.5">
          {(
            [
              ["role", "By role"],
              ["matrix", "Matrix"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setMode(k)}
              className={`rounded-md px-3 py-1.5 text-[11px] font-semibold ${
                mode === k ? "bg-white shadow-sm" : "text-[#12131A]/55"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {mode === "role" ? (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[200px_minmax(0,1fr)]">
          {/* Role list */}
          <nav className="self-start rounded-2xl border border-[#12131A]/8 bg-white p-2">
            <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {roles.map((r) => {
                const on = r === role;
                return (
                  <li key={r} className="shrink-0 lg:shrink">
                    <button
                      onClick={() => setRole(r)}
                      aria-current={on ? "true" : undefined}
                      className={`flex w-full items-center justify-between gap-6 rounded-lg px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide ${
                        on ? "bg-[#ECE9FF] text-[#4338CA]" : "text-[#12131A] hover:bg-[#F3F4F7]"
                      }`}
                    >
                      {r}
                      <span className={`text-[10px] font-semibold ${on ? "text-[#4338CA]" : "text-[#12131A]/40"}`}>
                        {draft[r].length}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Permissions */}
          <section className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#12131A]/8 bg-white px-5 py-3.5">
              <div>
                <h2 className="text-[13px] font-bold uppercase tracking-wide">{role}</h2>
                <p className="mt-0.5 text-[11px] text-[#12131A]/50">
                  {current.length} of {allPerms.length} permissions granted
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDraft((d) => ({ ...d, [role]: saved[role] }))}
                  disabled={!dirty}
                  className="rounded-lg border border-[#12131A]/8 bg-white px-3.5 py-2 text-[12px] font-semibold disabled:opacity-40"
                >
                  Discard
                </button>
                <button
                  onClick={save}
                  disabled={!dirty}
                  className="rounded-lg bg-[#6C4DF5] px-3.5 py-2 text-[12px] font-semibold text-white disabled:opacity-50"
                >
                  Save permissions
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              {groups.map((g) => (
                <div key={g.title} className="rounded-2xl border border-[#12131A]/8 bg-white px-5 py-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#12131A]/70">
                    {g.title}
                  </h3>
                  <ul className="mt-2 divide-y divide-[#12131A]/6">
                    {g.perms.map((p) => {
                      const on = current.includes(p.id);
                      return (
                        <li key={p.id}>
                          <label className="flex cursor-pointer items-start gap-3 py-2.5">
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={() => toggle(role, p.id)}
                              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#6C4DF5]"
                            />
                            <span className="min-w-0 leading-tight">
                              <span className="block text-[12px] font-semibold">{p.title}</span>
                              <span className="mt-0.5 block text-[10.5px] text-[#12131A]/50">{p.desc}</span>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#12131A]/8 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-[12px]">
              <thead>
                <tr className="bg-[#F8F8FB] text-[9px] uppercase tracking-[0.06em] text-[#12131A]/45">
                  <th className="px-4 py-2.5 font-semibold">Permission</th>
                  {roles.map((r) => (
                    <th key={r} className="px-2 py-2.5 text-center font-semibold">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((g) => (
                  <Fragment key={g.title}>
                    <tr className="border-t border-[#12131A]/6 bg-[#FBFBFD]">
                      <td colSpan={roles.length + 1} className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#12131A]/60">
                        {g.title}
                      </td>
                    </tr>
                    {g.perms.map((p) => (
                      <tr key={p.id} className="border-t border-[#12131A]/6">
                        <td className="px-4 py-2.5 font-semibold">{p.title}</td>
                        {roles.map((r) => (
                          <td key={r} className="px-2 py-2.5 text-center">
                            <input
                              type="checkbox"
                              aria-label={`${p.title} for ${r}`}
                              checked={draft[r].includes(p.id)}
                              onChange={() => toggle(r, p.id)}
                              className="h-4 w-4 cursor-pointer accent-[#6C4DF5]"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2 border-t border-[#12131A]/6 px-4 py-3">
            <button
              onClick={() => setDraft(saved)}
              className="rounded-lg border border-[#12131A]/8 bg-white px-3.5 py-2 text-[12px] font-semibold"
            >
              Discard
            </button>
            <button onClick={save} className="rounded-lg bg-[#6C4DF5] px-3.5 py-2 text-[12px] font-semibold text-white">
              Save permissions
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 rounded-lg bg-[#12131A] px-4 py-2.5 text-[12px] font-semibold text-white shadow-lg"
        >
          Permissions saved
        </div>
      )}
    </>
  );
}
