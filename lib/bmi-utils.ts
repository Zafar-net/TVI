// BMI calculation function
export function calculateBMI(weight: number, height: number): number {
  // Convert height from cm to m
  const heightInMeters = height / 100
  // Calculate BMI: weight (kg) / height² (m²)
  return weight / (heightInMeters * heightInMeters)
}

// Function to determine BMI category based on age group
export function getBMICategory(bmi: number, ageGroup: string): string {
  // Round BMI to 2 decimal places for more accurate category determination
  const roundedBMI = Math.round(bmi * 100) / 100

  if (ageGroup === "18-25") {
    if (roundedBMI < 16.5) {
      return "Oziqlanishning yetishmovchiligi"
    } else if (roundedBMI < 18.5) {
      return "Oziqlanishning pasayishi"
    } else if (roundedBMI < 24.5) {
      return "Me'yordagi tana vazni"
    } else if (roundedBMI < 29.5) {
      return "Oziqlanishning yuqoriligi"
    } else if (roundedBMI < 33.5) {
      return "I darajali semizlik"
    } else if (roundedBMI < 38.5) {
      return "II darajali semizlik"
    } else {
      return "III darajali semizlik"
    }
  } else if (ageGroup === "25-45") {
    if (roundedBMI < 17.0) {
      return "Oziqlanishning yetishmovchiligi"
    } else if (roundedBMI < 19.0) {
      return "Oziqlanishning pasayishi"
    } else if (roundedBMI < 25.0) {
      return "Me'yordagi tana vazni"
    } else if (roundedBMI < 30.0) {
      return "Oziqlanishning yuqoriligi"
    } else if (roundedBMI < 35.0) {
      return "I darajali semizlik"
    } else if (roundedBMI < 40.0) {
      return "II darajali semizlik"
    } else {
      return "III darajali semizlik"
    }
  } else {
    // 45+
    if (roundedBMI < 17.5) {
      return "Oziqlanishning yetishmovchiligi"
    } else if (roundedBMI < 20.0) {
      return "Oziqlanishning pasayishi"
    } else if (roundedBMI < 26.0) {
      return "Me'yordagi tana vazni"
    } else if (roundedBMI < 31.0) {
      return "Oziqlanishning yuqoriligi"
    } else if (roundedBMI < 36.0) {
      return "I darajali semizlik"
    } else if (roundedBMI < 41.0) {
      return "II darajali semizlik"
    } else {
      return "III darajali semizlik"
    }
  }
}

// Function to get color based on BMI category
export function getCategoryColor(category: string): string {
  switch (category) {
    case "Oziqlanishning yetishmovchiligi":
      return "#003366" // Dark blue
    case "Oziqlanishning pasayishi":
      return "#0073e6" // Blue
    case "Me'yordagi tana vazni":
      return "#28a745" // Green
    case "Oziqlanishning yuqoriligi":
      return "#ffc107" // Yellow
    case "I darajali semizlik":
      return "#ff8c00" // Dark yellow
    case "II darajali semizlik":
      return "#dc3545" // Red
    case "III darajali semizlik":
      return "#8b0000" // Dark red
    default:
      return "#000000" // Black
  }
}

