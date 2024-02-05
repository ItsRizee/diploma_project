import AvatarIcon from "../components/AvatarIcon";
import TrendingCard from "../components/TrendingCard";
import ProductCard from "../components/ProductCard";
import {Product} from "../services/product";
import {Timestamp} from "firebase/firestore";

export const app_name = "Wavary";

export const default_profile_picture = "https://firebasestorage.googleapis.com/v0/b/diploma-project-1ff8d.appspot.com/o/profile_pictures%2Fprofile_picture.png?alt=media&token=b8e2bb8c-6527-4ca8-aac3-7cbb5dacd4a3";

export const newProducts = [<AvatarIcon key="1" img="/profile_picture.png" username="Ivan"/>,
    <AvatarIcon key="2" img="/profile_picture.png" username="Tihomir"/>, <AvatarIcon key="3" img="/profile_picture.png" username="Martin"/>,
    <AvatarIcon key="4" img="/profile_picture.png" username="Galena"/>, <AvatarIcon key="5" img="/profile_picture.png" username="Raya"/>,
    <AvatarIcon key="6" img="/profile_picture.png" username="Plamen"/>, <AvatarIcon key="7" img="/profile_picture.png" username="Lachezar"/>,
    <AvatarIcon key="8" img="/profile_picture.png" username="Kiril"/>, <AvatarIcon key="9" img="/profile_picture.png" username="Ivan"/>,
    <AvatarIcon key="10" img="/profile_picture.png" username="Tihomir"/>, <AvatarIcon key="11" img="/profile_picture.png" username="Martin"/>,
    <AvatarIcon key="12" img="/profile_picture.png" username="Galena"/>, <AvatarIcon key="13" img="/profile_picture.png" username="Raya"/>,
    <AvatarIcon key="14" img="/profile_picture.png" username="Plamen"/>, <AvatarIcon key="15" img="/profile_picture.png" username="Lachezar"/>,
    <AvatarIcon key="16" img="/profile_picture.png" username="Kiril"/>];

export const trending = [<TrendingCard key="1"/>, <TrendingCard key="2"/>, <TrendingCard key="3"/>, <TrendingCard key="4"/>, <TrendingCard key="5"/>];

const product = new Product(
    "Silver ring",
    "This is the best ring out here bro. This is so good I can't even explain it with words.",
    "https://firebasestorage.googleapis.com/v0/b/diploma-project-1ff8d.appspot.com/o/products%2F6mDtmoPkv8RZBULKiYk628UouUM2%2Fdisplay_image%2Frecommended_ring.jpg?alt=media&token=da8ad1da-966a-4118-8068-03806011a276",
    "6mDtmoPkv8RZBULKiYk628UouUM2",
    250,
    Timestamp.now(),
    ["master", "silver craft"],
    );

export const discoverProducts = [
    <ProductCard product={product} inCatalog={false} productId="U80ihuClGyrNu8CGhEvM" />,
    <ProductCard product={product} inCatalog={false} productId="U80ihuClGyrNu8CGhEvM" />,
    <ProductCard product={product} inCatalog={false} productId="U80ihuClGyrNu8CGhEvM" />,
    <ProductCard product={product} inCatalog={false} productId="U80ihuClGyrNu8CGhEvM" />,
    <ProductCard product={product} inCatalog={false} productId="U80ihuClGyrNu8CGhEvM" />,
    <ProductCard product={product} inCatalog={false} productId="U80ihuClGyrNu8CGhEvM" />,
    <ProductCard product={product} inCatalog={false} productId="U80ihuClGyrNu8CGhEvM" />,
    <ProductCard product={product} inCatalog={false} productId="U80ihuClGyrNu8CGhEvM" />,
    <ProductCard product={product} inCatalog={false} productId="U80ihuClGyrNu8CGhEvM" />,
    <ProductCard product={product} inCatalog={false} productId="U80ihuClGyrNu8CGhEvM" />,
];