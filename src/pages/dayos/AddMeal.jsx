import React from "react";
import Header from "../../components/navigation/Header";
import Form from "../../components/dayos/Form";

const AddMeal = () => {
  return (
    <div className="flex flex-col gap-5">
      <Header />

      <div className="container w-11/12 mx-auto">
        <header>
          <h2 className="text-xl md:text-3xl font-semibold">Create New Meal</h2>
          <p className="text-sm text-gray-800"> Orgnise your healthy routine with a new recipe</p>
        </header>

        <Form />
      </div>
    </div>
  );
};

export default AddMeal;
