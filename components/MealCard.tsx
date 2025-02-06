"use client"

import { Star, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { Skeleton } from "./ui/skeleton"
import { useMealStore } from "@/lib/store/useMealStore"

interface MealCardProps {
  type: 'asMeal' | 'asWeek'
  weekNumber?: number
  id: number
  title: string
  instructions: string
  cuisine: string
  rating: number
  image: string
  mealType: string
}

export function MealCardSkeleton() {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Skeleton className="h-full w-full object-cover rounded-t-lg" />
        </div>
        <CardHeader>
          <Skeleton className="h-6 w-2/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </CardContent>
      </Card>
  )}

export function MealCard({ type, id, title, instructions, cuisine, mealType, rating, image, weekNumber }: MealCardProps) {
  const { selectedMeals, selectMeal, unselectMeal, removeMealFromWeek } = useMealStore()
  const isSelected = selectedMeals.includes(id)

  const handleSelect = () => {
    if (type === 'asMeal') {
      if (isSelected) {
        unselectMeal(id)
      } else {
        selectMeal(id)
      }
    }
  }

  const handleRemove = () => {
    if (type === 'asWeek' && weekNumber) {
      removeMealFromWeek(id, weekNumber) // Assuming week number is 1 for this example
    }
  }

  return (
    <Card
      className={cn("cursor-pointer transition-all hover:shadow-lg", isSelected && "ring-2 ring-blue-600")}
      onClick={handleSelect}
    >
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} fill alt="lunch image" className="h-full w-full object-cover rounded-t-lg" />
        <span className="absolute top-2 right-2 bg-black text-white px-3 py-1 text-sm rounded">{mealType}</span>
        {type === 'asWeek' && (
          <Trash2 className="absolute top-2 left-2 text-white bg-red-600 p-1 rounded-full cursor-pointer" onClick={handleRemove} />
        )}
      </div>
      <CardHeader>
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{instructions}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Cuisine:</span>
            <span className="text-sm text-gray-600">{cuisine}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Rating:</span>
            <span className="text-sm text-gray-600">{rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 