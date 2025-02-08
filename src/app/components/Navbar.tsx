export default function Navbar() {
    return(
        <div className="border border-black w-full h-[50px] flex">
            <div className="border border-black w-3/4 text-[32px] h-full">Musiimaker</div>
            <div className="border border-black w-1/4 text-[24px] h-full">
                <ul className="flex w-full justify-around align-center h-full">
                    <li className="border-r border-r-black w-1/2 h-full text-center">Log in</li>
                    <li className="w-1/2 h-full text-center">Sign up</li>
                </ul>
            </div>
        </div>
    )
}