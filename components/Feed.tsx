import { NextPage } from "next";
import React from "react";
import InputBox from "./InputBox";
import Posts from "./Posts";
import Stories from "./Stories";
import postProps from "../type/posts.type";

interface Props {
  posts: postProps[];
}

const Feed: NextPage<Props> = ({ posts }) => {
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        {/* stories */}
        <Stories />
        {/* InputBox */}
        <InputBox />
        {/* Posts */}
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Feed;
