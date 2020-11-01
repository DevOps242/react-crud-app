import React, { Component } from "react";

import classes from "./AddPost.module.css";

import Aux from "../../hoc/Auxillary/Auxillary";
import CustomSelect from '../UI/CustomSelect/CustomSelect';


class AddPost extends Component {

  render() {
    const onSubmit = (event) => {
        event.preventDefault();

        this.props.onAdd(
          this.titleInput.value,
          this.props.value,
          this.descriptionInput.value
        );
        
        this.titleInput.value = "";
        this.descriptionInput.value = "";
      };

    let catergory = null
    if (this.props.categories == null || this.props.categories.length < 1 ) {
        catergory = (
            <div>
              <p style={{ color: "red", textTransform: "capitalize" }}>
                Please Create Category
              </p>
              <CustomSelect 
                label={'Create a Category'}
                options={this.props.categories}/>
            </div>
          );
    }
    
    if (this.props.categories) {
      catergory = (
        <div>
          <span style={{ textAlign: "center" }}>
          
        <CustomSelect 
            options ={this.props.categories}
            label={'Choose a Category'}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            createModal={this.props.createModal}
            changeAddPostHandler={this.props.changeAddPostHandler}
            closeCatCreateModal={this.props.closeCatCreateModal}
            saveCatCreateModal={this.props.saveCatCreateModal} 
            onSubmit={this.onSubmit}
            autoFocus={true}
            value={this.getValue}
        />
          </span>
        </div>
      );
    }

    return (
      <Aux>
        <div className={classes.AddPost}>
          <form onSubmit={this.onSubmit}>
            <h2>Add Post</h2>
            <h5>Title:</h5>
            <input
              placeholder="Title"
              ref={(titleInput) => (this.titleInput = titleInput)}
            />
            {catergory}
            <br />
            <h5>Add a Description</h5>
            <input
              placeholder="Description"
              ref={(descriptionInput) =>
                (this.descriptionInput = descriptionInput)
              }
            />
            <button 
              className={classes.saveButton}
              onClick={onSubmit}>Create Post 
            </button>
            <button 
              className={classes.cancelButton}
              onClick={this.props.cancel}>Cancel Post 
            </button>
          </form>
        </div>
      </Aux>
    );
  }
}
export default AddPost;
