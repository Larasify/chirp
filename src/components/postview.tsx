import { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";



dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/post/${post.id}`);
  };
  const handleProfileClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(`/@${author.username}`);
  };

  return (
    <div
      key={post.id}
      onClick={handleCardClick}
      className=" flex gap-3 border-b border-slate-400 p-4 hover:cursor-pointer"
    >
      <Image
        src={author.profileImageUrl}
        alt={`@${author.username}'s profile image`}
        className="h-14 w-14 rounded-full"
        onClick={handleProfileClick}
        width={56}
        height={56}
      />
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 text-slate-300">
          <span onClick={handleProfileClick}>{`@${author.username}`}</span>
          <span className="font-thin">{` · ${dayjs(
            post.createdAt
          ).fromNow()}`}</span>
        </div>
        <span className="break-all text-xl">{post.content}</span>
      </div>
    </div>
  );
};
