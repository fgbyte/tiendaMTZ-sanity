//El usuario va a hacer un request POST a /buy con el input oculto desde el Form del carrito
///buy va a ser una ruta de API
//como es un POST usamos las Actions de Remix

import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { getDomainUrl, getStripeSession } from "~/lib/stripe.server";

export async function action({ request }: ActionFunctionArgs) {
	//error first
	if (request.method !== "POST") {
		return json({ message: "Method not allowed" }, 405);
	}

	//else solo para peticiones POST
	//action is loading the data from the Form that redirect an action to the "/buy" url
	//and has an input hidden with the name "cartData"
	const formData = await request.formData();

	//extract the cartData info from the raw request
	const values = Object.fromEntries(formData);

	//the item in string format
	const items = values.cartData as string;

	const stripeRedirectUrl = await getStripeSession(
		items,
		getDomainUrl(request),
	);

	return redirect(stripeRedirectUrl);
}
