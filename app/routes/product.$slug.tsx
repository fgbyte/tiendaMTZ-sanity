//dynamic route for '/product/dynamic-slug'

import { Tab, TabGroup, TabList } from "@headlessui/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "~/lib/sanity";
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

const ProductSlug = (props: ProductProps) => {
	//grab data from loader using useLoaderData remixHook
	const { data } = useLoaderData<typeof loader>() as ProductProps;

	return (
		<main className="mt-5">
			<div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
				<TabGroup as="div" className="flex flex-col-reverse">
					{/* Image Slector */}
					<div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
						<TabList className="grid grid-cols-4 gap-6">
							{data.image.map((image) => (
								<Tab
									key={image._key}
									className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
								>
									//TODO: Render images min 55
								</Tab>
							))}
						</TabList>
					</div>
				</TabGroup>
			</div>
		</main>
	);
};

export default ProductSlug;
