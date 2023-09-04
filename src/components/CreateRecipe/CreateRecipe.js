import React, { useState } from "react";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
import { db, storage } from "../../config/firebase";

const CreateRecipe = ({ addNewRecipe }) => {
  const { currentUser } = useAuth();
  const [recipeData, setRecipeData] = useState({
    name: "",
    ingredients: "",
    directions: "",
    imageFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (readerEvent) => {
        const dataURL = readerEvent.target.result;

        setRecipeData({
          ...recipeData,
          imageFile: dataURL,
        });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, ingredients, directions, imageFile } = recipeData;

    if (!name || !ingredients || !directions || !imageFile) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "recipes"), {
        name,
        ingredients,
        directions,
        username: currentUser?.email,
        timestamp: serverTimestamp(),
      });

      const imageRef = ref(storage, `recipes/${docRef.id}/image`);
      await uploadString(imageRef, imageFile, "data_url");

      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "recipes", docRef.id), {
        image: downloadURL,
      });

      const newRecipe = {
        id: docRef.id,
        name,
        ingredients,
        directions,
        image: downloadURL,
      };
      addNewRecipe(newRecipe);

      setRecipeData({
        name: "",
        ingredients: "",
        directions: "",
        imageFile: null,
      });

      alert("Recipe uploaded successfully!");
    } catch (error) {
      console.error("Error uploading recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Name of Dish
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name of Dish..."
          className="border rounded-lg px-4 py-2 w-full outline-none text-gray-900"
          value={recipeData.name}
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
          value={recipeData.ingredients}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Directions</label>
        <textarea
          name="directions"
          placeholder="Directions..."
          className="border rounded-lg px-4 py-2 w-full outline-none text-gray-900"
          value={recipeData.directions}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label>Image</label>
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </div>
      <button type="submit" className="btn-primary mt-4">
        Upload Recipe
      </button>
    </form>
  );
};

export default CreateRecipe;
