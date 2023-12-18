import Image from "next/future/image";
import {default_profile_picture} from "../public/constants";
import Link from "next/link";

const AvatarIcon = ({ img, username, catalogHref }) => {
    return (
        <div className="flex flex-col items-center space-y-2 w-28">
            <div className="bg-gradient-to-tr from-secondary to-primary p-1 rounded-full">
                <a className="block bg-base-100 p-1.5 rounded-full" href="#">
                    <figure className="relative rounded-full w-20 h-20">
                        <Image src={img ? img : default_profile_picture} alt="avatar icon" width={80} height={80}/>
                    </figure>
                </a>
            </div>
            <Link href={catalogHref}><div className="cursor-pointer line-clamp-1">{username}</div></Link>
        </div>
    );
}

export default AvatarIcon;