import {
  DotsHorizontalIcon,
  SearchIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import Contact from "./Contact";

const contacts = [
  { src: "https://picsum.photos/400/400?random=1", name: "Redo Sains" },
  { src: "https://picsum.photos/400/400?random=2", name: "First Friend" },
  { src: "https://picsum.photos/400/400?random=3", name: "Second Friend" },
  { src: "https://picsum.photos/400/400?random=4", name: "Third" },
  { src: "https://picsum.photos/400/400?random=5", name: "Fourth" },
  { src: "https://picsum.photos/400/400?random=6", name: "Fifth" },
  { src: "https://picsum.photos/400/400?random=7", name: "Sixth" },
];

const Widgets = () => {
  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>
      {contacts.map((d) => {
        return <Contact key={d.src} src={d.src} name={d.name} />;
      })}
    </div>
  );
};

export default Widgets;
