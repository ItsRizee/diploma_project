import {InputField, Textarea, InputFieldTags, InputFieldTimeline} from "../components";
import {useState} from "react";
import {addProduct} from "../services/product";
import {errorToast, successToast} from "../public/constants";

const NewProduct = () => {
    const [productTitle, setProductTitle] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState("");
    const [error, setError] = useState(null);
    const [productPrice, setProductPrice] = useState(0);
    const [productTags, setProductTags] = useState([]);
    const [productTimeline, setProductTimeline] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const onImageChange = (event) => {
        setProductImage(event.target.files[0]);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!submitting) {
            setSubmitting(true);

            if (productPrice === 0) {
                errorToast("Product's price can't be 0!");
                setSubmitting(false);
                return;
            }

            addProduct(productTitle, productDescription, productImage, productPrice, productTimeline, productTags)
                .then(() => {
                    setProductTitle("");
                    setProductDescription("");
                    setProductImage(null);
                    setProductPrice(0);
                    setProductTimeline([]);
                    setProductTags([]);

                    successToast("Successfully added new product!");
                    setSubmitting(false);

                    // reset the form
                    event.target.reset();
                })
                .catch((errorMessage) => {
                    setError(errorMessage);
                });
        }
    }

    return (
        <div className="flex flex-col bg-base-100 text-base-content">
            <div className="flex flex-col justify-center items-center p-5">
                <h2 className="font-bold text-xl mb-5">New Product</h2>
                <form className="space-y-5 w-full" onSubmit={onSubmit}>
                    <InputField
                        id="title-input"
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
                        <input
                            id="file-input"
                            type="file"
                            accept="image/png, image/jpeg"
                            required
                            className="file-input file-input-bordered w-full"
                            onChange={onImageChange}
                        />
                    </div>
                    <Textarea
                        id="description-textarea"
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
                        id="price-input"
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
                        {error && <span className="error-text text-error py-2">{error}</span>}
                        <div className={`form-control ${error ? 'mt-2' : 'mt-6'}`}>
                            {submitting ?
                                <button className="btn btn-primary btn-disabled" type="submit">
                                    <span className="loading loading-spinner loading-lg"></span>
                                </button> :
                                <button className="btn btn-primary" type="submit">
                                    Add Product
                                </button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewProduct;