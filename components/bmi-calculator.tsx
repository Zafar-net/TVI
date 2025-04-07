"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { getBMICategory, calculateBMI, getCategoryColor } from "@/lib/bmi-utils"

export function BMICalculator() {
  const [age, setAge] = useState<number | "">("")
  const [height, setHeight] = useState<number | "">("")
  const [weight, setWeight] = useState<number | "">("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [categoryColor, setCategoryColor] = useState<string | null>(null)
  const [ageGroup, setAgeGroup] = useState<string | null>(null)

  const handleCalculate = () => {
    if (age === "" || height === "" || weight === "") {
      return
    }

    // Determine age group
    let group = ""
    if (age >= 18 && age < 25) {
      group = "18-25"
    } else if (age >= 25 && age < 45) {
      group = "25-45"
    } else if (age >= 45) {
      group = "45+"
    } else {
      alert("Yosh 18 dan katta bo'lishi kerak")
      return
    }

    setAgeGroup(group)

    // Calculate BMI
    const bmiValue = calculateBMI(weight, height)
    setBmi(bmiValue)

    // Get BMI category based on age group
    const bmiCategory = getBMICategory(bmiValue, group)
    setCategory(bmiCategory)

    // Get color for the category
    const color = getCategoryColor(bmiCategory)
    setCategoryColor(color)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="text-center">Tana vazni indeksini hisoblash</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">Yosh</Label>
            <Input
              id="age"
              type="number"
              min="18"
              placeholder="Yoshingizni kiriting"
              value={age}
              onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Bo'y (sm)</Label>
            <Input
              id="height"
              type="number"
              min="100"
              max="250"
              placeholder="Bo'yingizni kiriting (sm)"
              value={height}
              onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Og'irlik (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              min="30"
              max="300"
              placeholder="Og'irligingizni kiriting (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
          <Button className="w-full" onClick={handleCalculate} disabled={age === "" || height === "" || weight === ""}>
            Hisoblash
          </Button>
        </CardContent>
      </Card>

      {bmi !== null && category && categoryColor && (
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-center">Natija ({ageGroup} yosh guruhi)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              {/* BMI Value Display */}
              <div className="w-40 h-40 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: categoryColor }}>
                <div className="text-center">
                  <p className="text-white text-sm font-medium">Sizning TVI</p>
                  <p className="text-white text-4xl font-bold">{bmi.toFixed(1)}</p>
                </div>
              </div>
              
              {/* Category Display */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: categoryColor }}></div>
                  <h3 className="text-2xl font-bold" style={{ color: categoryColor }}>
                    {category}
                  </h3>
                </div>
                
                {/* Recommendations */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Tavsiyalar:</h4>
                  <p className="text-sm">{getBMIRecommendation(category)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Helper function to get recommendations based on BMI category
function getBMIRecommendation(category: string): string {
  switch (category) {
    case "Oziqlanishning yetishmovchiligi":
      return "Sog'lom ovqatlanishni ko'paytiring va shifokor bilan maslahatlashing. Vazn qo'shish uchun oqsil va sog'lom yog'larni ko'proq iste'mol qiling."
    case "Oziqlanishning pasayishi":
      return "Sog'lom ovqatlanishni ko'paytiring. Kunlik kaloriya miqdorini oshiring va muntazam jismoniy mashqlar bilan shug'ullaning."
    case "Me'yordagi tana vazni":
      return "Siz sog'lom vaznga egasiz. Sog'lom ovqatlanish va jismoniy faollikni davom ettiring."
    case "Oziqlanishning yuqoriligi":
      return "Vazn yo'qotish uchun ovqatlanish rejimingizni nazorat qiling va jismoniy faollikni oshiring."
    case "I darajali semizlik":
      return "Vazn yo'qotish uchun ovqatlanish rejimingizni o'zgartiring va muntazam jismoniy mashqlar bilan shug'ullaning. Shifokor bilan maslahatlashish tavsiya etiladi."
    case "II darajali semizlik":
      return "Shifokor nazorati ostida vazn yo'qotish rejasini boshlang. Ovqatlanish va jismoniy faollikni nazorat qilish muhim."
    case "III darajali semizlik":
      return "Zudlik bilan shifokorga murojaat qiling. Tibbiy nazorat ostida vazn yo'qotish rejasini boshlash zarur."
    default:
      return "Sog'lom turmush tarzi va muvozanatli ovqatlanishni saqlang."
  }
}

