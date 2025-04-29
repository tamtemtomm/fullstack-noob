import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import Post from "./Post";

export interface Posts {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<Posts[] | null>(null);
  
  useEffect(() => {
    const getPosts = async () => {
      const postsRef = collection(db, "posts");
      const data = await getDocs(postsRef);
      setPostsList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Posts[]
      );
    };
    getPosts();
  }, []);

  return (
    <div>
      {postsList?.map((post) => (
        <Post  post={post}/>
      ))}
    </div>
  );
};

export default Main