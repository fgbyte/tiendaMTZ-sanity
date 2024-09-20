//dynamic route for '/product/dynamic-slug'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useCartState } from "~/context/useCartStore";
import { client } from "~/lib/sanity";
import { urlFor } from "~/lib/sanityImageUrl";
import type { ProductId } from "~/types/Product";

type ProductProps = {
	data: ProductId;
};

//Get data
export async function loader({ params }: LoaderFunctionArgs) {
	const query = `*[_type == "product" && slug.current == '${params.slug}'][0]`; //the first product with the slug

	const data = await client.fetch(query);

	return json({ data });
}

//Dynamic className
function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(" ");
	//remove all the falsy values in the string[] and join the classes with a space
}

const ProductSlug = () => {
	//grab data from loader using useLoaderData remixHook
	const { data } = useLoaderData<typeof loader>() as ProductProps;
	const addToCart = useCartState((state) => state.addToCart);

	return (
		<main className="mt-5">
			<div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
				<TabGroup as="div" className="flex flex-col-reverse">
					{/* Image Selector */}
					<div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
						<TabList className="grid grid-cols-4 gap-6">
							{data.image.map((image) => (
								<Tab
									key={image._key}
									className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
								>
									{/* //para renderizar la tab usaremos sus props
									https://headlessui.com/react/tabs#using-render-props
									 */}

									{({ selected }) => (
										<>
											<span className="absolute inset-0 rounded-md overflow-hidden">
												{/* //necesito el builder de sanity para poder renderizar la imagen usando urlFor */}
												<img
													src={urlFor(image).url()}
													alt="Product"
													className="w-full h-full object-center object-cover"
												/>
											</span>

											{/* en este span usaremos dynamic classNames  */}
											<span
												className={classNames(
													selected ? "ring-indigo-500" : "ring-transparent",
													"absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none",
												)}
											>
												{" "}
											</span>
										</>
									)}
								</Tab>
							))}
						</TabList>
					</div>

					<TabPanels className="w-full aspect-w-1 aspect-h-1">
						{data.image.map((image) => (
							<TabPanel key={image._key}>
								<img
									src={urlFor(image).url()}
									alt="Product"
									className="w-full h-full object-center object-cover sm:rounded-lg"
								/>
							</TabPanel>
						))}
					</TabPanels>
				</TabGroup>

				<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-">
						{data.name}
					</h1>
					<div className="mt-3">
						<p className="text-3xl text-gray-900">$ {data.price}</p>
					</div>
					<div className="mt-6">
						<div className="text-base text-gray-700">{data.description}</div>
					</div>
					<div className="mt-6">
						<div className="mt-10 flex sm:flex-col-1">
							<button
								type="button"
								onClick={() => addToCart(data)}
								className="w-full flex-1 bg-indigo-600 border border-transparent rounded-md py-3 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-500"
							>
								Add to Bag
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProductSlug;
