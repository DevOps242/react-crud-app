
import React, { Component } from "react";

import Aux from "../../hoc/Auxillary/Auxillary";
import classes from "./EditPost.module.css";

import CustomSelect from '../UI/CustomSelect/CustomSelect';

class EditPost extends Component {
// const EditPost = (props) => {
  render(){

    const onSubmit = (event) => {
      event.preventDefault();
  
      
    };

    const editSummary = (
      <div>
        <h5>
          <span style={{ textTransform: "capitalize" }}>
            Post#: {this.props.posts.id}
          </span>
        </h5>{" "}
        <h4>Title: </h4>
        <input
          type="text"
          value={this.props.posts.title}
          onChange={this.props.editingTitle}
        />
        <h4>Category:</h4>
        <CustomSelect  />
        
        <h4>Description:</h4>
        <input
          type="text"
          value={this.props.posts.description}
          onChange={this.props.editingDescription}
        />
      </div>
    );


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
                  defaultValue={this.props.posts.catergory}
                  createModal={this.props.createModal}
                  changeAddPostHandler={this.props.changeAddPostHandler}
                  closeCatCreateModal={this.props.closeCatCreateModal}
                  saveCatCreateModal={this.props.saveCatCreateModal} 
                  autoFocus={true}
                  
              />
            </span>
          </div>
        );
      }
    return (
        <Aux>
          <div className={classes.EditPost}>
            <form >
              <h2>Edit Post</h2>
              <h5>Title:</h5>
              <input
                placeholder="Title"
                value={this.props.posts.title}
                onChange={(e) => this.props.editingTitle( e, this.props.postValue)}
              />
              {catergory}
              <br />
              <h5>Add a Description</h5>
              <input
                placeholder="Description"
                onChange={(e) => this.props.editingDescription( e, this.props.postValue)}
                value={this.props.posts.description}
              />
              <button 
                onClick={this.props.cancel} 
                className={classes.saveButton}>Save
              </button> 
            </form>
          </div>
      </Aux>
    );
  };
  }

export default EditPost;

