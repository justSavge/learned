import { createContext, useContext, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
const PostContext = createContext();
function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }
  const value = useMemo(
    function () {
      return {
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
        onAddPost: handleAddPost,
      };
    },
    [searchQuery, searchedPosts]
  );
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
function useLJEZContext() {
  const posts = useContext(PostContext);
  if (posts === undefined)
    throw new Error(
      "你使用的useLJEZContext只能在其包含的子组件下使用，这也是useContext的基本规则"
    );
  return posts;
}
export { PostProvider, useLJEZContext };
