import Posts from "./Posts";

const posts = [
  {
    id: 1,
    owner: "Adesanmi Dada",
    pic: "",
    comments: "2",
    likes: "4",
    thepost:
      "This is a post. This is simply for testing the possibilities that can be attained by this app. I'm so happy to be building this. It gives me some sort of overview over the my current cappabilites. Hence, reinforcing the belief I have in myself.",
  },
  {
    id: 2,
    owner: "Adesanmi Dada",
    pic: "",
    comments: "2",
    likes: "4",
    thepost:
      "This is a post. This is simply for testing the possibilities that can be attained by this app. I'm so happy to be building this. It gives me some sort of overview over the my current cappabilites. Hence, reinforcing the belief I have in myself.",
  },
  {
    id: 3,
    owner: "Adesanmi Dada",
    pic: "",
    comments: "2",
    likes: "4",
    thepost:
      "This is a post. This is simply for testing the possibilities that can be attained by this app. I'm so happy to be building this. It gives me some sort of overview over the my current cappabilites. Hence, reinforcing the belief I have in myself.",
  },
];

const Post = () => {
  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default Post;
