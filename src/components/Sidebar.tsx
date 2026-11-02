"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const icon = (d: ReactNode) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {d}
  </svg>
);

const icons = {
  dashboard: icon(
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>,
  ),
  users: icon(
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.2.7 3.5 2.6 3.5 5.7" />
    </>,
  ),
  roles: icon(
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 7.8 8 9 4.6-1.2 8-4.5 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>,
  ),
  applications: icon(
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>,
  ),
  rooms: icon(
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>,
  ),
  finance: icon(
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    </>,
  ),
  gifts: icon(
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
      <path d="M12 8c-1.5-4-5-4.5-5-2s3 2 5 2Zm0 0c1.5-4 5-4.5 5-2s-3 2-5 2Z" />
    </>,
  ),
  engagement: icon(
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14 -1.5 7 5-3 5 3-1.5-7" />
    </>,
  ),
  settings: icon(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </>,
  ),
  logout: icon(
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </>,
  ),
};

type Item = {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: { text: string; tone: "amber" | "green" };
};

const sections: { title: string; items: Item[] }[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/", icon: icons.dashboard }],
  },
  {
    title: "People",
    items: [
      { label: "Users", href: "/users", icon: icons.users },
      { label: "Roles & permissions", href: "/roles", icon: icons.roles },
      {
        label: "Applications",
        href: "/applications",
        icon: icons.applications,
        badge: { text: "12", tone: "amber" },
      },
    ],
  },
  {
    title: "Live",
    items: [
      {
        label: "Rooms",
        href: "/rooms",
        icon: icons.rooms,
        badge: { text: "18", tone: "green" },
      },
    ],
  },
  {
    title: "Economy & content",
    items: [
      { label: "Finance & packages", href: "/finance", icon: icons.finance },
      { label: "Store & gifts", href: "/gifts", icon: icons.gifts },
      { label: "Engagement", href: "/engagement", icon: icons.engagement },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Config & audit log", href: "/settings", icon: icons.settings },
    ],
  },
];

const badgeTone = {
  amber: "bg-[#F5A524] text-[#12131A]",
  green: "bg-transparent px-0 text-[#4ADE80] before:mr-1.5 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#4ADE80] before:align-middle",
};

export default function Sidebar({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-[240px] shrink-0 flex-col overflow-hidden transition-transform duration-200 lg:sticky lg:top-0 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} border-r border-white/5 bg-[#0D0E14] font-[Inter,system-ui,sans-serif] text-[#E8E9F0]`}>
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B3DF5] text-sm font-bold text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z" />
          </svg>
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold">Chatter</p>
          <p className="text-xs text-white/45">Admin console</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => (
          <div key={section.title} className="mt-4 first:mt-0">
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/35">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => onClose?.()}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                        isActive
                          ? "bg-white/10 text-white ring-1 ring-white/5"
                          : "text-white/65 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className={isActive ? "text-[#8B7BFF]" : ""}>
                        {item.icon}
                      </span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeTone[item.badge.tone]}`}
                        >
                          {item.badge.text}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/5 p-3">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5 ring-1 ring-white/5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
            AD
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[13px] font-semibold">[Admin name]</p>
            <p className="text-[11px] text-white/45">ADMIN · Production</p>
          </div>
          <button
            type="button"
            aria-label="Log out"
            className="rounded-md p-1.5 text-white/50 hover:bg-white/5 hover:text-white"
          >
            {icons.logout}
          </button>
        </div>
      </div>
    </aside>
  );
}
