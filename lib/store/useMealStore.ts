import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Meal {
  id: number
  title: string
  instructions: string
  cuisine: string
  rating: number
  image: string
  mealType: string
}

interface WeekMeals {
  [key: string]: Meal[] 
}

interface MealStore {
  allTabs: number
  selectedMeals: number[]
  allMeals: Meal[]
  weekMeals: WeekMeals
  setAllMeals: (meals: Meal[]) => void
  setAllTabs: (value: number) => void
  selectMeal: (mealId: number) => void
  unselectMeal: (mealId: number) => void
  addToWeek: (weekNumber: number, meals: Meal[]) => void
  removeMealFromWeek: (mealId: number, weekNumber: number) => void
  clearSelection: () => void
  doesMealExistInWeek: (mealId: number, weekNumber: number) => boolean
}

export const useMealStore = create<MealStore>()(
  persist(
    (set, get) => ({
      allTabs: 0,
      selectedMeals: [] as number[],
      allMeals: [] as Meal[],
      weekMeals: {
        week1: [] as Meal[],
        week2: [] as Meal[],
        week3: [] as Meal[],
        week4: [] as Meal[],
      },
      setAllTabs: (value) => set({ allTabs: value }),
      setAllMeals: (meals) => set({ allMeals: meals }),
      selectMeal: (mealId) =>
        set((state) => ({
          selectedMeals: [...state.selectedMeals, mealId],
        })),
      unselectMeal: (mealId) =>
        set((state) => ({
          selectedMeals: state.selectedMeals.filter((id) => id !== mealId),
        })),
      addToWeek: (weekNumber, meals) =>
        set((state) => ({
          weekMeals: {
            ...state.weekMeals,
            [`week${weekNumber}`]: [...state.weekMeals[`week${weekNumber}`], ...meals],
          },
          selectedMeals: [],
          allTabs: weekNumber,
        })),
      removeMealFromWeek: (mealId, weekNumber) =>
        set((state) => ({
          weekMeals: {
            ...state.weekMeals,
            [`week${weekNumber}`]: state.weekMeals[`week${weekNumber}`].filter(meal => meal.id !== mealId),
          },
        })),
      clearSelection: () =>
        set({
          selectedMeals: [],
        }),
      doesMealExistInWeek: (mealId, weekNumber) => {
        const weekKey = `week${weekNumber}`;
        return get().weekMeals[weekKey]?.some(meal => meal.id === mealId) || false;
      }
    }),
    {
      name: 'meal-storage',
    }
  )
) 