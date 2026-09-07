import { LoginForm } from "@/components/cms/login-form";

export const metadata = { title: "CMS Login — Unbound Folk", robots: { index: false } };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-white">UF</span>
          <p className="mt-1 text-sm text-zinc-400">Content Management</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
