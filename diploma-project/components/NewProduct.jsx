import {InputField, Textarea, InputFieldTags, InputFieldTimeline} from "../components";
import {useState, useRef} from "react";
import {addProduct} from "../services/product";
import {errorToast, successToast} from "../public/constants";
import {toast} from "react-toastify";

const NewProduct = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productTags, setProductTags] = useState([]);
    const [productTimeline, setProductTimeline] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const toastId = useRef(null);

    const onImageChange = (event) => {
        const image = event.target.files[0];

        if (image && (image.type === "image/png" || image.type === "image/jpeg")) {
            setImage(image);
        } else {
            errorToast("Product's image must be .png or .jpeg!");
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!submitting) {
            setSubmitting(true);

            addProduct(title, description, image, Math.floor(parseFloat(productPrice) * 100) / 100, productTimeline, productTags)
                .then(() => {
                    setTitle("");
                    setDescription("");
                    setImage(null);
                    setProductPrice("");
                    setProductTimeline([]);
                    setProductTags([]);

                    successToast("Successfully added new product!");
                    setSubmitting(false);

                    // reset the form
                    event.target.reset();
                })
                .catch((errorMessage) => {
                    errorToast(errorMessage);
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
                        value={title}
                        onChange={(e) => {
                            const productTitle = e.target.value;

                            if(productTitle.length > 25) {
                                if(!toast.isActive(toastId.current)) {
                                    toastId.current = errorToast("Error: Title can't be more than 25 characters!");
                                }
                            } else {
                                setTitle(productTitle);
                            }
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
                        value={description}
                        onChange={(e) => {
                            const productDescription = e.target.value;

                            if(productDescription.length > 500) {
                                if(!toast.isActive(toastId.current)) {
                                    toastId.current = errorToast("Error: Description can't be more than 500 characters!");
                                }
                            } else {
                                setDescription(productDescription);
                            }
                        }}
                    />
                    <InputField
                        id="price-input"
                        type="number"
                        labelText="Price €"
                        placeholder=""
                        value={productPrice}
                        onChange={(e) => {
                            const productPriceInString = e.target.value;

                            // makes price to have no more than 2 floating digits (10.9999 -> 10.99)
                            const productPrice = Math.floor(parseFloat(productPriceInString) * 100) / 100;

                            if(isNaN(productPrice) && productPriceInString.length !== 0) {
                                if (!toast.isActive(toastId.current)) {
                                    toastId.current = errorToast("Error: price should be a number!");
                                }
                            } else {
                                if (productPrice > 100000 || productPrice === 0) {
                                    if (!toast.isActive(toastId.current)) {
                                        if (productPrice > 100000) {
                                            toastId.current = errorToast("Error: Price can't be more than 100 000 euro!");
                                        } else {
                                            toastId.current = errorToast("Error: Price can't be 0 euro!");
                                        }
                                    }
                                } else {
                                    setProductPrice(productPriceInString);
                                }
                            }
                        }}
                    />
                    <InputFieldTimeline timeline={productTimeline} setTimeline={setProductTimeline} />
                    <InputFieldTags tags={productTags} setTags={setProductTags} />
                    <div>
                        <div className="form-control">
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