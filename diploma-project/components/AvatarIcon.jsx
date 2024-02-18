import Image from "next/future/image";
import {default_profile_picture} from "../public/constants";
import Link from "next/link";
import {Fragment} from "react";

const AvatarIcon = ({ img, username, catalogHref, productHref }) => {
    return (
        <div className="flex flex-col items-center space-y-2 w-28">
            <Link href={productHref}>
                <div className="bg-gradient-to-tr from-secondary to-primary p-1 rounded-full">
                    <a className="block bg-base-100 p-1.5 rounded-full" href="#">
                        <figure className="relative rounded-full w-20 h-20">
                            <Image src={img ? img : default_profile_picture} alt="avatar icon" width={80} height={80}/>
                        </figure>
                    </a>
                </div>
            </Link>
            <Link href={catalogHref}>
                <div className="cursor-pointer text-center">
                    {username.split(' ').map((part, index, array) => (
                        <Fragment key={index}>
                            {part}
                            {index !== array.length - 1 && <br />}
                        </Fragment>
                    ))}
                </div>
            </Link>
        </div>
    );
}

export default AvatarIcon;