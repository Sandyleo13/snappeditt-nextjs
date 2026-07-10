"use client";

import { useState, useEffect } from "react";
import {
  Pencil,
  Diamond,
  Mail,
  Phone,
  CalendarDays,
  User,
  AtSign,
  Lock,
  Shield,
  Monitor,
  ChevronRight,
  X,
  Check,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser]           = useState<any>(null);
  const [password, setPassword]   = useState("");
  const [pwStatus, setPwStatus]   = useState<{ msg: string; ok: boolean } | null>(null);
  const [showPwForm, setShowPwForm] = useState(false);
  const [pwSaving, setPwSaving]   = useState(false);

  // Edit modal state
  const [showEdit, setShowEdit]   = useState(false);
  const [editForm, setEditForm]   = useState({ first_name: "", last_name: "", phone: "" });
  const [editSaving, setEditSaving] = useState(false);
  const [editStatus, setEditStatus] = useState<{ msg: string; ok: boolean } | null>(null);

  // Inline "Update Profile" section state
  const [showInlineEdit, setShowInlineEdit] = useState(false);
  const [inlineForm, setInlineForm] = useState({ first_name: "", last_name: "", phone: "" });
  const [inlineSaving, setInlineSaving] = useState(false);
  const [inlineStatus, setInlineStatus] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setUser(d.user);
          const form = { first_name: d.user.first_name || "", last_name: d.user.last_name || "", phone: d.user.mobile || "" };
          setEditForm(form);
          setInlineForm(form);
        }
      });
  }, []);

  const handleChangePassword = async () => {
    if (!password.trim()) { setPwStatus({ msg: "Enter a new password.", ok: false }); return; }
    setPwSaving(true);
    const res = await fetch("/api/change-password", { method: "POST", body: JSON.stringify({ password }) });
    setPwSaving(false);
    if (res.ok) { setPwStatus({ msg: "Password updated successfully.", ok: true }); setPassword(""); }
    else setPwStatus({ msg: "Unable to update password.", ok: false });
  };

  const saveProfile = async (form: typeof editForm, onSuccess: () => void, setStatus: (s: { msg: string; ok: boolean }) => void, setSaving: (b: boolean) => void) => {
    if (!form.first_name.trim()) { setStatus({ msg: "First name is required.", ok: false }); return; }
    setSaving(true);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setUser((prev: any) => ({ ...prev, first_name: form.first_name, last_name: form.last_name, mobile: form.phone }));
      setStatus({ msg: "Profile updated successfully.", ok: true });
      onSuccess();
    } else {
      setStatus({ msg: "Unable to update profile.", ok: false });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#E53E3E]" />
      </div>
    );
  }

  const joinedDate = new Date(user.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile Overview</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your account details, membership status, and security settings.</p>
        </div>
        <button
          onClick={() => { setShowEdit(true); setEditStatus(null); setEditForm({ first_name: user.first_name || "", last_name: user.last_name || "", phone: user.mobile || "" }); }}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 whitespace-nowrap"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile
        </button>
      </div>

      {/* ── 4 Top Info Cards ── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <TopCard icon={<Diamond className="h-5 w-5 text-[#E53E3E]" />} iconBg="bg-[#FFF1F0]" label="Membership" value="Premium" sub="Priority support" />
        <TopCard icon={<Mail className="h-5 w-5 text-blue-500" />} iconBg="bg-blue-50" label="Email" value={user.email} />
        <TopCard icon={<Phone className="h-5 w-5 text-violet-500" />} iconBg="bg-violet-50" label="Phone" value={user.mobile || "Not provided"} />
        <TopCard icon={<CalendarDays className="h-5 w-5 text-emerald-500" />} iconBg="bg-emerald-50" label="Member Since" value={joinedDate} />
      </div>

      {/* ── Account Details + Security ── */}
      <div className="grid gap-6 xl:grid-cols-[3fr_2fr]">

        {/* Account Details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">Account Details</h2>
            <p className="mt-0.5 text-sm text-slate-500">Your personal details and contact information.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <FieldCard icon={<User className="h-4 w-4 text-slate-400" />}         label="Full Name"     value={`${user.first_name} ${user.last_name}`} />
            <FieldCard icon={<AtSign className="h-4 w-4 text-slate-400" />}       label="Email Address" value={user.email} />
            <FieldCard icon={<Phone className="h-4 w-4 text-slate-400" />}        label="Phone Number"  value={user.mobile || "Not provided"} />
            <FieldCard icon={<CalendarDays className="h-4 w-4 text-slate-400" />} label="Joined On"     value={joinedDate} />
            <FieldCard
              icon={<Shield className="h-4 w-4 text-slate-400" />}
              label="Status" value="Active"
              badge={<span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Active</span>}
            />
          </div>

          {/* Inline edit form (toggled by Update Profile) */}
          {showInlineEdit && (
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <p className="text-sm font-semibold text-slate-800">Edit your details</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <InputField label="First Name" value={inlineForm.first_name} onChange={(v) => setInlineForm((f) => ({ ...f, first_name: v }))} />
                <InputField label="Last Name"  value={inlineForm.last_name}  onChange={(v) => setInlineForm((f) => ({ ...f, last_name: v }))} />
                <InputField label="Phone"      value={inlineForm.phone}      onChange={(v) => setInlineForm((f) => ({ ...f, phone: v }))} placeholder="+1 234 567 8900" className="sm:col-span-2" />
              </div>
              {inlineStatus && (
                <p className={`text-xs font-medium ${inlineStatus.ok ? "text-emerald-600" : "text-red-500"}`}>{inlineStatus.msg}</p>
              )}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => saveProfile(inlineForm, () => setTimeout(() => setShowInlineEdit(false), 1200), setInlineStatus, setInlineSaving)}
                  disabled={inlineSaving}
                  className="flex-1 rounded-xl bg-[#E53E3E] py-2.5 text-sm font-semibold text-white transition hover:bg-[#C53030] disabled:opacity-60"
                >
                  {inlineSaving ? "Saving…" : "Save Changes"}
                </button>
                <button
                  onClick={() => { setShowInlineEdit(false); setInlineStatus(null); }}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* <div className="mt-5">
            <button
              onClick={() => { setShowInlineEdit((v) => !v); setInlineStatus(null); setInlineForm({ first_name: user.first_name || "", last_name: user.last_name || "", phone: user.mobile || "" }); }}
              className="rounded-xl bg-[#E53E3E] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#C53030]"
            >
              {showInlineEdit ? "Cancel Edit" : "Update Profile"}
            </button>
          </div> */}
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">Security</h2>
            <p className="mt-0.5 text-sm text-slate-500">Manage your account security settings.</p>
          </div>

          <div className="space-y-2">
            {/* Change Password */}
            <button
              onClick={() => { setShowPwForm((v) => !v); setPwStatus(null); }}
              className="flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left transition hover:bg-slate-50"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#FFF1F0]">
                <Lock className="h-5 w-5 text-[#E53E3E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">Change Password</p>
                <p className="text-xs text-slate-500">Update your account password</p>
              </div>
              <ChevronRight className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 ${showPwForm ? "rotate-90" : ""}`} />
            </button>

            {showPwForm && (
              <div className="mx-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                <label className="block text-xs font-medium text-slate-700">
                  New Password
                  <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]"
                  />
                </label>
                <div className="mt-3 flex gap-2">
                  <button onClick={handleChangePassword} disabled={pwSaving}
                    className="flex-1 rounded-xl bg-[#E53E3E] py-2.5 text-sm font-semibold text-white transition hover:bg-[#C53030] disabled:opacity-60">
                    {pwSaving ? "Saving…" : "Save Password"}
                  </button>
                  <button onClick={() => { setShowPwForm(false); setPwStatus(null); setPassword(""); }}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                    Cancel
                  </button>
                </div>
                {pwStatus && <p className={`mt-2 text-xs font-medium ${pwStatus.ok ? "text-emerald-600" : "text-red-500"}`}>{pwStatus.msg}</p>}
              </div>
            )}

            <div className="mx-3 border-t border-slate-100" />

            {/* <button className="flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left transition hover:bg-slate-50">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Shield className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Add an extra layer of security</p>
              </div>
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-400" />
            </button> */}

            <div className="mx-3 border-t border-slate-100" />

            <button className="flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left transition hover:bg-slate-50">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                <Monitor className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">Active Sessions</p>
                <p className="text-xs text-slate-500">Manage your active sessions</p>
              </div>
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">© 2026 Snapp Edit&apos;t. All rights reserved.</p>

      {/* ── Edit Profile Modal ── */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Edit Profile</h3>
                <p className="text-xs text-slate-500">Update your personal information</p>
              </div>
              <button onClick={() => setShowEdit(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 transition">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Avatar preview */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F44336] text-xl font-bold text-white">
                  {(editForm.first_name[0] || user.email[0] || "U").toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{editForm.first_name} {editForm.last_name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <InputField label="First Name *" value={editForm.first_name} onChange={(v) => setEditForm((f) => ({ ...f, first_name: v }))} />
                <InputField label="Last Name"    value={editForm.last_name}  onChange={(v) => setEditForm((f) => ({ ...f, last_name: v }))} />
              </div>

              {/* Email — read only */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Email Address</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <AtSign className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-500">{user.email}</span>
                  <span className="ml-auto text-[10px] text-slate-400">Read only</span>
                </div>
              </div>

              <InputField label="Phone Number" value={editForm.phone} onChange={(v) => setEditForm((f) => ({ ...f, phone: v }))} placeholder="+1 234 567 8900" />

              {editStatus && (
                <div className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium ${editStatus.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                  {editStatus.ok ? <Check className="h-3.5 w-3.5" /> : null}
                  {editStatus.msg}
                </div>
              )}
            </div>

            <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
              <button
                onClick={() => saveProfile(editForm, () => setTimeout(() => setShowEdit(false), 1200), setEditStatus, setEditSaving)}
                disabled={editSaving}
                className="flex-1 rounded-xl bg-[#E53E3E] py-3 text-sm font-semibold text-white transition hover:bg-[#C53030] disabled:opacity-60"
              >
                {editSaving ? "Saving…" : "Save Changes"}
              </button>
              <button
                onClick={() => { setShowEdit(false); setEditStatus(null); }}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ──

function TopCard({ icon, iconBg, label, value, sub }: { icon: React.ReactNode; iconBg: string; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>{icon}</div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-base font-bold text-slate-900 leading-snug break-all">{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

function FieldCard({ icon, label, value, badge }: { icon: React.ReactNode; label: string; value: string; badge?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        {badge ?? <p className="mt-0.5 text-sm font-semibold text-slate-900 break-all">{value}</p>}
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, className = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]"
      />
    </div>
  );
}
