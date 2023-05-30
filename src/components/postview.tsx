import { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  const handleCardClick = () => {
    window.location.href = `/post/${post.id}`;
  };
  const handleProfileClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.location.href = `/@${author.username}`;
  };

  return (
    <div
      key={post.id}
      onClick={handleCardClick}
      className=" flex gap-3 border-b border-slate-400 p-4 hover:cursor-pointer"
    >
      <Link
        href={`/@${author.username}`}
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <Image
          src={author.profileImageUrl}
          alt={`@${author.username}'s profile image`}
          className="h-14 w-14 rounded-full"
          onClick={handleProfileClick}
          width={56}
          height={56}
        />
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 text-slate-300">
          <Link
            href={`/@${author.username}`}
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <span onClick={handleProfileClick}>{`@${author.username}`}</span>
          </Link>
          <span className="font-thin">{` · ${dayjs(
            post.createdAt
          ).fromNow()}`}</span>
        </div>
        <span className="break-all text-xl">{post.content}</span>
      </div>
    </div>
  );
};
