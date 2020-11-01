import React from "react";

import Aux from "../../../hoc/Auxillary/Auxillary";

import classes from "./Post.module.css";

const Post = (props) => {
  return (
    <Aux>
      <div className={classes.Post}>
        <h2>
          Title:{" "}
          <span>
            <u>{props.title}</u>
          </span>
        </h2>
        <h4>Category: {props.category}</h4>
        <h6>Description: {props.description}</h6>
        <button 
          className= {classes.editButton}
          onClick={props.editModal}> Edit Post 
        </button>
        <button 
          className={classes.deleteButton}
          onClick={props.deleted}> Delete Post
        </button>
      </div>
    </Aux>
  );
};

export default Post;
