import {useRef} from "react";
import {NewProduct, NewRequest} from "./index";

const Drawer = ({toggleDrawerContent, page_content, craftsman}) => {
    const drawerToggleRef = useRef(null);

    const closeDrawer = () => {
        if (drawerToggleRef.current) {
            drawerToggleRef.current.checked = false;
        }
    };

    return (
        <div className="drawer drawer-end overflow-x-hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" ref={drawerToggleRef}/>
            <div className="drawer-content w-screen">
                    {page_content}
            </div>
            <div className="drawer-side z-[5]">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="bg-base-100 text-base-content h-full w-screen sm:w-96">
                    <button className="btn btn-sm btn-circle btn-ghost mt-2.5 ml-2.5" onClick={closeDrawer}>✕</button>
                    {toggleDrawerContent === true ? <NewProduct/> : <NewRequest craftsman={craftsman}/>}
                </div>
            </div>
        </div>
    );
}

export default Drawer;