import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground px-3 py-1.5 font-bold text-sm tracking-wider">
              THE FLEX
            </div>
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
              className="px-4 py-2 bg-primary text-primary-foreground font-bold text-sm tracking-wider hover:opacity-90 transition-all"
            >
              SIGN UP FREE
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Designed for SJKC students
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span>ASK </span>
            <span className="italic">ANYTHING</span>
            <span>.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Bridge the language gap with AI-powered study tools. Get help with
            homework, translate scientific terms, and prepare for exams — all in
            one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-primary text-primary-foreground font-bold tracking-wider hover:opacity-90 transition-all text-lg"
            >
              START FLEXING FREE
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 border border-border text-foreground font-bold tracking-wider hover:border-primary transition-all text-lg"
            >
              SEE FEATURES
            </Link>
          </div>

          {/* Demo Search */}
          <div className="max-w-2xl mx-auto bg-card rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 p-4 bg-input rounded border border-border">
              <span className="text-muted-foreground">
                Try: &quot;What is fire?&quot; or &quot;Explain photosynthesis&quot;
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1.5 bg-card border border-border text-foreground rounded text-sm font-bold tracking-wider">
                SMART TRANSLATE
              </span>
              <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm font-bold tracking-wider">
                HOMEWORK MODE
              </span>
              <span className="px-3 py-1.5 bg-card border border-border text-foreground rounded text-sm font-bold tracking-wider">
                EXAM PREP
              </span>
              <span className="px-3 py-1.5 bg-card border border-border text-foreground rounded text-sm font-bold tracking-wider">
                VIDEO SUMMARIES
              </span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-card py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
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
              />
            </div>
          </div>
        </section>

        {/* Gamification Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Earn Flex Points
                </h3>
                <p className="text-muted-foreground">
                  Complete challenges and earn points to level up your profile
                  and unlock achievements.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Climb Leaderboards
                </h3>
                <p className="text-muted-foreground">
                  Compete with friends and classmates to see who can learn the
                  most each week.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded flex items-center justify-center mx-auto mb-4">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Start Flexing?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Join thousands of students who are already learning better with
              THE FLEX.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-block px-8 py-4 bg-background text-foreground font-bold tracking-wider hover:opacity-90 transition-all text-lg"
            >
              GET STARTED FREE
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2026 THE FLEX. Made with care for students everywhere.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background rounded-lg border border-border p-6 hover:border-primary transition-colors">
      <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
