import type { ProductId } from "./Product";

export type State = {
	cart: ProductId[];
	totalItems: number;
	totalPrice: number;
	showCart: boolean;
};

export type Actions = {
	addToCart: (Item: ProductId) => void;
	removeFromCart: (Item: ProductId) => void;
	toggleShowCart: () => void;
	deleteFromCart: (Item: ProductId) => void;
};
