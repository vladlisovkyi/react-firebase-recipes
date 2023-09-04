import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const EditRecipeForm = ({ recipe, onCancel, setRecipes }) => {
  const [editedRecipe, setEditedRecipe] = useState(recipe);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({
      ...editedRecipe,
      [name]: value,
    });
  };

  const handleUpdateRecipe = async () => {
    try {
      const recipeDataToUpdate = {
        name: editedRecipe.name,
        ingredients: editedRecipe.ingredients,
        directions: editedRecipe.directions,
      };

      if (imageFile) {
        const imageRef = ref(storage, `recipes/${recipe.id}/image`);
        await uploadString(imageRef, imageFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        recipeDataToUpdate.image = downloadURL;
      }

      await updateDoc(doc(db, "recipes", recipe.id), recipeDataToUpdate);
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === editedRecipe.id ? editedRecipe : recipe
        )
      );
      onCancel();
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (readerEvent) => {
        const dataURL = readerEvent.target.result;
        setImageFile(dataURL);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateRecipe();
  };

  return (
    <form onSubmit={handleSubmit} className="text-black">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Name of Dish
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name of Dish..."
          className="border rounded-lg px-4 py-2 w-full outline-none text-gray-900"
          value={editedRecipe.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Ingredients
        </label>
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients..."
          className="border rounded-lg px-4 py-2 w-full outline-none text-gray-900"
          value={editedRecipe.ingredients}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Directions</label>
        <textarea
          name="directions"
          placeholder="Directions..."
          className="border rounded-lg px-4 py-2 w-full outline-none text-gray-900"
          value={editedRecipe.directions}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Current Image
        </label>
        <img
          src={editedRecipe.image}
          width={120}
          height={120}
          alt={editedRecipe.name}
        />
      </div>
      <div className="mb-4">
        <label>Image</label>
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </div>
      <div className="flex gap-5">
        <button type="submit" className="btn-primary">
          Update Recipe
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-white px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;
