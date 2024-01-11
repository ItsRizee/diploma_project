import { StandardLayout } from "../components";
import { app_name } from "../public/constants";

const AboutPage = () => {
    return (
        <div className="overflow-x-hidden">
            <StandardLayout title="Home page" page_content={
                <main className="flex flex-col flex-1 pb-20 pt-10 px-5 lg:mx-36 xl:mx-96 text-lg">
                    <article className="card card-bordered space-y-5 p-5 bg-base-300">
                        <h1 className="text-center text-2xl mb-5 font-bold">About {app_name}</h1>
                        <p className="font-bold">
                            Welcome to {app_name} – the community for craftsmen and craft enthusiasts!
                        </p>
                        <p>
                            At {app_name}, our mission is to create a vibrant community that connects talented craftsmen
                            with people who appreciate and love their work. We believe in the power of craftsmanship and aim
                            to showcase the skills and products of artisans to a wider audience.
                        </p>
                        <p>
                            Explore the diverse catalog of products created by our craftsmen. Each item is a unique
                            expression of skill, creativity, and passion. Whether you&apos;re a craftsman looking to share your
                            creations or someone who appreciates handmade products, {app_name} is the place for you.
                        </p>
                        <p className="pt-5 font-bold">
                            How it works:
                        </p>
                        <ol>
                            <li>Discover: Browse through the home page to discover a wide range of crafts and products.</li>
                            <li>Connect: Connect with craftsmen whose work resonates with you.</li>
                            <li>Request: If you find something you love, make a request to connect with the craftsman and
                                acquire a unique piece for yourself.
                            </li>
                        </ol>
                        <p className="pt-5">
                            Join us in celebrating craftsmanship and supporting a community of artisans. Let&apos;s bridge generations and keep the spirit of handmade crafts alive.
                        </p>
                    </article>
                </main>
            } />
        </div>
    );
}

export default AboutPage;