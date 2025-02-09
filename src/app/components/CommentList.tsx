import Comment from "./Comment"

export default function CommentList(props: any) {
//    console.log("CL Pro: " + props.comments);
    if (!props || !props.comments) {
        return (
            <div className="h-[550px] flex items-center justify-center text-gray-500">
            No comments yet.
            </div>
        );
    }
    return <div> hi </div>;
}

    // return (
        // <div className="h-[550px] overflow-y-scroll space-y-4">
        //     {props.comments && props.comments.length > 0 ? (
        //     props.comments.reduce((acc: any[], comment: any, index: number) => {
        //         acc.push(
        //         <div key={index} className="p-4 border-b border-gray-200">
        //             <Comment 
        //             comment={comment.comment}
        //             profile={comment.profile}
        //             username={comment.username}
        //             />
        //         </div>
        //         );
        //         return acc;
        //     }, [])
        //     ) : (
        //     <div className="h-[550px] flex items-center justify-center text-gray-500">
        //         No comments yet.
        //     </div>
        //     )}
        // </div>
//     )
// }