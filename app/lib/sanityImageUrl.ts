//https://www.sanity.io/docs/image-url
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "~/lib/sanity";
import type { ProductImage } from "~/types/Product";

//create the builder
const builder = ImageUrlBuilder(client);

//create an exportable urlFor function to render the image url in the component
//use any type because we going to pass a image
export function urlFor(source: ProductImage) {
	return builder.image(source);
}
