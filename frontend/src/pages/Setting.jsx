import React from "react";
import {
  Moon,
  Bell,
  LayoutGrid,
  Sparkles,
  Mail,
  CalendarDays,
  Sun
} from "lucide-react";
import { useFinanceContext } from "../context/FinanceContext";

const Setting = () => {
  const { settings, updateSettings } = useFinanceContext();

  const ToggleRow = ({
    icon: Icon,
    title,
    description,
    checked,
    onChange
  }) => (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="rounded-xl bg-indigo-50 dark:bg-slate-800 p-3 text-indigo-600 dark:text-indigo-400">
          <Icon size={18} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 dark:text-white">
            {title}
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-7 w-12 rounded-full transition-colors ${
          checked
            ? "bg-indigo-600"
            : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Settings
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Control the app experience with real preferences instead of
          developer-only info.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h2 className="font-bold text-slate-800 dark:text-white mb-4">
              Appearance
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateSettings({ theme: "light" })}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  settings.theme === "light"
                    ? "border-indigo-600 bg-indigo-50 dark:bg-slate-800"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <Sun size={18} className="mb-2 text-amber-500" />

                <p className="font-semibold text-slate-800 dark:text-white">
                  Light
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Clean daytime theme
                </p>
              </button>

              <button
                onClick={() => updateSettings({ theme: "dark" })}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  settings.theme === "dark"
                    ? "border-indigo-600 bg-indigo-50 dark:bg-slate-800"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <Moon size={18} className="mb-2 text-slate-700 dark:text-white" />

                <p className="font-semibold text-slate-800 dark:text-white">
                  Dark
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Low-light dashboard mode
                </p>
              </button>
            </div>
          </div>

          <ToggleRow
            icon={LayoutGrid}
            title="Compact Layout"
            description="Reduce spacing and fit more cards and tables on screen."
            checked={settings.compactMode}
            onChange={() =>
              updateSettings({
                compactMode: !settings.compactMode
              })
            }
          />

          <ToggleRow
            icon={Sparkles}
            title="AI Suggestions"
            description="Show expense-management recommendations inside analytics."
            checked={settings.showAIInsights}
            onChange={() =>
              updateSettings({
                showAIInsights: !settings.showAIInsights
              })
            }
          />
        </div>

        <div className="space-y-4">
          <ToggleRow
            icon={Bell}
            title="Push Notifications"
            description="Enable reminder and alert banners inside the app."
            checked={settings.notifications}
            onChange={() =>
              updateSettings({
                notifications: !settings.notifications
              })
            }
          />

          <ToggleRow
            icon={Mail}
            title="Email Summaries"
            description="Keep this on if you want future weekly summary support."
            checked={settings.emailSummaries}
            onChange={() =>
              updateSettings({
                emailSummaries: !settings.emailSummaries
              })
            }
          />

          <div className="rounded-3xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-indigo-50 dark:bg-slate-800 p-3 text-indigo-600 dark:text-indigo-400">
                <CalendarDays size={18} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800 dark:text-white">
                  Calendar Preference
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Choose how planning views should start the week.
                </p>
              </div>
            </div>

            <select
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-800 dark:text-white"
              value={settings.startWeekOn}
              onChange={(e) =>
                updateSettings({
                  startWeekOn: e.target.value
                })
              }
            >
              <option value="monday">Start week on Monday</option>
              <option value="sunday">Start week on Sunday</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;