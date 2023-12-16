import AvatarIcon from "../components/AvatarIcon";
import TrendingCard from "../components/TrendingCard";
import ProductCard from "../components/ProductCard";

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

export const trending = [<TrendingCard key="1"/>, <TrendingCard key="2"/>, <TrendingCard key="3"/>];

export const discoverProducts = [<ProductCard key={0} title="Silver ring" description="This is the best ring out here bro." tags={["master", "silver crafts"]} isNew={false}/>,
    <ProductCard key={1} title="Silver ring" description="This is the best ring out here bro. This is so good I can't even explain it with words." tags={["wood crafts"]} isNew={false}/>,
    <ProductCard key={2} title="Silver ring" description="Hello there this is my description." tags={["master", "silver crafts"]} isNew={true}/>,
    <ProductCard key={3} title="Silver ring" description="Ammmmm I don't know what I am doing" tags={["master"]} isNew={false}/>,
    <ProductCard key={4} title="Silver ring" description="This is the best ring out here bro. DAMN BRO THAT IS SO GOOD HOLY." tags={["wood crafts"]} isNew={false}/>,
    <ProductCard key={5} title="Silver ring" description="This is the best ring out here bro." tags={["master", "silver crafts"]} isNew={true}/>,
    <ProductCard key={6} title="Silver ring" description="Hi!" tags={["wood crafts"]} isNew={true}/>,
    <ProductCard key={7} title="Silver ring" description="GoOoooOooOOOd LoRdddDdDdDdDd" tags={["wood crafts"]} isNew={false}/>,
    <ProductCard key={8} title="Silver ring" description="This is the best ring out here bro." tags={["master"]} isNew={false}/>,
    <ProductCard key={9} title="Silver ring" description="REally good my friend!" tags={["master", "silver crafts"]} isNew={true}/>];