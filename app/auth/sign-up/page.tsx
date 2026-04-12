"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    age: "",
    birthday: "",
    location: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
        data: {
          username: formData.username,
          age: formData.age ? parseInt(formData.age) : null,
          birthday: formData.birthday || null,
          location: formData.location || null,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/auth/sign-up-success");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="bg-primary text-primary-foreground px-4 py-2 font-bold text-lg tracking-wider">
              THE FLEX
            </div>
          </Link>
          <p className="text-muted-foreground">
            Create your account and start flexing!
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-8">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-foreground mb-2 tracking-wider"
              >
                EMAIL <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-xs font-bold text-foreground mb-2 tracking-wider"
              >
                USERNAME <span className="text-destructive">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                placeholder="Choose a username"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="age"
                  className="block text-xs font-bold text-foreground mb-2 tracking-wider"
                >
                  AGE
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="5"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                  placeholder="Your age"
                />
              </div>

              <div>
                <label
                  htmlFor="birthday"
                  className="block text-xs font-bold text-foreground mb-2 tracking-wider"
                >
                  BIRTHDAY
                </label>
                <input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-xs font-bold text-foreground mb-2 tracking-wider"
              >
                LOCATION
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                placeholder="e.g. Kuala Lumpur, Malaysia"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-foreground mb-2 tracking-wider"
              >
                PASSWORD <span className="text-destructive">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-bold text-foreground mb-2 tracking-wider"
              >
                CONFIRM PASSWORD <span className="text-destructive">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                placeholder="Confirm your password"
              />
            </div>

            {error && (
              <div className="p-3 rounded bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary text-primary-foreground font-bold tracking-wider hover:opacity-90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary font-bold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
