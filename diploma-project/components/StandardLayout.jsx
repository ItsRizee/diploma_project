import Head from "next/head";
import {Drawer, Footer, Navbar, NewProduct} from "./index";

const StandardLayout = ({title, page_content}) => {
    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
                <link rel="icon" href="/images/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
                <link rel="manifest" href="/images/site.webmanifest"/>
            </Head>
            <Drawer sidebar_content={<NewProduct/>} page_content={
                <div className="flex flex-col flex-1 min-h-screen w-full">
                    <header>
                        <Navbar/>
                    </header>
                    {page_content}
                    <Footer/>
                </div>
            } />
        </div>
    );
}

export default StandardLayout;