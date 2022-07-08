import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { NextPage } from "next";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";
import postProps from "../type/posts.type";

interface Props {
  posts: postProps[];
}

const Posts: NextPage<Props> = ({ posts }) => {
  const [realtimePosts, loading, error] = useCollection(
    query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );
  return (
    <div>
      {realtimePosts
        ? realtimePosts?.docs.map((doc) => (
            <Post
              key={doc.id}
              name={doc.data().name}
              message={doc.data().message}
              email={doc.data().email}
              timestamp={doc.data().timestamp}
              image={doc.data().image}
              postImage={doc.data().postImage}
            />
          ))
        : posts.map((doc) => (
            <Post
              key={doc.id}
              name={doc.name}
              message={doc.message}
              email={doc.email}
              timestamp={doc.timestamp}
              image={doc.image}
              postImage={doc.postImage}
            />
          ))}
    </div>
  );
};

export default Posts;
