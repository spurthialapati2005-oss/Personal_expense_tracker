import React, { useEffect, useState } from "react";
import { useFinanceContext } from "../context/FinanceContext";

const Profile = () => {
  const { user, updateProfile, savingProfile } = useFinanceContext();

  const [form, setForm] = useState({
    username: user?.username || "",
    number: user?.number || "",
    monthlyIncome: user?.monthlyIncome || 0
  });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        number: user.number || "",
        monthlyIncome: user.monthlyIncome || 0
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProfile({
      ...form,
      monthlyIncome: Number(form.monthlyIncome)
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Profile
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Keep your account and income details up to date.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Username
          </label>

          <input
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Phone Number
          </label>

          <input
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none"
            value={form.number}
            onChange={(e) =>
              setForm({
                ...form,
                number: e.target.value
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Monthly Income
          </label>

          <input
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none"
            type="number"
            value={form.monthlyIncome}
            onChange={(e) =>
              setForm({
                ...form,
                monthlyIncome: e.target.value
              })
            }
          />
        </div>

        <button
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-70 transition"
          disabled={savingProfile}
        >
          {savingProfile ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;