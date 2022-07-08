import { NextPage } from "next";
import Image from "next/image";

interface Props {
  src: string | undefined;
  name: string | undefined;
}

const Contact: NextPage<Props> = ({ src, name }) => {
  return (
    <div className="flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
      <Image
        className="rounded-full"
        src={src as string}
        objectFit="cover"
        width={50}
        height={50}
        layout="fixed"
      />
      <p>{name}</p>
      <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full " />
    </div>
  );
};

export default Contact;
