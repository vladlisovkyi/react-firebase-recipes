import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import EditRecipeForm from "../EditRecipeForm/EditRecipeForm";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Modal from "../UI/Modal";
import { useAuth } from "../../context/AuthContext";

const Recipe = ({
  name,
  ingredients,
  image,
  directions,
  username,
  id,
  setRecipes,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(null);
  const { currentUser } = useAuth();

  const handleEdit = (recipe) => {
    setIsModalOpen(true);
    setEditedRecipe(recipe);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedRecipe(null);
  };

  const handleDelete = async (id) => {
    try {
      if (currentUser.email !== username)
        return alert("You're not the creator of this recipe.");
      await deleteDoc(doc(db, "recipes", id));
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const truncateDirections = (directions, symbols) => {
    if (directions.length > symbols) {
      return `${directions.slice(0, symbols)}...`;
    }
    return directions;
  };

  const truncatedDirections = truncateDirections(directions, 300);
  const directionsArray = truncatedDirections.split("\n").filter(Boolean);

  const recipe = { name, ingredients, image, directions, username, id };

  return (
    <>
      <div className="sm:flex rounded-md overflow-hidden border p-2 group ">
        <div className="min-w-[120px]">
          <img
            className="max-w-full w-full sm:w-[120px] max-h-60 sm:max-h-none object-cover h-full"
            alt="pizza"
            width={120}
            height={120}
            src={image}
          />
        </div>
        <div className="px-1 sm:px-4 relative">
          <p className="text-xl mb-2 font-semibold">{name}</p>
          <div className="text-sm">
            <span className="pr-1 font-medium">Ingredients:</span>
            {ingredients}
          </div>
          <div className="text-sm">
            <span className="pr-1 font-medium">Directions:</span>
            {directionsArray.map((direction, i) => (
              <p key={i}>
                Step <span className="font-medium"> {i + 1}</span>: {direction}
              </p>
            ))}
          </div>
          <div className="absolute top-[50%] translate-y-[-50%] overflow-hidden right-0 translate-x-[1000%] group-hover:translate-x-0 transition-transform duration-700 rounded-lg bg-slate-200 flex flex-col justify-center items-center">
            <button
              className="px-3 py-2 bg-orange-100 hover:bg-orange-200 transition-colors duration-150"
              onClick={handleEdit}
            >
              <MdEdit className="text-orange-400" size={24} />
            </button>
            <button
              className="px-3 py-2 bg-red-100 hover:bg-red-200 transition-colors duration-150"
              onClick={() => handleDelete(id)}
            >
              <MdDelete className="text-red-400" size={24} />
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {editedRecipe && (
          <EditRecipeForm
            recipe={recipe}
            onCancel={closeModal}
            setRecipes={setRecipes}
          />
        )}
      </Modal>
    </>
  );
};

export default Recipe;
