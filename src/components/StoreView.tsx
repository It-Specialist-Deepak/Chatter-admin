"use client";

import { useRef, useState } from "react";

const categories = ["Room themes", "Avatar frames", "Chat bubbles", "Entry effects", "Special IDs", "Mic skins"] as const;
type Category = (typeof categories)[number];

type Item = {
  id: string;
  name: string;
  category: Category;
  meta: string;
  price: number;
  color: string;
};

const colors = ["#3B2A8C", "#7A4E00", "#1E3A8A", "#8A2E0C", "#115E59", "#2B2D3A", "#5B1A3A", "#9D2B5E"];

const initial: Item[] = [
  { id: "1", name: "Neon Aurora Lounge Theme", category: "Room themes", meta: "Permanent · 30 days", price: 2000, color: colors[0] },
  { id: "2", name: "Golden Lord Frame", category: "Avatar frames", meta: "30 days", price: 1200, color: colors[1] },
  { id: "3", name: "Sable — Midnight", category: "Chat bubbles", meta: "7 days", price: 400, color: colors[2] },
  { id: "4", name: "Dragon Flight Entry", category: "Entry effects", meta: "30 days", price: 3200, color: colors[3] },
  { id: "5", name: "ID 333333", category: "Special IDs", meta: "Permanent", price: 8000, color: colors[4] },
  { id: "6", name: "Midnight Panther", category: "Mic skins", meta: "Permanent", price: 12000, color: colors[5] },
  { id: "7", name: "Crystal Crown", category: "Avatar frames", meta: "30 days", price: 2000, color: colors[6] },
  { id: "8", name: "Sakura Garden Theme", category: "Room themes", meta: "30 days", price: 3200, color: colors[7] },
];

const fmt = (n: number) => n.toLocaleString("en-US");
const field =
  "w-full rounded-lg border border-[#12131A]/8 bg-white px-3 py-2.5 text-[12px] outline-none focus:border-[#6C4DF5]";
const label = "mb-1.5 block text-[9px] font-bold uppercase tracking-[0.08em] text-[#12131A]/50";

export default function StoreView() {
  const [items, setItems] = useState(initial);
  const [cat, setCat] = useState<"All" | Category>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [name, setName] = useState("Neon Aurora Lounge Theme");
  const [category, setCategory] = useState<Category>("Room themes");
  const [price, setPrice] = useState("2000");
  const [desc, setDesc] = useState("Violet and glowing neon lights with synth wave atmosphere.");
  const [file, setFile] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const list = items.filter((i) => cat === "All" || i.category === cat);

  const reset = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setDesc("");
    setFile(null);
  };

  const startEdit = (i: Item) => {
    setEditId(i.id);
    setName(i.name);
    setCategory(i.category);
    setPrice(String(i.price));
  };

  const add = () => {
    if (!name.trim()) return;
    if (editId) {
      setItems((all) =>
        all.map((x) =>
          x.id === editId ? { ...x, name: name.trim(), category, price: Number(price) || 0 } : x,
        ),
      );
    } else {
      setItems((all) => [
        ...all,
        {
          id: String(Date.now()),
          name: name.trim(),
          category,
          meta: "30 days",
          price: Number(price) || 0,
          color: colors[all.length % colors.length],
        },
      ]);
    }
    reset();
  };

  return (
    <>
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[22px] font-semibold leading-tight">Store &amp; gifts</h1>
          <p className="mt-0.5 text-xs text-[#12131A]/55">
            Curate what&apos;s sold in the store: gifts, cosmetics and special IDs by category.
          </p>
        </div>
        <div className="flex shrink-0 rounded-lg border border-[#12131A]/8 bg-[#E9EAEF] p-0.5">
          {(
            [
              ["grid", "Grid"],
              ["list", "List"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setView(k)}
              className={`rounded-md px-3 py-1.5 text-[11px] font-semibold ${
                view === k ? "bg-white shadow-sm" : "text-[#12131A]/55"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${
              cat === c ? "bg-[#12131A] text-white" : "border border-[#12131A]/8 bg-white text-[#12131A]/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        {/* Catalog */}
        <ul
          className={
            view === "grid"
              ? "grid grid-cols-1 gap-4 self-start min-[520px]:grid-cols-2 xl:grid-cols-3"
              : "flex flex-col gap-2 self-start"
          }
        >
          {list.map((i) =>
            view === "grid" ? (
              <li key={i.id} className="flex flex-col overflow-hidden rounded-2xl border border-[#12131A]/8 bg-white">
                <div
                  className="flex h-[165px] items-center justify-center px-3 text-center text-[13px] font-medium text-white"
                  style={{ background: i.color }}
                >
                  [{i.category} preview]
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="min-h-[2.5em] text-[15px] font-semibold leading-tight">{i.name}</p>
                  <p className="mt-1 text-[13px] text-[#12131A]/55">{i.category}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="flex items-center gap-2 text-[15px] font-semibold tabular-nums">
                      <span className="h-4 w-4 rounded-full bg-[#F5A524]" />
                      {fmt(i.price)}
                    </span>
                    <button
                      onClick={() => startEdit(i)}
                      className="rounded-lg border border-[#12131A]/8 bg-white px-4 py-2 text-[12px] font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            ) : (
              <li
                key={i.id}
                className="flex items-center gap-3 rounded-xl border border-[#12131A]/8 bg-white p-2.5"
              >
                <span className="h-10 w-10 shrink-0 rounded-lg" style={{ background: i.color }} />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[12px] font-semibold">{i.name}</span>
                  <span className="mt-0.5 block truncate text-[10px] text-[#12131A]/50">
                    {i.category} · {i.meta}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold tabular-nums">
                  <span className="h-3 w-3 rounded-full bg-[#F5A524]" />
                  {fmt(i.price)}
                </span>
                <button
                  onClick={() => startEdit(i)}
                  className="rounded-md border border-[#12131A]/8 px-2.5 py-1 text-[10px] font-semibold"
                >
                  Edit
                </button>
              </li>
            ),
          )}
          {list.length === 0 && (
            <li className="col-span-full rounded-2xl border border-dashed border-[#12131A]/15 bg-white px-4 py-12 text-center text-xs text-[#12131A]/50">
              Nothing in this category yet.
            </li>
          )}
        </ul>

        {/* New cosmetic */}
        <aside className="self-start rounded-2xl border border-[#12131A]/8 bg-white p-5">
          <h2 className="text-[14px] font-semibold">{editId ? "Edit cosmetic" : "New cosmetic"}</h2>

          <label className="mt-3 block">
            <span className={label}>Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className={field} />
          </label>

          <div className="mt-3 grid grid-cols-[1fr_120px] gap-2.5">
            <label className="block">
              <span className={label}>Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className={field}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={label}>Price (coins)</span>
              <input
                value={price}
                inputMode="numeric"
                onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
                className={field}
              />
            </label>
          </div>

          <label className="mt-3 block">
            <span className={label}>Description</span>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className={`${field} resize-y`}
            />
          </label>

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-3 flex w-full flex-col items-center gap-1.5 rounded-lg border border-dashed border-[#12131A]/15 bg-[#F8F8FB] px-3 py-5 text-[11px] text-[#12131A]/55"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
            </svg>
            {file ? (
              <span className="font-semibold text-[#12131A]">{file}</span>
            ) : (
              <span>
                Drag an image or <span className="font-semibold text-[#5B3DF5]">browse</span>
              </span>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)}
          />

          <button
            onClick={add}
            disabled={!name.trim()}
            className="mt-3 w-full rounded-lg bg-[#6C4DF5] py-2.5 text-[12px] font-semibold text-white disabled:opacity-50"
          >
            {editId ? "Save changes" : "Add to store"}
          </button>
          {editId && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={reset}
                className="rounded-lg border border-[#12131A]/8 bg-white py-2.5 text-[12px] font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setItems((all) => all.filter((x) => x.id !== editId));
                  reset();
                }}
                className="rounded-lg border border-[#F5B5B5] bg-white py-2.5 text-[12px] font-semibold text-[#B42318]"
              >
                Remove
              </button>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
