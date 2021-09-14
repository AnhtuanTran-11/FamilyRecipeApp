import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import { deleteRecipe } from "../store/actions";
import styled from "styled-components";
import image from "../images/bg.jpg";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecipeWrapper = styled.div`
  padding: 1.5rem;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const imgStyleObject = {
  border: "2px dashed goldenrod",
  display: "border-box",
  width: "100%",
};

const headerStyleObject = {
  fontSize: "2.5rem",
  fontFamily: "Shadows Into Light, cursive",
  fontWeight: "bold",
  marginBottom: "0.5rem",
};

const cardLeftStyleObject = {
  fontSize: "1rem",
  padding: "1.5rem",
  maxWidth: "33%",
  overflow: "hidden",
};

const cardRightStyleObject = {
  padding: "1.5rem",
  width: "100%",
  borderLeft: "2px dashed skyblue",
};

const sectionStyleObject = {
  border: "2px dashed #49BF9D",
  display: "flex",
  width: "100%",
};

const labelStyleObject = {
  fontSize: "1.6rem",
  fontFamily: "Shadows Into Light, cursive",
  backgroundColor: "tan",
  display: "inline-block",
  opacity: "80%",
  marginTop: "1rem",
  marginBottom: "0.5rem",
  fontWeight: "bold",
};

const subHeaderStyleObject = {
  fontFamily: "Parisienne, cursive",
};

const paragraphStyleObject = {
  fontFamily: "Caveat, cursive",
  fontSize: "1.4rem",
};

const iconStyleObject = {
  margin: "1rem 0.5rem",
};

function EachRecipe(props) {
  const { push } = useHistory();
  const { id } = useParams();
  const newID = parseInt(id);
  const [recipe] = useState(props.userData.recipes);
  console.log(recipe);
  console.log(props);

  if (!recipe) {
    return <div>Loading recipe information...</div>;
  }

  let recip = recipe.filter((r) => {
    return r.id === newID;
  });

  console.log(recip);
  const editClick = () => {
    push(`/dashboard/recipe/edit/${id}`);
  };

  const deleteHandler = (e) => {
    console.log("clicked");
    console.log(recip[0]); //obj {id:18}
    console.log(id); //18
    axiosWithAuth()
      .delete(`/api/recipes/${recip[0].id}`)
      .then((res) => {
        console.log(res);
        axiosWithAuth()
          .get(`/api/user/${recipe[0].userID}/recipes`) //USER ID
          .then((res) => {
            console.log(res);
            props.deleteRecipe(res.data);
            push("/dashboard");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIconHover = (event) => {
    event.target.style["color"] = "#49BF9D";
    event.target.style["border-color"] = "#49BF9D";
    event.target.style["background-color"] = "white";
    event.target.style["cursor"] = "pointer";
  };

  const handleIconLeave = (event) => {
    event.target.style["color"] = "black";
    event.target.style["border-color"] = "black";
    event.target.style["background-color"] = "#FFFFFF";
  };

  return (
    <div>
      <RecipeWrapper>
        {recip.map((r, i) => (
          <section style={sectionStyleObject} key={i}>
            <div className="cardLeft" style={cardLeftStyleObject}>
              <h1 style={headerStyleObject}> {r.title}</h1>
              <p style={subHeaderStyleObject}> courtesy of {r.source},</p>
              <p style={subHeaderStyleObject}>
                {" "}
                crafted with love by {r.createdBy}.
              </p>
              <br />
              <img src={image} alt="meal" style={imgStyleObject}></img>
            </div>

            <div className="cardRight" style={cardRightStyleObject}>
              <p style={labelStyleObject}>Categories</p>
              {r.categories.map((c, i) => (
                <p style={paragraphStyleObject} key={i}>
                  {c.category}
                </p>
              ))}
              <br />
              <p style={labelStyleObject}>Ingredients</p>
              {r.ingredients.map((i) => (
                <p style={paragraphStyleObject} key={i.id}>
                  {i.name}
                </p>
              ))}
              <br />
              <p style={labelStyleObject}>Instructions</p>
              {r.instructions.map((i) => (
                <p style={paragraphStyleObject} key={i.id}>
                  {i.text}
                </p>
              ))}
              <br />
              <p style={labelStyleObject}>Keywords:</p>
              <br />
              {r.keywords ? r.keywords : "You did not set any keywords"}
              <br />
              <br />
              <p style={labelStyleObject}>
                This recipe is {r.private === 0 ? "Not Private" : "Private"}
              </p>
              <br />

              <div
                style={iconStyleObject}
                // icon={faEdit}
                className="fa-2x"
                onClick={editClick}
                onMouseOver={handleIconHover}
                onMouseOut={handleIconLeave}
              />
              <di
                style={iconStyleObject}
                // icon={faTrash}
                className="fa-2x"
                onClick={deleteHandler}
                onMouseOver={handleIconHover}
                onMouseOut={handleIconLeave}
              />
              <i className="fal fa-edit"></i>
            </div>
          </section>
        ))}
      </RecipeWrapper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps, { deleteRecipe })(EachRecipe);
