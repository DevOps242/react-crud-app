import React from "react";

import classes from './Posts.module.css';

import Post from "./Post/Post";

const Posts = (props) => {
  return (
    <div className={classes.Posts}>
      <Post
        title={props.title}
        category={props.category}
        description={props.description}
        clicked={props.clicked}
        editModal={props.editModal}
        deleted={props.deleted}
      />
    </div>
  );
};

// const Posts = (props) => {
//   console.log(props);
//   return (
//     <Aux>
//       <div>
//         <Post
//           title={props.title}
//           category={props.category}
//           description={props.description}
//           clicked={props.clicked}
//         />
//       </div>
//     </Aux>
//   );
// };

export default Posts;
