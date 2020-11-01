import React, { Component } from "react";

import classes from './Blog.module.css';

import Posts from "../../components/Posts/Posts";
import Modal from "../../components/UI/Modal/Modal";
import EditPost from "../../components/EditPost/EditPost";
import AddPost from "../../components/AddPost/AddPost";

// const posts = [
//   {
//     name: "IPad",
//     price: 200,
//     category: "Tablet"
//   },
//   {
//     name: "IPhone",
//     price: 600,
//     category: "Phone"
//   }
// ];

// localStorage.setItem("posts", JSON.stringify(posts));

class Blog extends Component {
  state = {
    posts: [
      {
        id: 0,
        title: "Web Developer 101",
        category: "HTML / CSS",
        description: "HAPPY CODING!"
      },
      {
        id: 1,
        title: "Intro to React.js",
        category: "React",
        description: "HAPPY CODING!"
      }
    ],
    categories: [
        {label: 'Create New Category', value:'cnc'},
        {label:'React', value:'react'},
        // {label: 'ReactNative', value: 'react-native'},
        // {label: 'JavaScript', value: 'js'},
        // {label: 'CSS', value:'css'}
    ],
    addModal: false,
    editModal: false,
    target: null,
    targetCat: null,
    catModal: false,
    test: null
  };

  // Return the state or can use [...]
  getPosts() {
    return this.state.posts;
  }

// -----------------------------Category Post Sections  Start --------------------------------
  deletePostHandler = (postIndex) => {
    const posts = [...this.state.posts];
    posts.splice(postIndex, 1);
    this.setState({ posts: posts });
  };
// -----------------------------Delete Post Sections  END --------------------------------

// -----------------------------Add Post Sections  END --------------------------------
  createPost = (title, newCat, description) => {
    const posts = this.getPosts();
    // Need to insert an ID here  id will be the next post up

    const category = newCat

    posts.push({
      title,
      category,
      description
    });
    this.setState({ posts });
    this.closeAddPostHandler();
  };

  newPostHandler = () => {
    this.setState({
      addModal: true
    });
  };

  closeAddPostHandler = () => {
    this.setState({
      addModal: false
    });
  };
// -----------------------------Add Post Sections  END --------------------------------

// -----------------------------Edit Post Sections  Start --------------------------------
  openEditPostHandler = (postIndex) => {
    this.setState({ editModal: true, target: postIndex });
  };

  closeEditPostModalHandler = () => {
    this.setState({ editModal: false, target: null });
  };

  inputUpdateTitle = (event, index) => {
    const posts = [...this.state.posts]
    const targetPost = posts[index]
    console.log('hello')
    const updateTitle = targetPost.title = event.target.value
   
    this.setState({
      updateTitle
    })
  };

  inputUpdateDescription = (event, index) => {
    const posts = [...this.state.posts]
    const targetPost = posts[index]
    const updateDescription = targetPost.description = event.target.value
   
    this.setState({
      updateDescription
    })
  };

  inputUpdateCategory = (event, index, data) => {
    const posts = [...this.state.posts]
    const targetPost = posts[index]
    const updateCategory = targetPost.category = data
  
    this.setState({
      updateCategory
    })
  };
// -----------------------------Edit Post Sections  END --------------------------------
  
// -----------------------------Category Add Modal Sections  Start --------------------------------
  changeAddCatHandler = (value, event) => {
      const createButton = this.state.categories[0]['label']
      console.log(value)
      try {
        const newData = []
        let cleanData = null
        if (value.length > 1) {
          
          const data = value.map(val => {
            const newLocal = val['label'];
            newData.push(newLocal)
            if (createButton == newLocal || value.includes(newLocal['Create New Category']))
            {
                this.setState({ catModal: true}) 
            } else 
            {
              this.setState({ catModal: false})
              // console.log(value);
              cleanData = newData.join(' | ')
              if (this.state.editModal){
                this.inputUpdateCategory(event, this.state.target, cleanData)
              }
            }
            return newLocal;
          })
          
        }

        if (createButton == value[0].label || value.includes(createButton) )
        {
            this.setState({ catModal: true})
        } else 
        {
          this.setState({ catModal: false})

          if (this.state.editModal && value.length < 2){
            this.inputUpdateCategory(event, this.state.target, value[0]['label'])
          }
        }
        
        if (value.length > 1) {
          cleanData = newData.join(' | ')
          this.setState({targetCat: cleanData })
        }
        else {
          this.setState({targetCat: value[0]['label'] })
        }

      } catch(error) {
        console.log(error)
      }
  };

  saveCatCreateModal = (data) => {
    const categories = [...this.state.categories]

    // Block duplicate data
    if (!categories.includes(data)){
        categories.push({
            label: data, value: data});
    };

    this.setState({
        categories : categories,
        catModal: false
    });
  };
 
  closeCatCreateModal = (event) =>{
      event.preventDefault();
      this.setState({catModal: false})
  };
//   -----------------------------Category Add Modal Sections  End --------------------------------

  render() {
    let posts = null;

    if (this.state.posts) {
      posts = (
        <div>
          {this.state.posts.map((post, index) => {
            return (
              <Posts
                key={post.id}
                title={post.title}
                category={post.category}
                description={post.description}
                deleted={() => this.deletePostHandler(index)}
                editModal={() => this.openEditPostHandler(index)}
              />
            );
          })}
        </div>
      );
    }

    let editModal = null;

    if (this.state.editModal) {
      editModal = (
        <div>
          <Modal>
            <EditPost
              onChange={this.changeAddCatHandler}
              posts={this.state.posts[this.state.target]}
              postValue={this.state.target}
              editingDescription={this.inputUpdateDescription}
              editingTitle={this.inputUpdateTitle}
              cancel={this.closeEditPostModalHandler}
              categories={this.state.categories}
              createCat={this.createCat}
              changeAddPostHandler={this.state.catModal}
              saveCatCreateModal={this.saveCatCreateModal}
              value={this.state.targetCat}
              closeCatCreateModal={this.closeCatCreateModal}
            />
          </Modal>
        </div>
      );
    }

    let addModal = null;

    if (this.state.addModal) {
      addModal = (
        <div>
          <Modal>
            <AddPost
              categories={this.state.categories}
              cancel={this.closeAddPostHandler}
              onAdd={this.createPost}
              createCat={this.createCat}
              onChange={this.changeAddCatHandler}
              defaultValue={this.state.categories[-1]}
              changeAddPostHandler={this.state.catModal}
              closeCatCreateModal={this.closeCatCreateModal}
              saveCatCreateModal={this.saveCatCreateModal}
              value={this.state.targetCat}
            />
          </Modal>
        </div>
      );
    }

    return (
      <div className={classes.Blog}>
        {posts}
        {editModal}
        {addModal}
        <button 
          className={classes.addButton} 
          onClick={this.newPostHandler}>Add New Post
        </button>
      </div>
    );
  }
}

export default Blog;
