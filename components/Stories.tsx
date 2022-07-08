import React from "react";
import StoryCard from "./StoryCard";

const stories = [
  {
    name: "Redo",
    src: "https://picsum.photos/200/300?random=1",
    profile: "https://picsum.photos/200/200?random=1",
  },
  {
    name: "Redo",
    src: "https://picsum.photos/200/300?random=2",
    profile: "https://picsum.photos/200/200?random=2",
  },
  {
    name: "Redo",
    src: "https://picsum.photos/200/300?random=3",
    profile: "https://picsum.photos/200/200?random=3",
  },
  {
    name: "Redo",
    src: "https://picsum.photos/200/300?random=4",
    profile: "https://picsum.photos/200/200?random=4",
  },
  {
    name: "Redo",
    src: "https://picsum.photos/200/300?random=5",
    profile: "https://picsum.photos/200/200?random=5",
  },
];

const Stories = () => {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories.map((d) => {
        return (
          <StoryCard
            key={d.src}
            name={d.name}
            src={d.src}
            profile={d.profile}
          />
        );
      })}
    </div>
  );
};

export default Stories;
