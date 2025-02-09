export default function Comment(props: any) {
    return (
        <div className="flex items-center border-b border-b-black">
            <div className="w-6 h-6">
                <div className="border border-black rounded-full">
                    <img src={props.profile} className="w-full h-full rounded-full"/>
                </div>
            </div>
            <div>
                <div className="font-bold">{props.username}</div>
                <div>{props.comment}</div>
            </div>
        </div>
    )
}