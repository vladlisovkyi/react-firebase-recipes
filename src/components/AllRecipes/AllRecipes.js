import React, { useEffect, useState } from "react";
import Recipe from "../Recipe/Recipe";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Modal from "../UI/Modal";
import CreateRecipe from "../CreateRecipe/CreateRecipe";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesCollection = collection(db, "recipes");
        const querySnapshot = await getDocs(recipesCollection);

        const recipesData = [];
        querySnapshot.forEach((doc) => {
          const recipe = doc.data();
          recipesData.push({ id: doc.id, ...recipe });
        });

        setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);
  const addNewRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };
  return (
    <section className="section">
      <h3 className="text-center text-3xl mt-10">All Recipes of today:</h3>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-8">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} {...recipe} setRecipes={setRecipes} />
        ))}
      </div>
      <button
        className="btn-primary fixed bottom-10 left-[50%] -translate-x-[50%]"
        onClick={() => setIsOpen(true)}
      >
        Add new
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateRecipe addNewRecipe={addNewRecipe}/>
      </Modal>
    </section>
  );
};

export default AllRecipes;
