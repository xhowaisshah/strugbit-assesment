export function HeroSection() {
  return (
    <div
      className="relative h-[300px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn.dummyjson.com/recipe-images/1.webp')",
        backgroundPosition: "center 25%",
      }}
    >
      <div className="absolute inset-0 bg-black/50">
        <div className="container text-center mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-black mb-4">Optimize Your Meal</h1>
          <p className="text-black/90">
            Select Meal to Add in Week. You will be able to edit, modify and change the Meal Weeks.
          </p>
        </div>
      </div>
    </div>
  )
} 