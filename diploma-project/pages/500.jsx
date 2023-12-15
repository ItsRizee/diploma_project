import Head from "next/head";
import {Navbar} from "../components";
import {useRouter} from "next/router";

const Custom500 = () => {
    const router = useRouter();

    return (
        <div className="w-screen h-screen flex flex-col">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Home page</title>
                {/*<link rel="icon" href="/images/favicon.ico"/>*/}
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
                <link rel="manifest" href="/images/site.webmanifest"/>
            </Head>
            <Navbar />
            <main className="flex-grow flex flex-col justify-center items-center space-y-5 w-full">
                <h2 className="text-7xl">500</h2>
                <p className="text-xl pb-10">Internal server error</p>
            </main>
        </div>
    );
};

export default Custom500;
