export default {
	name: 'product',
	title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'price',
            type: 'number',
            title: 'Price'
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description'
        },
        {
            title: 'Stripe Product ID',
            name: 'stripeProductId',
            type: 'string'
        },
        {
            name: 'image',
            type: 'array',
            title: 'Image',
            of: [{ type: 'image' }],
            options: {
                hotspot: true
            }
        },
    ],
}