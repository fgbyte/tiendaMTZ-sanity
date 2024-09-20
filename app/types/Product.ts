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
	}[]; //este array[] al final es el que permite usar la prop image.map en el elemento asignado con este tipo
};

export type ProductImage = {
	_key: string;
	_type: string;
	asset: {
		_ref: string;
		_type: string;
	}; //sin el [] al final
};
