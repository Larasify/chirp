import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

import { api } from "~/utils/api";

import Image from "next/image";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { Footer } from "~/components/footer";

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors?.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0], {
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      } else {
        toast.error("Failed to post", {
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="flex w-full items-center gap-3">
      <Image
        src={user.profileImageUrl}
        alt="Profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type something!"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            mutate({ content: input });
          }
        }}
        disabled={isPosting}
      />
      {!isPosting && (
        <button
          onClick={() => {
            mutate({ content: input });
          }}
          disabled={input == ""}
          className="h-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:bg-blue-900"
        >
          {" "}
          Post{" "}
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center pr-5">
          <LoadingSpinner size={30} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  //Related to scrolling
  const [contentHover, setContentHover] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScrolling = (event: { deltaY: number }) => {
      if (contentRef !== null) {
        if (contentHover === false) {
          contentRef.current!.scrollTop += event.deltaY;
        }
      }
    };

    window.addEventListener("wheel", handleScrolling);
    //console.log("added wheel listener");

    return () => {
      window.removeEventListener("wheel", handleScrolling);
      //console.log("removed wheel listener");
    };
  });

  if (postsLoading) {
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );
  }
  if (!data) {
    return <div>No posts!</div>;
  }
  return (
    <div
      className="flex grow flex-col overflow-y-scroll"
      ref={contentRef}
      onMouseEnter={() => {
        setContentHover(true);
      }}
      onMouseLeave={() => {
        setContentHover(false);
      }}
    >
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  //start fetching instantly react query you only need to fetch data once it will use the same data as long as its the same it will use cached data
  api.posts.getAll.useQuery();

  if (!userLoaded) {
    return <div></div>;
  }

  return (
    <>
      <PageLayout>
        <div className="flex border-b border-slate-400 p-4">
          {!isSignedIn && (
            <div className="flex justify-center">
              <SignInButton />
            </div>
          )}
          {isSignedIn && <CreatePostWizard />}
        </div>
        <Feed />
        <Footer />
      </PageLayout>
    </>
  );
};

export default Home;
