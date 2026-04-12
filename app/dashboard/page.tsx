import { SearchEngine } from "@/components/search-engine";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          What would you like to learn?
        </h1>
        <p className="text-muted-foreground">
          Ask any question in English, Mandarin, or Malay — we&apos;ll help you understand.
        </p>
      </div>

      <SearchEngine />
    </div>
  );
}
