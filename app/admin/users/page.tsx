"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, Users, ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers]   = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);
  const [total, setTotal]   = useState(0);
  const [pages, setPages]   = useState(0);
  const [loading, setLoading] = useState(true);

  const loadUsers = () => {
    setLoading(true);
    fetch(`/api/admin/users?page=${page}&search=${search}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) { setUsers(d.users); setTotal(d.total); setPages(d.pages); }
        setLoading(false);
      });
  };

  useEffect(() => { loadUsers(); }, [page, search]);

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    if ((await res.json()).success) loadUsers();
  };

  const colors = ["bg-[#E53E3E]", "bg-blue-500", "bg-teal-500", "bg-violet-500", "bg-amber-500", "bg-emerald-500"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage registered customer accounts.</p>
        </div>
        <button onClick={loadUsers}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Stat card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1F0] mb-3">
            <Users className="h-5 w-5 text-[#E53E3E]" />
          </div>
          <p className="text-xs text-slate-500 font-medium">Total Users</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{total}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search by name or email…"
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]" />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-[#E53E3E]" />
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
          <AlertCircle className="h-10 w-10 text-slate-300 mb-3" />
          <p className="text-sm font-medium text-slate-600">No users found</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">User</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Mobile</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Joined</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user, i) => {
                  const initials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() || "U";
                  return (
                    <tr key={user.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 flex-shrink-0 rounded-full ${colors[i % colors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                            {initials}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{user.first_name} {user.last_name}</p>
                            <p className="text-xs text-slate-400">ID #{user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{user.email}</td>
                      <td className="py-3 px-4 text-slate-600">{user.phone || <span className="text-slate-300">—</span>}</td>
                      <td className="py-3 px-4 text-slate-500">{new Date(user.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                      <td className="py-3 px-4">
                        <button onClick={() => deleteUser(user.id)}
                          className="flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition">
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500">
              Showing <span className="font-medium text-slate-700">{users.length}</span> of <span className="font-medium text-slate-700">{total}</span> users
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-slate-600 font-medium px-2">Page {page} of {pages}</span>
              <button onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
