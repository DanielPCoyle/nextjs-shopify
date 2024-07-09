if (!process.env.BUILDER_PUBLIC_KEY) {
  throw new Error('Missing env varialbe BUILDER_PUBLIC_KEY')
}

export default {
  apiKey: "bea2326d65e644e99c62e2838b536b3a",
  productsModel: 'shopify-product',
  collectionsModel: 'shopify-collection',
}
