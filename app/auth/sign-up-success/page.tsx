import Link from "next/link";

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-heading font-bold text-foreground mb-3">
            Check Your Email
          </h1>

          <p className="text-muted-foreground mb-6">
            {"We've sent you a confirmation email. Please click the link in the email to verify your account and start learning!"}
          </p>

          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="block w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all text-center"
            >
              Go to Login
            </Link>

            <p className="text-sm text-muted-foreground">
              {"Didn't receive the email? Check your spam folder."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
