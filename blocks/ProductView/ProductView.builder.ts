import { Builder } from '@builder.io/react'
import dynamic from 'next/dynamic'
import { BuilderMarquee } from './BuilderMarquee';

const LazyProductView = dynamic(
  () => import(`blocks/ProductView/ProductView`),
  { ssr: true }
)

Builder.registerComponent(LazyProductView, {
  models: ['product-page', 'theme'],
  name: 'ProductView',
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/inpicture.svg',
  description:
    'Product details, should only be used in product page template, dynamically bind to product in context.',
  defaults: {
    bindings: {
      'component.options.product': 'state.product',
      'component.options.title': 'state.product.title',
      'component.options.description': 'state.product.descriptionHtml',
      'component.options.renderSeo': 'true',
    },
  },
})

Builder.registerComponent(LazyProductView, {
  name: 'ProductBox',
  models: ['page', 'collection-page', 'theme'],
  inputs: [
    {
      name: 'product',
      type: `ShopifyProductHandle`,
    },
    {
      name: 'description',
      richText: true,
      type: 'html',
      helperText: 'Override product description from shopify',
    },
    {
      name: 'title',
      type: 'text',
      helperText: 'Override product title from shopify',
    },
  ],
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg',
  description: 'Choose a product to show its details on page',
})

Builder.registerComponent(BuilderMarquee, {
  name: 'Marquee',
  inputs: [
    {
      name: 'children',
      type: 'list',
      subFields: [
        {
          name: 'content',
          type: 'text',
        },
        {
          name: 'color',
          type: 'color',
        },
      ],
    },
    {
      name: 'speed',
      type: 'number',
      defaultValue: 40,
    },
    {
      name: 'gap',
      type: 'number',
      defaultValue: 40,
    },
    {
      name: 'gradient',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name:"direction",
      type:"text",
      defaultValue:"left",
      enum: ["left", "right", "up", "down"]
    }
  ],
  description: 'Scrolling marquee',
})


