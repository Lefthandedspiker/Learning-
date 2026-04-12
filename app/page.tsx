import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="text-xl font-heading font-bold text-foreground">
              StudyBuddy
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-foreground font-medium hover:text-primary transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/auth/sign-up"
              className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-all"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Designed for SJKC students
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 text-balance leading-tight">
            Study Smarter, <br />
            <span className="text-primary">Not Harder</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            Bridge the language gap with AI-powered study tools. Get help with
            homework, translate scientific terms, and prepare for exams — all in
            one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all text-lg"
            >
              Start Learning Free
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-all text-lg"
            >
              See Features
            </Link>
          </div>

          {/* Demo Search */}
          <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-muted-foreground">
                Try: &quot;What is photosynthesis?&quot; or &quot;Explain quadratic equations&quot;
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                Smart Translate
              </span>
              <span className="px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg text-sm font-medium">
                Homework Mode
              </span>
              <span className="px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                Exam Prep
              </span>
              <span className="px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-sm font-medium">
                Video Summary
              </span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-muted/50 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Powerful AI tools designed specifically for students who need help
              bridging language barriers in their studies.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                }
                title="Smart Translate"
                description="Translate complex terms between English, Mandarin, and Malay with context-aware explanations."
                color="primary"
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                }
                title="Homework Mode"
                description="Get step-by-step help with your homework. Learn the process, not just the answers."
                color="secondary"
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                }
                title="Exam Prep"
                description="Practice with AI-generated questions and get instant feedback on your answers."
                color="accent"
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                title="Video Summary"
                description="Paste a YouTube link and get key points summarized in your preferred language."
                color="muted"
              />
            </div>
          </div>
        </section>

        {/* Gamification Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Earn Flex Points
                </h3>
                <p className="text-muted-foreground">
                  Complete challenges and earn points to level up your profile
                  and unlock achievements.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Climb Leaderboards
                </h3>
                <p className="text-muted-foreground">
                  Compete with friends and classmates to see who can learn the
                  most each week.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Study Squads
                </h3>
                <p className="text-muted-foreground">
                  Form study groups with friends to share results and learn
                  together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Ready to Study Smarter?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Join thousands of students who are already learning better with
              StudyBuddy.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-block px-8 py-4 bg-card text-foreground font-semibold rounded-xl hover:opacity-90 transition-all text-lg"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2026 StudyBuddy. Made with care for students everywhere.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "secondary" | "accent" | "muted";
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    muted: "bg-muted text-muted-foreground",
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[color]}`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
