"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddOrderToWeek } from "./addOrderToWeek"
import { useMealStore } from "@/lib/store/useMealStore"

export function WeekSelector() {
  const { /* weekMeals, */ setAllTabs, allTabs } = useMealStore()

  const handleSetTab = (tabNumber: number) => {
    setAllTabs(tabNumber)
  }

  return (
    <div className="sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between mb-8 bg-white py-4 md:py-8 px-4 md:px-6 rounded-md shadow-md">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full bg-white flex flex-wrap md:flex-nowrap">
          <TabsTrigger onClick={() => handleSetTab(0)} value="all" className="flex-1 relative">
            All Meals
            {allTabs === 0 && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />}
          </TabsTrigger>
          {[1, 2, 3, 4].map((week) => (
            <TabsTrigger onClick={() => handleSetTab(week)} key={week} value={`week${week}`} className="flex-1 relative">
              Week {week}
              {allTabs === week && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <AddOrderToWeek />
    </div>
  )
} 