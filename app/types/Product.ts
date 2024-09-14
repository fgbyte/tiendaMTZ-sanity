export type Product = {
	name: string;
	price: number;
	slug: {
		current: string;
	};
	description: string;
	imageUrl: string;
};

export type ProductId = {
	name: string;
	price: number;
	stripeProductId: string;
	slug: {
		current: string;
	};
	quantity: number;
	description: string;
	image: {
		_key: string;
		_type: string;
		asset: {
			_ref: string;
			_type: string;
		};
	}[]; //este array[] al final es el que permite usar la prop .map en el elemento asignado con este tipo
};
