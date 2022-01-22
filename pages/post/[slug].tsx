import { GetStaticProps } from "next";
import React, { useState } from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Comment, IFormInput, Post } from "../../typings";
import PortableText from "react-portable-text";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch(() => {
        setSubmitted(false);
      });
  };

  return (
    <main className="h-screen  overflow-hidden overflow-y-scroll bg-gradient-to-t  to-slate-300 from-slate-500 flex-1">
      <Header />
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <img
        className="w-full -mt-32 h-80 object-cover"
        src={urlFor(post.mainImage).url()!}
      />
      <div className="p-8 md:max-w-5xl mx-5  backdrop-blur-lg   md:mx-auto  rounded-xl shadow-xl">
        <article className=" ">
          <h1 className="text-5xl font-semibold mt-10 mb-3">{post.title}</h1>
          <h2 className="text-xl font-light text-gray-900">
            {post.description}
          </h2>
          <div className="flex items-center py-3 space-x-2">
            <img
              src={urlFor(post.author.image).url()!}
              className="h-10 w-10 rounded-full"
            />
            <p className="font-extralight text-sm">
              Blog post by <span className="underline">{post.author.name}</span>{" "}
              - Published at {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-4">
            <PortableText
              className=""
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="text-2xl font-bold my-5" {...props} />
                ),
                h2: (props: any) => (
                  <h2 className="text-xl font-bold my-5" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a
                    href={href}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
      </div>
      <hr className="max-w-7xl my-5 mx-auto border border-gray-500" />
      {/* FORM */}
      {submitted ? (
        <div className="flex flex-col space-y-3 py-10 my-10 max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-center">
            Thank you for submitting your comment! 🎉
          </h3>

          <p className="text-center text-xl">
            Once it been approved,it will appear below!
          </p>
          <p className="text-5xl font-bold text-center">👇</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-3xl mx-auto mb-24"
        >
          <h3 className="text-md text-gray-800">Enjoyed this article?</h3>
          <h2 className="text-3xl font-bold">Leave a comment</h2>
          <hr className=" my-4  border-gray-600" />

          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="block mb-5 rounded-lg">
            <span className="text-gray-800 font-semibold ">Name</span>
            <input
              {...register("name", { required: true })}
              placeholder="Enter Name"
              type="text"
              className="shadow border placeholder:text-gray-500 border-gray-500  py-2 px-3  mt-1 block w-full  outline-none rounded-xl bg-transparent"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-800 font-semibold">Email</span>
            <input
              {...register("email", { required: true })}
              placeholder="Enter Email"
              type="email"
              className="shadow border placeholder:text-gray-500 border-gray-500  py-2 px-3 form-input mt-1 block w-full  outline-none rounded-xl bg-transparent"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-800 font-semibold">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              placeholder="Enter Your Comment"
              rows={4}
              className="shadow border placeholder:text-gray-500 border-gray-500  py-2 px-3 form-input mt-1 block w-full  outline-none rounded-xl bg-transparent "
            />
          </label>

          {/* errorors will return when validation fails  */}
          <div className="flex flex-col p-2">
            {errors.name && <p className="text-red-500">🚨 Name is required</p>}
            {errors.email && (
              <p className="text-red-500">🚨 Email is required</p>
            )}
            {errors.comment && (
              <p className="text-red-500">🚨 Comment is required</p>
            )}
          </div>
          <input
            className="shadow-2xl bg-slate-600 active:scale-0 transition-transform duration-500 ease-out text-white cursor-pointer text-lg py-2 rounded-xl  hover:bg-slate-700 focus:shadow-outline"
            type="submit"
          />
        </form>
      )}
      {/* Comments */}

      <div className="flex-flex-col p-10 px-16 my-10 shadow-2xl rounded-2xl backdrop-blur-2xl max-w-2xl mx-auto">
        <h3 className="text-4xl font-semibold">📜 Comment's </h3>
        <hr className="my-3 border-gray-700" />
        {post.comments.map((comment: Comment) => (
          <div>
            <p>
              🚀{" "}
              <span className="text-xl text-gray-900 font-medium">
                {comment.name} :{" "}
              </span>
              {"       "}
              <span className="text-xl text-gray-900 font-normal">
                {comment.comment}
              </span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const quer = `*[_type == "post"]{
   _id,
   slug {
      current
   }
}`;

  const posts = await sanityClient.fetch(quer);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const quer = `*[_type == "post" && slug.current == $slug][0]{
   _id,
   _createdAt,
   title,
   author -> {
      name,
      image
   },
   'comments': *[
     _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
      description,
      mainImage,
      slug,
      body
}`;

  const post = await sanityClient.fetch(quer, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 900,
  };
};
