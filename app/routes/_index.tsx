import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import { client } from "~/lib/sanity";
import type { Product } from "~/types/Product";

type AppProps = {
	products: Product[];
};

//Loader use to fetch data from sanity using GET request
export async function loader({ params }: LoaderFunctionArgs) {
	//sanity usa un query lang llamado GROQ q es una alternativa a GraphQL
	//https://www.sanity.io/docs/groq
	const query = `*[_type == 'product']{
		price,
		name,
		slug,
		"imageUrl": image[0].asset->url
	}`;

	//fetch data from sanity using SanityClient
	const products = await client.fetch(query);

	return json({ products });
}

const IndexPage = () => {
	//grab data from loader using useLoaderData remixHook
	const { products } = useLoaderData<typeof loader>() as AppProps; //! casting `products` to `AppProps` define the type safe of products in the component
	return (
		<>
			<section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row mt-12">
				<div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12">
					<p className="mb-4 font-semibold text-indigo-600 md:mb-6 md:text-lg xl:text-xl">
						Welcome to my shop!
					</p>
					<h1 className="text-black mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl">
						Focus on tech matters
					</h1>
					<p className="mb-8 leading-relax text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
						Welcome to TechConnect, a place where you can find the best tech
						products and services for your needs. Whether you're looking for
						hardware, software, or services, we've got you covered.
					</p>
					<div>
						<Link
							to="#products"
							className="rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition-duration-100 md:text-base"
						>
							Shop NOW
						</Link>
					</div>
				</div>

				<div className="h-48 hidden overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto lg:block xl:w-5/12">
					<img
						src="https://cdn.pixabay.com/photo/2020/01/26/20/14/computer-4795762_1280.jpg"
						alt="Product"
						className="h-full w-full object-cover object-center rounded-lg"
					/>
				</div>
			</section>

			<section id="products">
				<div className="py-24 sm:py-32 lg:pt-32">
					<div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
						{products.map((product) => (
							<Link
								className="group relative"
								key={product.slug.current}
								to={`/product/${product.slug.current}`}
							>
								<div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
									<img
										src={product.imageUrl}
										alt="Product"
										className="w-full h-full object-cover object-center"
									/>
								</div>
								<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
								<p className="mt-1 text-sm font-medium text-gray-900">
									$ {product.price}
								</p>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default IndexPage;
