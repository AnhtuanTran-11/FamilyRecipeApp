import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function EachRecipe(props) {
  const { id } = useParams();
  const newID = parseInt(id);
  const [recipe] = useState(props.userData.recipes);
  console.log(recipe);

  if (!recipe) {
    return <div>Loading recipe information...</div>;
  }

  let recip = recipe.filter((r) => {
    return r.id === newID;
  });

  console.log(recip);

  return (
    <div>
      {recip.map((r, i) => (
        <section key={i}>
          <h1> Recipe Title: {r.title}</h1>
          <br />
          <p> Created by: {r.createdBy}</p>
          <br />
          <p>Categories:</p>
          {r.categories.map((c, i) => (
            <p key={i}>{c.category}</p>
          ))}
          <br />
          <p>Ingredients:</p>
          {r.ingredients.map((i) => (
            <p key={i.id}>{i.name}</p>
          ))}
          <br />
          <p>Instructions</p>
          {r.instructions.map((i) => (
            <p key={i.id}>{i.text}</p>
          ))}
          <br />
          <p>Keywords:</p>
          {r.keyworkds ? r.keyworkds : "You did not set any keywords"}
          <br />
          <br />
          <p>Private Recipe: {r.private === 0 ? "Not Private" : "Private"}</p>
          <br />
          <p> Source: {r.source}</p>
        </section>
      ))}
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(EachRecipe);