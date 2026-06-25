import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Loader2, Plus, Trash2 } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContent } from "@/lib/content-store";

const TOKEN_KEY = "saaspilot_admin_token";

interface SubPhase {
  id: string;
  title: string;
  phaseId: string;
}
interface Phase {
  id: string;
  title: string;
  subPhases: SubPhase[];
}
interface Meta {
  types: string[];
  difficulties: string[];
  phases: Phase[];
}
interface AdminResource {
  id: string;
  slug: string;
  title: string;
  url: string;
  sourceDomain?: string | null;
  type: string;
  primaryPhase: string;
  status: string;
  featured?: boolean;
  clicks?: number;
}

const emptyForm = {
  title: "",
  description: "",
  url: "",
  type: "Guide",
  difficulty: "Beginner",
  estimatedMinutes: 15,
  featured: false,
  status: "published" as "published" | "draft",
  tags: "",
  primaryPhaseId: "",
  subPhaseIds: [] as string[],
};

export function AdminPage() {
  const { refresh: refreshSite } = useContent();
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [list, setList] = useState<AdminResource[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const authHeader = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  // Restore a saved token on load.
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (saved) setToken(saved);
  }, []);

  async function signIn(candidate: string) {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/check", {
        headers: { Authorization: `Bearer ${candidate}` },
      });
      if (!res.ok) throw new Error("Invalid admin token");
      localStorage.setItem(TOKEN_KEY, candidate);
      setToken(candidate);
      setAuthed(true);
      await Promise.all([loadMeta(), loadList(candidate)]);
    } catch (e) {
      setMessage({ kind: "err", text: (e as Error).message });
      setAuthed(false);
    } finally {
      setBusy(false);
    }
  }

  async function loadMeta() {
    const res = await fetch("/api/meta");
    const data: Meta = await res.json();
    setMeta(data);
    setForm((f) => ({ ...f, primaryPhaseId: f.primaryPhaseId || data.phases[0]?.id || "" }));
  }

  async function loadList(tok = token) {
    const res = await fetch("/api/admin/resources", {
      headers: { Authorization: `Bearer ${tok}` },
    });
    if (res.ok) setList(await res.json());
  }

  function toggleSubPhase(id: string) {
    setForm((f) => ({
      ...f,
      subPhaseIds: f.subPhaseIds.includes(id)
        ? f.subPhaseIds.filter((s) => s !== id)
        : [...f.subPhaseIds, id],
    }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const payload = {
        ...form,
        estimatedMinutes: Number(form.estimatedMinutes),
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      const res = await fetch("/api/admin/resources", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          typeof err.error === "string" ? err.error : "Could not save (check required fields)",
        );
      }
      setMessage({ kind: "ok", text: "Link added — it's now live on the site." });
      setForm({ ...emptyForm, primaryPhaseId: meta?.phases[0]?.id || "" });
      await Promise.all([loadList(), refreshSite()]);
    } catch (e) {
      setMessage({ kind: "err", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this link?")) return;
    await fetch(`/api/admin/resources/${id}`, { method: "DELETE", headers: authHeader });
    await Promise.all([loadList(), refreshSite()]);
  }

  const selectedPhase = meta?.phases.find((p) => p.id === form.primaryPhaseId);

  // ---- Sign-in gate --------------------------------------------------------
  if (!authed) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SeoHead title="Admin — SaaSPilot" description="SaaSPilot admin" path="/admin" />
        <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
          <Link to="/" className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
          <h1 className="font-heading text-3xl font-bold">Admin access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the admin token (the <code>ADMIN_TOKEN</code> from your <code>.env</code>).
          </p>
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              signIn(token);
            }}
          >
            <Input
              type="password"
              placeholder="Admin token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <Button type="submit" className="w-full" disabled={busy || !token}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            </Button>
          </form>
          {message && (
            <p className={`mt-4 text-sm ${message.kind === "err" ? "text-rose-400" : "text-emerald-400"}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ---- Dashboard -----------------------------------------------------------
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead title="Admin — SaaSPilot" description="SaaSPilot admin" path="/admin" />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <h1 className="mt-3 font-heading text-3xl font-bold">Curate links</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem(TOKEN_KEY);
              setAuthed(false);
              setToken("");
            }}
          >
            Sign out
          </Button>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
          {/* Add form */}
          <form onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-card/60 p-6">
            <h2 className="font-heading text-lg font-semibold">Add a link</h2>

            <Field label="Title">
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </Field>
            <Field label="Description">
              <textarea
                className="min-h-20 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </Field>
            <Field label="External URL">
              <Input
                type="url"
                placeholder="https://..."
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Type">
                <Select value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={meta?.types ?? []} />
              </Field>
              <Field label="Difficulty">
                <Select
                  value={form.difficulty}
                  onChange={(v) => setForm({ ...form, difficulty: v })}
                  options={meta?.difficulties ?? []}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Minutes">
                <Input
                  type="number"
                  min={1}
                  value={form.estimatedMinutes}
                  onChange={(e) => setForm({ ...form, estimatedMinutes: Number(e.target.value) })}
                />
              </Field>
              <Field label="Status">
                <Select
                  value={form.status}
                  onChange={(v) => setForm({ ...form, status: v as "published" | "draft" })}
                  options={["published", "draft"]}
                />
              </Field>
            </div>

            <Field label="Tags (comma separated)">
              <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </Field>

            <Field label="Phase">
              <Select
                value={form.primaryPhaseId}
                onChange={(v) => setForm({ ...form, primaryPhaseId: v, subPhaseIds: [] })}
                options={(meta?.phases ?? []).map((p) => ({ value: p.id, label: p.title }))}
              />
            </Field>

            {selectedPhase && (
              <Field label="Sub-phases">
                <div className="flex flex-wrap gap-2">
                  {selectedPhase.subPhases.map((sp) => (
                    <button
                      type="button"
                      key={sp.id}
                      onClick={() => toggleSubPhase(sp.id)}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        form.subPhaseIds.includes(sp.id)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {sp.title}
                    </button>
                  ))}
                </div>
              </Field>
            )}

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Feature on homepage
            </label>

            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add link
            </Button>

            {message && (
              <p className={`text-sm ${message.kind === "err" ? "text-rose-400" : "text-emerald-400"}`}>
                {message.text}
              </p>
            )}
          </form>

          {/* Existing links */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold">{list.length} links</h2>
              <Button variant="outline" size="sm" onClick={() => loadList()}>
                Refresh
              </Button>
            </div>
            <div className="space-y-2">
              {list.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">{r.title}</span>
                      {r.featured && <Badge variant="secondary" className="shrink-0">Featured</Badge>}
                      {r.status === "draft" && (
                        <Badge className="shrink-0 border-amber-400/30 bg-amber-400/10 text-amber-300">
                          Draft
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{r.type}</span>
                      <span>{r.primaryPhase}</span>
                      <span>{r.clicks ?? 0} clicks</span>
                      {r.sourceDomain && <span>{r.sourceDomain}</span>}
                    </div>
                  </div>
                  <a
                    href={`/r/${r.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                    title="Open link"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => remove(r.id)}
                    className="text-muted-foreground hover:text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: (string | { value: string; label: string })[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
    >
      {options.map((o) => {
        const opt = typeof o === "string" ? { value: o, label: o } : o;
        return (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
}
