import { collection, getDocs, orderBy, query } from "firebase/firestore";
import type { NextPage, GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { db } from "../firebase";
import postProps from "../type/posts.type";

interface Props {
  session: Session | null;
  posts: postProps[];
}

const Home: NextPage<Props> = (props: Props) => {
  const { posts } = props;
  return !props.session ? (
    <Login />
  ) : (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const posts = await getDocs(
    query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: {
      session: session,
      posts: docs,
    },
  };
};
