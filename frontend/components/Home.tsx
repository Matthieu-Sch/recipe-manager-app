import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  interface Recipe {
    id: number;
    title: string;
    image: string;
    instructions: string;
    ingredients: string[];
  }
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&includeNutrition=true`
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération");
        }

        const data = await response.json();
        setRecipes(data.results || []);
        console.log(data);
      } catch (error) {}
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>Bienvenue sur le site</h2>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img
              src={recipe.image}
              alt={recipe.title}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
