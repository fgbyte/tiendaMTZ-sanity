//create a zustand store
//https://zustand.docs.pmnd.rs/getting-started/introduction

import { create } from "zustand";
import type { Actions, State } from "~/types/Cart";
import type { ProductId } from "~/types/Product";

export const useCartState = create<State & Actions>((set, get) => ({
	//set es usado para actualizar el estado
	//get es usado para leer el estado

	// Initializes the cart state with an empty array and sets the totalItems and totalPrice properties to 0.
	cart: [],
	totalItems: 0,
	totalPrice: 0,
	showCart: false,

	// Updates the showCart property of the state. It toggles between true and false. showCart is a boolean property.
	toggleShowCart: () => set((state) => ({ showCart: !state.showCart })),

	//Setea un state con el producto nuevo en quantity 1. Si el producto ya está en el carrito, incrementa la propiedad `quantity` del producto
	addToCart: (product: ProductId) => {
		const cart = get().cart;
		//👆 Accesses cart property from state; .cart is ProductId[]
		const cartItem = cart.find(
			(item) => item.slug.current === product.slug.current,
		); //cartItem = al primer elemento que cumpla la condición

		if (cartItem) {
			//If the product is already in the cart
			const updateCart = cart.map(
				(item) =>
					//hacemos un mapeo, para si los slug coinciden, sumamos 1 a la quantity
					item.slug.current === product.slug.current
						? { ...item, quantity: item.quantity + 1 } //En caso que coincidan, creamos una nueva propiedad `quantity` incrementada + 1, mientras mantenemos todas las demás propiedades del objeto original `...item`.
						: item,
				//En caso contrario, simplemente devolvemos el objeto original
			);

			//setamos el nuevo estado con la quantity incrementada (updateCart)
			set((state) => ({
				cart: updateCart,
				totalItems: state.totalItems + 1,
				totalPrice: state.totalPrice + product.price,
			}));
		} else {
			//Si el producto no está en el carrito, agregamos el producto a la lista de carrito
			const updatedCart = [...cart, { ...product, quantity: 1 }];
			//mantenemos los mismos objetos que estaban en `cart` (si había algún carrito anterior),
			//agregamos nuevos productos con una propiedad `quantity` inicial de 1.👀

			//Setamos el nuevo estado con la nueva lista de carrito (updatedCart)
			set((state) => ({
				cart: updatedCart,
				totalItems: state.totalItems + 1,
				totalPrice: state.totalPrice + product.price,
			}));
		}
	},

	//Setea un state con el producto eliminado del carrito. Si el producto no está en el carrito, no hace nada.
	removeFromCart: (product: ProductId) => {
		set((state) => ({
			cart: state.cart.filter(
				(item) => item.slug.current !== product.slug.current,
			), //Retorna un nuevo array que contiene solo los elementos que cumplieron la condición (es decir, cuyo slug es diferente al del producto actual).
			//TODO: hacer que si existen 2 iguales se remueva solo la quantity de 1
			totalItems: state.totalItems - 1,
			totalPrice: state.totalPrice - product.price,
		}));
	},
}));
