import { HeartIcon, MessageCircle } from "lucide-react";
import type { Post } from "@/types";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { formatTimeAgo } from "@/lib/time";
import EditPostButton from "@/components/post/edit-post-button";
import DeletePostButton from "@/components/post/delete-post-button";
import { useSession } from "@/store/session";
import { usePostByIdData } from "@/hooks/queries/use-post-by-id-data";
import Loader from "@/components/loader";
import Fallback from "@/components/fallback";
import LikePostButton from "@/components/post/like-post-button";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import ImageSkeleton from "@/components/post/image-skeleton";

export default function PostItem({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  const session = useSession();
  const userId = session?.user.id;
  const [api, setApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    data: post,
    isPending,
    error,
  } = usePostByIdData({
    postId,
    type,
  });

  useEffect(() => {
    if (!api) return;

    setCurrentImageIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentImageIndex(api.selectedScrollSnap());
    });
  }, [api]);

  if (isPending) return <Loader />;
  if (error) return <Fallback />;

  const isMine = post.author_id === userId;

  return (
    <div
      className={`flex flex-col gap-4 pb-8 ${type === "FEED" && "border-b"}`}
    >
      {/* 1. 유저 정보, 수정/삭제 버튼 */}
      <div className="flex justify-between">
        {/* 1-1. 유저 정보 */}
        <div className="flex items-start gap-4">
          <Link to={`profile/${post.author_id}`}>
            <img
              src={post.author.avatar_url || defaultAvatar}
              alt={`${post.author.nickname}의 프로필 이미지`}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <div>
            <div className="font-bold hover:underline">
              {post.author.nickname}
            </div>
            <div className="text-muted-foreground text-sm">
              {formatTimeAgo(post.created_at)}
            </div>
          </div>
        </div>

        {/* 1-2. 수정/삭제 버튼 */}
        <div className="text-muted-foreground flex text-sm">
          {isMine && (
            <>
              <EditPostButton {...post} />
              <DeletePostButton id={post.id} />
            </>
          )}
        </div>
      </div>

      {/* 2. 컨텐츠, 이미지 캐러셀 */}
      <div className="flex cursor-pointer flex-col gap-5">
        {/* 2-1. 컨텐츠 */}
        {type === "FEED" ? (
          <Link to={`/post/${post.id}`}>
            <div className="line-clamp-5 break-words whitespace-pre-wrap">
              {post.content}
            </div>
          </Link>
        ) : (
          <div className="break-words whitespace-pre-wrap">{post.content}</div>
        )}
        {/* 2-2. 이미지 */}
        {post.image_urls && post.image_urls.length === 1 ? (
          // 이미지 1개
          <div className="mx-auto aspect-[6/5] w-full overflow-hidden rounded-xl">
            <ImageSkeleton src={post.image_urls[0]} alt="게시물 이미지" />
          </div>
        ) : post.image_urls && post.image_urls.length > 1 ? (
          // 이미지 2개 이상
          <div className="flex flex-col gap-3">
            <Carousel className="group mx-auto" setApi={setApi}>
              <CarouselContent>
                {post.image_urls.map((url, index) => (
                  <CarouselItem className="basis-full" key={index}>
                    <div
                      className="relative aspect-[6/5] w-full cursor-pointer overflow-hidden rounded-xl"
                      onClick={(e) => {
                        if (!api) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const isLeftHalf = clickX < rect.width / 2;

                        if (isLeftHalf) {
                          api.scrollPrev();
                        } else {
                          api.scrollNext();
                        }
                      }}
                    >
                      <ImageSkeleton
                        src={url}
                        alt={`게시물 이미지 ${index + 1}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* 인디케이터 */}
            <div className="flex justify-center gap-1.5">
              {post.image_urls.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-foreground w-2"
                      : "bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* 3. 좋아요, 댓글 버튼 */}

      <div className="flex gap-2">
        {/* 3-1. 좋아요 버튼 */}
        <LikePostButton
          id={post.id}
          likeCount={post.like_count}
          isLiked={post.isLiked}
        />

        {/* 3-2. 댓글 버튼 */}
        {type === "FEED" && (
          <Link to={`/post/${post.id}`}>
            <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm">
              <MessageCircle className="h-4 w-4" />
              <span>댓글 {post.comment_count}</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
