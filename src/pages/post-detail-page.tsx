import CommentEditor from "@/components/comment/comment-editor";
import CommentList from "@/components/comment/comment-list";
import PostItem from "@/components/post/post-item";
import { usePostByIdData } from "@/hooks/queries/use-post-by-id-data";
import { Navigate, useParams } from "react-router";

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.postId;

  const { data: post } = usePostByIdData({
    postId: Number(postId),
    type: "DETAIL",
  });

  if (!postId) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <PostItem postId={Number(postId)} type={"DETAIL"} />
      <div className="text-cl font-bold">댓글 {post?.comment_count ?? 0}</div>
      <CommentEditor type="CREATE" postId={Number(postId)} />
      <CommentList postId={Number(postId)} />
    </div>
  );
}
