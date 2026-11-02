"use client";

import { useState } from "react";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  color: string;
  link: string;
  slot: string;
  schedule: string;
  tag: "Live" | "Scheduled" | "Draft";
  enabled: boolean;
};

const tabs = ["Banners", "Announcements", "Daily rewards", "Leaderboards", "Challenges"] as const;

const initial: Banner[] = [
  { id: "1", title: "Weekly Vote-show eGames!", subtitle: "Win coins and exclusive frames this week", cta: "Learn more", color: "#2A1B7A", link: "chatter://events/weekly", slot: "Home · Top", schedule: "12 Nov – 19 Nov", tag: "Live", enabled: true },
  { id: "2", title: "Double Coins Weekend", subtitle: "Top up and get 2x bonus coins", cta: "Top up", color: "#8A2E0C", link: "chatter://store/coins", slot: "Home · Middle", schedule: "15 Nov – 17 Nov", tag: "Scheduled", enabled: true },
  { id: "3", title: "Host Recruitment", subtitle: "Join as a host and start earning", cta: "Apply now", color: "#115E59", link: "chatter://apply/host", slot: "Rooms · Bottom", schedule: "Always on", tag: "Draft", enabled: false },
];

const tagTone = {
  Live: "bg-[#DDF5E6] text-[#1A7F45]",
  Scheduled: "bg-[#FFF1D6] text-[#B45F06]",
  Draft: "bg-[#E9EAEF] text-[#12131A]/60",
};

const field =
  "w-full rounded-lg border border-[#12131A]/8 bg-white px-3 py-2.5 text-[12px] outline-none focus:border-[#6C4DF5]";

export default function EngagementView() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Banners");
  const [banners, setBanners] = useState(initial);
  const [selectedId, setSelectedId] = useState("1");
  const [editing, setEditing] = useState(false);

  const selected = banners.find((b) => b.id === selectedId) ?? banners[0];

  const patch = (id: string, p: Partial<Banner>) =>
    setBanners((all) => all.map((b) => (b.id === id ? { ...b, ...p } : b)));

  const add = () => {
    const id = String(Date.now());
    setBanners((all) => [
      ...all,
      {
        id,
        title: "New banner",
        subtitle: "Add a short description",
        cta: "Learn more",
        color: "#3B2A8C",
        link: "chatter://",
        slot: "Home · Top",
        schedule: "Not scheduled",
        tag: "Draft",
        enabled: false,
      },
    ]);
    setSelectedId(id);
    setEditing(true);
  };

  return (
    <>
      <header>
        <h1 className="text-[22px] font-semibold leading-tight">Engagement</h1>
        <p className="mt-0.5 text-xs text-[#12131A]/55">
          Banners, announcements, rewards and challenges that keep users coming back.
        </p>
      </header>

      <div className="mt-4 flex gap-5 overflow-x-auto border-b border-[#12131A]/8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px shrink-0 border-b-2 pb-2.5 text-[12px] font-semibold ${
              tab === t ? "border-[#6C4DF5] text-[#5B3DF5]" : "border-transparent text-[#12131A]/55"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab !== "Banners" ? (
        <div className="mt-4 rounded-2xl border border-dashed border-[#12131A]/15 bg-white px-4 py-16 text-center text-xs text-[#12131A]/50">
          {tab} will appear here.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* Banner list */}
          <section className="self-start rounded-2xl border border-[#12131A]/8 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[13px] font-semibold">Promotional banners</h2>
              <button
                onClick={add}
                className="rounded-lg bg-[#6C4DF5] px-3 py-2 text-[11px] font-semibold text-white"
              >
                + Add banner
              </button>
            </div>
            <ul className="mt-3 divide-y divide-[#12131A]/6">
              {banners.map((b, i) => (
                <li
                  key={b.id}
                  onClick={() => setSelectedId(b.id)}
                  className={`flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-2 py-3 ${
                    b.id === selected.id ? "-mx-2 rounded-lg bg-[#F5F3FF] px-2" : ""
                  }`}
                >
                  <span className="w-3 text-[11px] font-semibold text-[#12131A]/40">{i + 1}</span>
                  <span className="h-10 w-16 shrink-0 rounded-md" style={{ background: b.color }} />
                  <span className="min-w-0 flex-1 basis-40 leading-tight">
                    <span className="block truncate text-[12.5px] font-semibold">{b.title}</span>
                    <span className="mt-0.5 block truncate text-[10.5px] text-[#12131A]/50">
                      {b.slot} · {b.schedule}
                    </span>
                  </span>
                  <span className={`rounded px-2 py-1 text-[9px] font-bold uppercase ${tagTone[b.tag]}`}>
                    {b.tag}
                  </span>
                  <input
                    type="checkbox"
                    aria-label={`Enable ${b.title}`}
                    checked={b.enabled}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => patch(b.id, { enabled: !b.enabled })}
                    className="h-4 w-4 cursor-pointer accent-[#6C4DF5]"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(b.id);
                      setEditing(true);
                    }}
                    className="rounded-md border border-[#12131A]/8 px-2.5 py-1 text-[10px] font-semibold"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Preview / editor */}
          <aside className="self-start rounded-2xl border border-[#12131A]/8 bg-white p-5">
            <h2 className="text-[13px] font-semibold">{editing ? "Edit banner" : "App preview"}</h2>

            <div
              className="mt-3 rounded-xl p-4 text-white"
              style={{ background: selected.color, opacity: selected.enabled ? 1 : 0.65 }}
            >
              <p className="text-[15px] font-semibold leading-tight">{selected.title}</p>
              <p className="mt-1 text-[11px] text-white/70">{selected.subtitle}</p>
              <span className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#12131A]">
                {selected.cta}
              </span>
            </div>

            {editing ? (
              <div className="mt-4 space-y-3">
                <input
                  value={selected.title}
                  onChange={(e) => patch(selected.id, { title: e.target.value })}
                  placeholder="Title"
                  className={field}
                />
                <input
                  value={selected.subtitle}
                  onChange={(e) => patch(selected.id, { subtitle: e.target.value })}
                  placeholder="Subtitle"
                  className={field}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={selected.cta}
                    onChange={(e) => patch(selected.id, { cta: e.target.value })}
                    placeholder="Button label"
                    className={field}
                  />
                  <input
                    value={selected.slot}
                    onChange={(e) => patch(selected.id, { slot: e.target.value })}
                    placeholder="Slot"
                    className={field}
                  />
                </div>
                <input
                  value={selected.link}
                  onChange={(e) => patch(selected.id, { link: e.target.value })}
                  placeholder="Link"
                  className={field}
                />
                <input
                  value={selected.schedule}
                  onChange={(e) => patch(selected.id, { schedule: e.target.value })}
                  placeholder="Schedule"
                  className={field}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 rounded-lg bg-[#6C4DF5] py-2.5 text-[12px] font-semibold text-white"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      setBanners((all) => all.filter((b) => b.id !== selected.id));
                      setSelectedId(banners.find((b) => b.id !== selected.id)?.id ?? "");
                      setEditing(false);
                    }}
                    className="rounded-lg border border-[#F5B5B5] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#B42318]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <dl className="mt-4 space-y-2 text-[12px]">
                {[
                  ["Link", selected.link],
                  ["Slot", selected.slot],
                  ["Schedule", selected.schedule],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <dt className="w-16 shrink-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#12131A]/45">
                      {k}
                    </dt>
                    <dd className="min-w-0 break-words font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
