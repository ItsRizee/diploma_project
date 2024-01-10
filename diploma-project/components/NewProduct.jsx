import {InputField, Textarea, InputFieldTags, InputFieldTimeline} from "../components";
import {useState} from "react";
import {addProduct} from "../services/product";
import { useUserStore } from "../store/userStorage";

const NewProduct = () => {
    const {user} = useUserStore((state) => ({user: state.user}));
    const [productTitle, setProductTitle] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState("");
    const [error, setError] = useState(null);
    const [productPrice, setProductPrice] = useState(0);
    const [productTags, setProductTags] = useState([]);
    const [productTimeline, setProductTimeline] = useState([]);

    const onImageChange = (event) => {
        setProductImage(event.target.files[0]);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        addProduct(productTitle, productDescription, productImage, user.catalog, productPrice, productTimeline, productTags)
            .then(() => {
                setProductTitle("");
                setProductDescription("");
                setProductImage(null);
                setProductPrice(0);
                setProductTags([]);

                // reset the form
                event.target.reset();
            }).catch((errorMessage) => {
            setError(errorMessage);
        });
    }

    return (
        <div className="flex flex-col bg-base-100 text-base-content">
            <main className="flex flex-col justify-center items-center p-5">
                <h2 className="font-bold text-xl mb-5">New Product</h2>
                <form className="space-y-5 w-full" onSubmit={onSubmit}>
                    <InputField
                        type="text"
                        labelText="Title"
                        placeholder=""
                        value={productTitle}
                        onChange={(e) => {
                            setProductTitle(e.target.value);
                            setError(null); // Reset the error state on input change
                        }}
                    />
                    <div className="w-full space-y-2">
                        <span className="label-text">Display Image</span>
                        <input id="file-input" type="file" accept="image/png, image/jpeg"
                               className="file-input file-input-bordered w-full" onChange={onImageChange}/>
                    </div>
                    <Textarea
                        type="text"
                        labelText="Description"
                        placeholder=""
                        value={productDescription}
                        onChange={(e) => {
                            setProductDescription(e.target.value);
                            setError(null); // Reset the error state on input change
                        }}
                    />
                    <InputField
                        type="number"
                        labelText="Price €"
                        placeholder=""
                        value={productPrice}
                        onChange={(e) => {
                            setProductPrice(e.target.value);
                            setError(null); // Reset the error state on input change
                        }}
                    />
                    <InputFieldTimeline timeline={productTimeline} setTimeline={setProductTimeline} />
                    <InputFieldTags tags={productTags} setTags={setProductTags} />
                    <div>
                        {error && <span className="error-text text-red-500 py-2">{error}</span>}
                        <div className={`form-control ${error ? 'mt-2' : 'mt-6'}`}>
                            <button className="btn btn-primary" type="submit">
                                Add Product
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default NewProduct;