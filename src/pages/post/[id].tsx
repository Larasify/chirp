import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/loading";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { BackButton } from "~/components/backbutton";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data, isLoading } = api.posts.getPostById.useQuery({
    postId: id,
  });

  if (isLoading)
    return (
      <PageLayout>
        <LoadingPage />
      </PageLayout>
    );

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <div>
          <BackButton colour="black" />
        </div>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = (context) => {
  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("id is not a string");

  return {
    props: {
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
