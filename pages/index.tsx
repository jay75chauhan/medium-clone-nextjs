import Head from "next/head";
import Link from "next/link";
import Baner from "../components/Baner";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll ">
      <Head>
        <title>M Blog</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="max-w-7xl mx-auto">
        <Baner />

        <div className="grid grid-cols-1 mt-10 md:mt-3 mx-3  md:mx-0 rounded-2xl sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 p-4 lg:p-0">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group my-4   cursor-pointer  rounded-lg shadow-2xl overflow-hidden">
                <img
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()!}
                />
                <div className="flex justify-between py-3 px-6 bg-white">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-sm">
                      {post.description} by {post.author.name}
                    </p>
                  </div>

                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(post.author.image).url()!}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const quer = `*[_type == "post"]{
   _id,
   title,
   author -> {
   name,
   image
  },

 description,
 mainImage,
 slug
}`;
  const posts = await sanityClient.fetch(quer);

  return {
    props: {
      posts,
    },
  };
};
