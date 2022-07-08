import { NextPage } from "next";
import Image from "next/image";
import React from "react";

interface Props {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  src?: string | undefined | null;
  title: String | null | undefined;
}

const SidebarRow: NextPage<Props> = ({ src, Icon, title }) => {
  return (
    <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
      {src && (
        <Image
          className="rounded-full"
          src={src}
          width={30}
          height={30}
          layout="fixed"
        />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
};

export default SidebarRow;
