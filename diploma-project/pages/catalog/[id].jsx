import {StandardLayout} from "../../components";
import {default_profile_picture} from "../../public/constants";
import Image from "next/future/image";
import {auth} from "../../firebase";
import {useEffect, useState} from "react";
import {getCatalog} from "../../services/product";
import {ProductCard} from "../../components";
import {useRouter} from "next/router";
import {getUserById, User} from "../../services/user";

const Catalog = ({id}) => {
    const [user, setUser] = useState(new User());
    const [products, setProducts] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getUserById(id).then((userData) => {
            setUser(userData);

            if(userData.email !== "" && userData.catalog !== null) {
                getCatalog(userData.email).then((catalog) => {
                    setProducts(catalog);
                });
            } else {
                void router.replace("/404");
            }
        });
    }, [id]);

    if(router.isFallback) {
        return (
            <div className="flex h-screen justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <StandardLayout title="Id page" page_content={auth.currentUser && user.uid && products ?
                <main
                    className="flex flex-col flex-1 my-10 space-y-5 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-52 2xl:mx-72 justify-center items-center">
                    <div className="flex flex-col justify-center items-center mb-5 mt-10 space-y-5">
                        <div className="mb-5">
                            <figure className="relative rounded-full flex justify-center mb-2">
                                <Image src={user.photoURL ? user.photoURL : default_profile_picture} alt="avatar icon"
                                       width={96} height={96}/>
                            </figure>
                            <div className="text-xl text-center">{user.name}</div>
                        </div>
                        { products.length !== 0 ?
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-10">
                            {products.map(({title, description, index}) => (
                                <ProductCard
                                    key={index}
                                    title={title}
                                    description={description}
                                    tags={["master", "silver crafts"]}
                                    isNew={true}
                                    profile_picture={user.photoURL}
                                    inCatalog={true}
                                />
                            ))}
                            </div> :
                            <p className="text-center">This craftsman doesn&apos;t have any products</p>
                        }
                    </div>
                </main> :
                <div className="flex flex-1 justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }/>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: {
            id: params.id,
        }
    }
}


export default Catalog;