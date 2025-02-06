import { HeroSection } from "@/components/HeroSection";
import MealListing from "@/components/mealListing";
import { WeekSelector } from "@/components/WeekSelector";
export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <HeroSection />

            {/* Week Orders Section */}
            <div className="container mx-auto px-4 py-8">
                <WeekSelector />
                <MealListing />
            </div>
        </div>
    );
}
