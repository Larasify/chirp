import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/loading";
import Image from "next/image";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { generateSSGHelper } from "~/server/helpers/ssghelper";
import { BackButton } from "~/components/backbutton";
import { useEffect, useRef, useState } from "react";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });

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

    return () => {
      window.removeEventListener("wheel", handleScrolling);
    };
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>User has not posted</div>;

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

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username: username,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || !data.username) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div>
          <div className="relative h-36 bg-slate-600">
            <BackButton />
            <Image
              src={data.profileImageUrl}
              alt={`${data.username}'s Profile Image`}
              width={128}
              height={128}
              className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
            />
          </div>
          <div className="h-[64px]"></div>
          <div className="p-4 text-2xl font-bold">{`@${data.username}`}</div>
          <div className="w-full border-b border-slate-400"></div>
        </div>
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;
  if (typeof slug !== "string") throw new Error("slug is not a string");
  if (!slug.startsWith("@")) return { notFound: true };

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
