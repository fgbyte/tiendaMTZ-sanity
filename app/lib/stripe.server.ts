//this runs on the server only

import Stripe from "stripe";
import type { ProductId } from "~/types/Product";

export function getDomainUrl(request: Request) {
	const host =
		request.headers.get("X-Forward-Host") ?? request.headers.get("host");

	if (!host) {
		throw new Error("Could not find the url");
	}

	const protocol =
		host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
	//because in local we use http, but in production we use https

	return `${protocol}://${host}`;
} //this function get the domain url from the request whatever is hosted the app

//Setting up stripe
export const getStripeSession = async (
	items: string,
	domainUrl: string,
): Promise<string> => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
		apiVersion: "2024-06-20",
		typescript: true,
	});

	const dataObj = JSON.parse(items);

	const lineItems = dataObj.map((product: ProductId) => {
		return {
			price: product.stripeProductId,
			quantity: product.quantity,
			adjustable_quantity: {
				enabled: true,
				minimum: 1,
				maximum: 10,
			},
		};
	});

	const session = await stripe.checkout.sessions.create({
		mode: "payment",
		payment_method_types: ["card"],
		line_items: lineItems,
		success_url: `${domainUrl}/payment/success`,
		cancel_url: `${domainUrl}/payment/cancelled`,
	});
	return session.url as string;
};
