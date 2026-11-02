"use client";

import { useMemo, useState } from "react";

type Room = {
  id: string;
  name: string;
  hostUid: string;
  roomId: string;
  type: "Music" | "Chat" | "PK battle";
  color: string;
  listeners: number;
  onMic: number;
  coins: number;
  duration: string;
  live: boolean;
};

const initial: Room[] = [
  { id: "1", name: "Midnight Melodies", hostUid: "20481", roomId: "R-100231", type: "Music", color: "#3B2A8C", listeners: 214, onMic: 8, coins: 12400, duration: "2h 14m", live: true },
  { id: "2", name: "Neon Aurora Lounge", hostUid: "18733", roomId: "R-100187", type: "Chat", color: "#115E59", listeners: 168, onMic: 6, coins: 8120, duration: "1h 02m", live: true },
  { id: "3", name: "Friday PK Battle", hostUid: "30291", roomId: "R-100342", type: "PK battle", color: "#8A2E0C", listeners: 142, onMic: 4, coins: 21850, duration: "48m", live: true },
  { id: "4", name: "Late Night Confessions", hostUid: "30112", roomId: "R-100298", type: "Chat", color: "#1E3A8A", listeners: 97, onMic: 5, coins: 3090, duration: "3h 20m", live: true },
  { id: "5", name: "Free coins 24/7", hostUid: "27744", roomId: "R-100076", type: "Chat", color: "#5B1A3A", listeners: 54, onMic: 2, coins: 410, duration: "5h 41m", live: true },
  { id: "6", name: "Late Night", hostUid: "26518", roomId: "R-099954", type: "Music", color: "#3F5B1C", listeners: 0, onMic: 0, coins: 5260, duration: "Ended 1h ago", live: false },
];

const tabs = ["Live", "Stopped", "All"] as const;
const sorts = ["Listeners", "Coins", "Duration"] as const;
const types = ["All types", "Music", "Chat", "PK battle"] as const;

const fmt = (n: number) => n.toLocaleString("en-US");

export default function RoomsView() {
  const [rooms, setRooms] = useState(initial);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<(typeof tabs)[number]>("Live");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Listeners");
  const [type, setType] = useState<(typeof types)[number]>("All types");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rooms
      .filter((r) => {
        if (tab === "Live" && !r.live) return false;
        if (tab === "Stopped" && r.live) return false;
        if (type !== "All types" && r.type !== type) return false;
        if (q && !`${r.name} ${r.roomId} ${r.hostUid}`.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) =>
        sort === "Coins" ? b.coins - a.coins : sort === "Duration" ? 0 : b.listeners - a.listeners,
      );
  }, [rooms, query, tab, sort, type]);

  const close = (id: string) =>
    setRooms((all) =>
      all.map((r) =>
        r.id === id ? { ...r, live: false, listeners: 0, onMic: 0, duration: "Closed just now" } : r,
      ),
    );

  const liveCount = rooms.filter((r) => r.live).length;

  return (
    <>
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[22px] font-semibold leading-tight">Rooms</h1>
          <p className="mt-0.5 text-xs text-[#12131A]/55">
            Live list of active and stopped audio chat rooms. Take down a room to remove everyone instantly.
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#22C55E]/30 bg-[#E7F8EE] px-3 py-2 text-xs font-semibold text-[#1A7F45]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          {liveCount} live now
        </span>
      </header>

      <div className="mt-4 flex flex-col gap-2 lg:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs text-[#12131A]/50">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Room name, ID or host UID"
            className="w-full bg-transparent text-[#12131A] outline-none placeholder:text-[#12131A]/45"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-lg border border-[#12131A]/8 bg-[#E9EAEF] p-0.5">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-md px-3 py-1.5 text-[11px] font-semibold ${
                  tab === t ? "bg-white shadow-sm" : "text-[#12131A]/55"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-1.5 rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs text-[#12131A]/50">
            Sort:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
              className="bg-transparent font-semibold text-[#12131A] outline-none"
            >
              {sorts.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-1.5 rounded-lg border border-[#12131A]/8 bg-white px-3 py-2 text-xs text-[#12131A]/50">
            Type:
            <select
              value={type}
              onChange={(e) => setType(e.target.value as (typeof types)[number])}
              className="bg-transparent font-semibold text-[#12131A] outline-none"
            >
              {types.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((r) => (
          <li key={r.id} className="overflow-hidden rounded-2xl border border-[#12131A]/8 bg-white">
            <div
              className="flex h-[60px] items-start justify-between p-3"
              style={{ background: r.color, opacity: r.live ? 1 : 0.6 }}
            >
              <span
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                  r.live ? "bg-white text-[#1A7F45]" : "bg-white/90 text-[#12131A]/60"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${r.live ? "bg-[#22C55E]" : "bg-[#12131A]/40"}`} />
                {r.live ? "Live" : "Stopped"}
              </span>
              <span className="rounded-full bg-[#12131A] px-2.5 py-1 text-[10px] font-semibold text-white">
                {r.duration}
              </span>
            </div>
            <div className="p-4">
              <h2 className="truncate text-[13.5px] font-semibold">{r.name}</h2>
              <p className="mt-0.5 truncate text-[10.5px] text-[#12131A]/50">
                Host UID {r.hostUid} · {r.roomId} · {r.type}
              </p>
              <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#12131A]/60">
                <span><b className="text-[#12131A]">{fmt(r.listeners)}</b> listeners</span>
                <span><b className="text-[#12131A]">{r.onMic}</b> on mic</span>
                <span><b className="text-[#12131A]">{fmt(r.coins)}</b> coins</span>
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="rounded-lg border border-[#12131A]/8 bg-white py-2 text-[11px] font-semibold">
                  Inspect
                </button>
                <button
                  onClick={() => close(r.id)}
                  disabled={!r.live}
                  className="rounded-lg border border-[#F5B5B5] bg-white py-2 text-[11px] font-semibold text-[#B42318] disabled:opacity-40"
                >
                  Take down
                </button>
              </div>
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="col-span-full rounded-2xl border border-dashed border-[#12131A]/15 bg-white px-4 py-12 text-center text-xs text-[#12131A]/50">
            No rooms match your filters.
          </li>
        )}
      </ul>
    </>
  );
}
