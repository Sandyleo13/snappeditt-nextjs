"use client";

import { useEffect, useState, type ReactNode } from "react";
import { User, Mail, Phone, CalendarCheck, Lock, RefreshCw, Eye, EyeOff, Monitor } from "lucide-react";

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [showPwForm, setShowPwForm] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/me');
        const data = await res.json();
        if (data.success) {
          setProfile(data.admin ?? null);
          setName(data.admin?.name ?? "");
          setEmail(data.admin?.email ?? "");
        }
      } catch (error) {
        console.error('Failed to load admin profile', error);
      }
      setLoading(false);
    }

    loadProfile();
  }, []);

  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "Unknown";

  const saveProfile = async () => {
    if (!name.trim() || !email.trim()) {
      setSaveMessage('Name and email are required.');
      return;
    }

    setSaving(true);
    setSaveMessage(null);

    const res = await fetch('/api/admin/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim() }),
    });
    const data = await res.json();
    if (data.success) {
      setSaveMessage('Profile updated successfully.');
      setProfile({ ...profile, name: name.trim(), email: email.trim() });
    } else {
      setSaveMessage(data.error ?? 'Unable to update profile.');
    }
    setSaving(false);
  };

  const resetPassword = async () => {
    if (!newPassword) {
      setPasswordMessage('New password is required.');
      return;
    }

    setPasswordSaving(true);
    setPasswordMessage(null);

    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword }),
    });
    const data = await res.json();
    if (data.success) {
      setPasswordMessage('Password updated successfully.');
      setNewPassword('');
    } else {
      setPasswordMessage(data.error ?? 'Unable to reset password.');
    }
    setPasswordSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-heading)]">Profile Overview</h1>
          <p className="mt-1 text-sm text-[var(--text-paragraph)]">Manage your account details, membership status, and security settings.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--white)] px-4 py-2.5 text-sm font-semibold text-[var(--text-heading)] transition hover:bg-[var(--background)]"
        >
          <RefreshCw className="h-4 w-4 text-[var(--primary)]" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <TopCard icon={<User className="h-5 w-5 text-[#E53E3E]" />} iconBg="bg-[#FFF1F0]" label="Membership" value="Premium" sub="Priority support" />
        <TopCard icon={<Mail className="h-5 w-5 text-blue-500" />} iconBg="bg-blue-50" label="Email" value={email || profile?.email || "Not set"} />
        <TopCard icon={<Phone className="h-5 w-5 text-violet-500" />} iconBg="bg-violet-50" label="Phone" value={"+1 (555) 123-4567"} />
        <TopCard icon={<CalendarCheck className="h-5 w-5 text-emerald-500" />} iconBg="bg-emerald-50" label="Member Since" value={joinedDate} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[3fr_2fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--white)] p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[var(--text-heading)]">Account Details</h2>
            <p className="mt-1 text-sm text-[var(--text-paragraph)]">Your personal details and contact information.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <FieldCard icon={<User className="h-4 w-4 text-slate-400" />} label="Full Name" value={name || profile?.name || "Admin"} />
            <FieldCard icon={<Mail className="h-4 w-4 text-slate-400" />} label="Email Address" value={email || profile?.email || "Not set"} />
            <FieldCard icon={<Phone className="h-4 w-4 text-slate-400" />} label="Phone Number" value={"+1 (555) 123-4567"} />
            <FieldCard icon={<CalendarCheck className="h-4 w-4 text-slate-400" />} label="Joined On" value={joinedDate} />
            <FieldCard
              icon={<Lock className="h-4 w-4 text-slate-400" />}
              label="Status"
              value=""
              badge={<span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Active</span>}
            />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <InputField label="Name" value={name} onChange={setName} />
            <InputField label="Email Address" value={email} onChange={setEmail} />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--white)] transition hover:bg-[var(--primary-dark)] disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            {saveMessage && <p className="text-sm text-[var(--text-paragraph)]">{saveMessage}</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--white)] p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[var(--text-heading)]">Security</h2>
            <p className="mt-1 text-sm text-[var(--text-paragraph)]">Manage your account security settings.</p>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowPwForm((prev) => !prev)}
              className="flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left transition hover:bg-[var(--background)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1F0]">
                <Lock className="h-5 w-5 text-[#E53E3E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-heading)]">Change Password</p>
                <p className="text-xs text-[var(--text-paragraph)]">Update your account password</p>
              </div>
            </button>

            {showPwForm && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                <label className="block text-xs font-medium text-[var(--text-heading)]">
                  New Password
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--white)] px-3 py-2.5 text-sm text-[var(--text-heading)] outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                  />
                </label>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={resetPassword}
                    disabled={passwordSaving}
                    className="flex-1 rounded-xl bg-[var(--primary)] py-2.5 text-sm font-semibold text-[var(--white)] transition hover:bg-[var(--primary-dark)] disabled:opacity-60"
                  >
                    {passwordSaving ? 'Saving…' : 'Save Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowPwForm(false); setPasswordMessage(null); }}
                    className="rounded-xl border border-[var(--border)] bg-[var(--white)] px-4 py-2.5 text-sm font-semibold text-[var(--text-heading)] transition hover:bg-[var(--background)]"
                  >
                    Cancel
                  </button>
                </div>
                {passwordMessage && <p className="mt-3 text-xs text-[var(--text-paragraph)]">{passwordMessage}</p>}
              </div>
            )}

            <div className="h-px bg-[var(--border)]" />

            <button className="flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left transition hover:bg-[var(--background)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF5]">
                <Monitor className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-heading)]">Active Sessions</p>
                <p className="text-xs text-[var(--text-paragraph)]">Manage your active sessions</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-[var(--text-paragraph)]">© 2026 Snapp Edit&apos;t. All rights reserved.</p>
    </div>
  );
}

function TopCard({ icon, iconBg, label, value, sub }: { icon: ReactNode; iconBg: string; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--white)] p-5">
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>{icon}</div>
      <p className="text-xs font-medium text-[var(--text-paragraph)]">{label}</p>
      <p className="mt-1 text-base font-bold text-[var(--text-heading)] leading-snug break-all">{value}</p>
      {sub && <p className="mt-1 text-xs text-[var(--text-paragraph)]">{sub}</p>}
    </div>
  );
}

function FieldCard({ icon, label, value, badge }: { icon: ReactNode; label: string; value: string; badge?: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-4">
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--white)] border border-[var(--border)]">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[var(--text-paragraph)]">{label}</p>
        {badge ?? <p className="mt-0.5 text-sm font-semibold text-[var(--text-heading)] break-all">{value}</p>}
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, className = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-medium text-[var(--text-paragraph)]">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--white)] px-3 py-2.5 text-sm text-[var(--text-heading)] outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
      />
    </div>
  );
}
