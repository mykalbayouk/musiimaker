export default function Comment(props: any) {
    return (
        <div className="flex items-start space-x-4 p-2 border-b border-gray-300 bg-white shadow rounded-lg">
            <div className="w-10 h-10">
            <img src={props.profile} className="w-full h-full rounded-full border border-gray-300"/>
            </div>
            <div>
            <div className="font-semibold text-gray-800">{props.username}</div>
            <div className="text-gray-600">{props.comment}</div>
            </div>
        </div>
    )
}