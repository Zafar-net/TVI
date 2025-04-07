import { BMICalculator } from "@/components/bmi-calculator"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Tana vazni indeksi (TVI) kalkulyatori</h1>
      <BMICalculator />
    </main>
  )
}

