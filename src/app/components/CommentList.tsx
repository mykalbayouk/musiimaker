import Comment from "./Comment"

export default function CommentList(props: any) {
    return (
        <div className="h-[550px] overflow-y-scroll">
            {props.comments.map((comment: any) => (
                <Comment 
                    key={comment.id}
                    comment={comment.comment}
                    profile={comment.profile}
                    username={comment.username}
                
                />
            ))}
        </div>
    )
}