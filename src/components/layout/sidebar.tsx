"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { NAV } from "@/lib/nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAppStore } from "@/lib/store/app-store";
import { SignOutButton } from "@/components/layout/sign-out-button";

export function Sidebar({ userEmail }: { userEmail: string | null }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { inbox } = useAppStore();

  return (
    <nav
      className={clsx(
        "sticky top-0 flex h-screen flex-none flex-col gap-7 border-r border-border-soft py-6 transition-[width,padding] duration-200",
        collapsed ? "w-[76px] px-3.5" : "w-[220px] px-4"
      )}
    >
      <div className="flex items-center gap-2.5 px-1.5">
        <div className="grad-temp-bg h-[30px] w-[30px] flex-none rounded-[9px] shadow-[0_4px_14px_-4px_var(--grad-temp-glow)]" />
        {!collapsed && (
          <span className="whitespace-nowrap font-display text-[15.5px] font-bold">
            Business OS
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 whitespace-nowrap rounded-[11px] px-3 py-2.5 text-sm font-semibold transition-colors",
                collapsed && "justify-center px-2.5",
                active
                  ? "bg-surface text-ink shadow-[var(--shadow-sm)]"
                  : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              )}
            >
              <Icon className={clsx("h-[18px] w-[18px] flex-none", active ? "opacity-100" : "opacity-85")} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.href === "/eingang" && inbox.length > 0 && (
                <span className="grad-temp-bg ml-auto h-[7px] w-[7px] flex-none rounded-full" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-2.5">
        {!collapsed && userEmail && (
          <div className="truncate px-1 text-[11px] font-semibold text-ink-3" title={userEmail}>
            {userEmail}
          </div>
        )}
        <ThemeToggle collapsed={collapsed} />
        <SignOutButton collapsed={collapsed} />
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="flex items-center justify-center gap-2 rounded-[10px] border border-border-soft bg-surface px-2 py-2 text-xs font-semibold text-ink-3 hover:text-ink"
        >
          <span>⟨⟩</span>
          {!collapsed && <span>Einklappen</span>}
        </button>
      </div>
    </nav>
  );
}
