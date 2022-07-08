import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

function Login() {
  // const { data: session } = useSession();

  return (
    <div className="grid place-items-center">
      <Image
        src="https://links.papareact.com/t4i"
        height={400}
        width={400}
        objectFit="contain"
      />
      <h1
        onClick={() => {
          signIn();
        }}
        className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer"
      >
        Login With Facebook
      </h1>
    </div>
  );
}

export default Login;
