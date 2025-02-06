'use client';
import React from "react";
import useSWR from "swr";
import axios from "axios";
import { MealCard, MealCardSkeleton } from "./MealCard";
import { useMealStore } from "@/lib/store/useMealStore";

const fetchMeals = async (url: string, setAllMeals: (meals: any[]) => void) => {
    const response = await axios.get(url);
    if (response.data?.recipes && response.data.recipes.length > 0) {
        const meals = response.data.recipes.map((meal: any) => ({
            id: meal.id,
            title: meal.title,
            instructions: meal.instructions,
            cuisine: meal.cuisine,
            rating: meal.rating,
            mealType: meal.mealType[0],
            image: meal.image
        }));
        setAllMeals(meals);
        return meals;
    }
    return [];
};

const MealListing: React.FC = () => {
    const { allTabs, weekMeals, setAllMeals } = useMealStore();
    const { data, error } = useSWR(
        "https://dummyjson.com/recipes",
        (url) => fetchMeals(url, setAllMeals)
    );

    if (error) return <div>Error loading meals...</div>;
    if (!data) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <MealCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (allTabs === 0) {
        if (data.length === 0) {
            return <div>No meals available.</div>;
        }
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((meal: any) => (
                    <MealCard
                        type="asMeal"
                        key={meal.id}
                        id={meal.id}
                        title={meal.title}
                        instructions={meal.instructions}
                        cuisine={meal.cuisine}
                        rating={meal.rating}
                        mealType={meal.mealType[0]}
                        image={meal.image}
                    />
                ))}
            </div>
        );
    } else if (allTabs >= 1 && allTabs <= 4) {
        const mealsForWeek = weekMeals[`week${allTabs}`] || [];
        if (mealsForWeek.length === 0) {
            return <div>No meals available for this week {allTabs}.</div>;
        }
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mealsForWeek.map((meal) => (
                    <MealCard type="asWeek" weekNumber={allTabs} key={meal.id} {...meal} />
                ))}
            </div>
        );
    }

    return null;
};

export default MealListing;
