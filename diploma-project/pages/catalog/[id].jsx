import {StandardLayout} from "../../components";
import {default_profile_picture} from "../../public/constants";
import Image from "next/future/image";
import {useEffect, useState} from "react";
import {getCatalog} from "../../services/product";
import {ProductCard} from "../../components";
import {useRouter} from "next/router";
import {getUserById} from "../../services/user";
import {useUserStore} from "../../store/userStorage";

const Catalog = ({craftsman}) => {
    const {currentUser} = useUserStore((state) => ({currentUser: state.user}));
    const [isLogged, setIsLogged] = useState(false);
    const [products, setProducts] = useState(null);
    const [toggleDrawerContent, setToggleDrawerContent] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getCatalog(craftsman).then((catalog) => {
            setProducts(catalog);
        });
    }, [craftsman.catalog]);

    useEffect(() => {
        let accessToken = sessionStorage.getItem("accessToken");
        if(accessToken !== ''){
            setIsLogged(true);
        }
    }, [currentUser]);

    if(router.isFallback) {
        return (
            <div className="flex h-screen justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <StandardLayout title="Catalog page" craftsman={craftsman} toggleDrawerContent={toggleDrawerContent} setToggleDrawerContent={setToggleDrawerContent} page_content={products ?
                <main
                    className="flex flex-col flex-1 my-10 space-y-5 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-52 2xl:mx-72 justify-center items-center">
                    <div className="flex flex-col flex-1 mb-5 mt-10 space-y-10 items-center">
                        <div className="mb-5">
                            <div className="relative flex justify-center mb-2">
                                <figure className="h-24 w-24">
                                    <Image
                                        src={craftsman.photoURL ? craftsman.photoURL : default_profile_picture}
                                        alt="avatar icon"
                                        className="h-full w-full object-cover rounded-full" layout="responsive"
                                        width={96} height={96}/>
                                </figure>
                            </div>
                            <div className="text-xl text-center">{craftsman.name}</div>
                            {isLogged && craftsman.uid !== currentUser.uid &&
                                <label htmlFor="my-drawer" className="drawer-button bg-base-300 btn btn-lg mt-5"
                                       onClick={() => setToggleDrawerContent(false)}>
                                    New Request
                                </label>
                            }
                        </div>
                        {products.length !== 0 ?
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 sm:gap-x-5 2xl:gap-x-16 gap-y-16">
                                {products.map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        product={product}
                                        inCatalog={true}
                                        productId={product.id}
                                    />
                                ))}
                            </div> :
                            <div className="flex flex-col justify-center items-center space-y-5">
                                <Image className="opacity-60" src="/questionable_man.png" alt="Some craftsman thinking" width={221} height={242}/>
                                <p className="text-center opacity-60">This craftsman doesn&apos;t have any products</p>
                            </div>
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
    return getUserById(params.id).then((userData) => {
        // if user is not a craftsman return notFound - 404 page
        if(userData.catalog !== null) {
            const jsonUser = {
                name: userData.name,
                email: userData.email,
                photoURL: userData.photoURL,
                uid: userData.uid,
                interests: [],
                requests: [],
                craft: userData.craft,
                orders: [],
                catalog: userData.catalog,
            }

            return {
                props: {
                    craftsman: jsonUser,
                }
            }
        } else {
            return {
                notFound: true,
            }
        }
    });
}


export default Catalog;









// import {StandardLayout} from "../../components";
// import {default_profile_picture} from "../../public/constants";
// import Image from "next/future/image";
// import {useEffect, useState} from "react";
// import {getCatalog, Product} from "../../services/product";
// import {ProductCard} from "../../components";
// import {useRouter} from "next/router";
// import {getUserById} from "../../services/user";
//
// const Catalog = ({user, products}) => {
//     // const [products, setProducts] = useState(null);
//     const router = useRouter();
//
//     // useEffect(() => {
//     //     getCatalog(user.email).then((catalog) => {
//     //         setProducts(
//     //             catalog.map((product) => (
//     //                 new Product(
//     //                     product.title,
//     //                     product.description,
//     //                     product.displayImageURL,
//     //                     product.owner,
//     //                     product.price,
//     //                     product.createdDate,
//     //                     product.likes,
//     //                     product.tags
//     //                 )
//     //             ))
//     //         );
//     //     });
//     // }, []);
//
//     if(router.isFallback) {
//         return (
//             <div className="flex h-screen justify-center items-center">
//                 <span className="loading loading-spinner loading-lg"></span>
//             </div>
//         );
//     }
//
//     return (
//         <div className="flex flex-col min-h-screen overflow-x-hidden">
//             <StandardLayout title="Catalog page" page_content={products ?
//                 <main
//                     className="flex flex-col flex-1 my-10 space-y-5 mx-5 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-52 2xl:mx-72 justify-center items-center">
//                     <div className="flex flex-col flex-1 mb-5 mt-10 space-y-10">
//                         <div className="mb-5">
//                             <figure className="relative rounded-full flex justify-center mb-2">
//                                 <Image src={user.photoURL ? user.photoURL : default_profile_picture} alt="avatar icon"
//                                        width={96} height={96}/>
//                             </figure>
//                             <div className="text-xl text-center">{user.name}</div>
//                         </div>
//                         { products.length !== 0 ?
//                             <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 sm:gap-x-5 2xl:gap-x-16 gap-y-16">
//                                 {products.slice().reverse().map((product, index) => (
//                                     <ProductCard
//                                         key={index}
//                                         product={product}
//                                         inCatalog={true}
//                                         productId={user.catalog[products.length - index - 1]}
//                                     />
//                                 ))}
//                             </div> :
//                             <div className="flex flex-col justify-center items-center space-y-5">
//                                 <Image className="opacity-60" src="/questionable_man.png" alt="Some craftsman thinking" width={221} height={242}/>
//                                 <p className="text-center opacity-60">This craftsman doesn&apos;t have any products</p>
//                             </div>
//                         }
//                     </div>
//                 </main> :
//                 <div className="flex flex-1 justify-center items-center">
//                     <span className="loading loading-spinner loading-lg"></span>
//                 </div>
//             }/>
//         </div>
//     );
// }
//
// export async function getServerSideProps({ params }) {
//     return getUserById(params.id).then((userData) => {
//         // if user is not a craftsman return notFound - 404 page
//         if(userData.catalog !== null) {
//             getCatalog(userData.email).then((catalog) => {
//                 const jsonUser = {
//                     name: userData.name,
//                     email: userData.email,
//                     photoURL: userData.photoURL,
//                     uid: userData.uid,
//                     interests: userData.interests,
//                     requests: userData.requests,
//                     craft: userData.craft,
//                     orders: userData.orders,
//                     catalog: userData.catalog,
//                     products: catalog.map((product) => (
//                         new Product(
//                             product.title,
//                             product.description,
//                             product.displayImageURL,
//                             product.owner,
//                             product.price,
//                             product.createdDate,
//                             product.likes,
//                             product.tags
//                         )
//                     )),
//                 }
//
//                 return {
//                     props: {
//                         user: jsonUser,
//                     }
//                 }
//             });
//         } else {
//             return {
//                 notFound: true,
//             }
//         }
//     });
// }
//
//
// export default Catalog;