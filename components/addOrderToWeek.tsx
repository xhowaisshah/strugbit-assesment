"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMealStore } from "@/lib/store/useMealStore"
import { CheckCircle } from "lucide-react"

export function AddOrderToWeek() {
  const [open, setOpen] = useState(false)
  const { selectedMeals, addToWeek, clearSelection, allMeals, doesMealExistInWeek } = useMealStore()
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)

  const handleSave = () => {
    if (selectedWeek) {
      addToWeek(selectedWeek, allMeals.filter(meal => selectedMeals.includes(meal.id)))
      setOpen(false)
      clearSelection()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        className="ml-4 bg-blue-900 hover:bg-blue-800 text-white px-8 py-2 rounded-sm font-bold"
        disabled={selectedMeals.length === 0}
      >
        Add to Week ({selectedMeals.length})
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">Select Week</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 justify-center p-4">
          {[1, 2, 3, 4].map((week) => {
            const isMealInWeek = selectedMeals.some(mealId => doesMealExistInWeek(mealId, week))
            return (
              <Button
                key={week}
                variant={selectedWeek === week ? "default" : "outline"}
                className={cn(
                  "flex-1 min-w-[100px]",
                  selectedWeek === week && "bg-blue-100 text-blue-900 hover:bg-blue-200",
                  isMealInWeek && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !isMealInWeek && setSelectedWeek(week)}
                disabled={isMealInWeek}
              >
                Week {week} {isMealInWeek && <CheckCircle className="inline-block ml-2 text-green-500" />}
              </Button>
            )
          })}
        </div>
        <div className="flex justify-center mt-4">
          <Button 
            className="w-full bg-blue-900 hover:bg-blue-800" 
            onClick={handleSave}
            disabled={!selectedWeek}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
