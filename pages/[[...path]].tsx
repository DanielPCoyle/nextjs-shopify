import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import {
  BuilderComponent,
  Builder,
  builder,
  useIsPreviewing,
} from '@builder.io/react'
import builderConfig from '@config/builder'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { resolveBuilderContent } from '@lib/resolve-builder-content'


builder.init(builderConfig.apiKey)
import '../blocks/ProductGrid/ProductGrid.builder'
import '../blocks/CollectionView/CollectionView.builder'
import { useThemeUI } from '@theme-ui/core'
import { getLayoutProps } from '@lib/get-layout-props'
import { useAddItemToCart } from '@lib/shopify/storefront-data-hooks'
import { useUI } from '@components/common/context'
import Link from '@components/common/Link'
import shopifyConfig from '@config/shopify'
import {
  getAllProductPaths,
  getProduct,
} from '@lib/shopify/storefront-data-hooks/src/api/operations'

const isProduction = process.env.NODE_ENV === 'production'

export async function getStaticProps({
  params,
  locale,
}: GetStaticPropsContext<{ path: string[] }>) {
  const page = await resolveBuilderContent('page', locale, {
    urlPath: '/' + (params?.path?.join('/') || ''),
  })

  const product = await getProduct(shopifyConfig, {
    handle: 'almost-houndstooth-sweater-vest',
  })

  const nav = await builder
  // Get the page content from Builder with the specified options
  .get("symbol", {
    query:{
      id: '582de51cd1ec42868995b68d7504a354'
    },
  })
  // Convert the result to a promise
  .toPromise();

  const footer = await builder
  // Get the page content from Builder with the specified options
  .get("symbol", {
    query:{
      id: '1965159bf2f24df2b28e1d4e2405a1d8'
    },
  })
  // Convert the result to a promise
  .toPromise();

  return {
    props: {
      page,
      nav,
      product,
      footer,
      locale,
      ...(await getLayoutProps()),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  return {
    paths: [],
    fallback: true,
  }
}

export default function Path({
  page,
  nav,
  footer,
  product,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { theme } = useThemeUI()
  const addToCart = useAddItemToCart()
  const isPreviewing = useIsPreviewing()
  const { openSidebar } = useUI()
  if (router.isFallback) {
    return null
    // return <h1>Loading...</h1>
  }
  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (!page && !isPreviewing) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        {Builder.isBrowser && <DefaultErrorPage statusCode={404} />}
      </>
    )
  }

  const { title, description, image } = page?.data! || {}
  return (
    <div>
      {title && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title,
            description,
            locale,
            ...(image && {
              images: [
                {
                  url: image,
                  width: 800,
                  height: 600,
                  alt: title,
                },
              ],
            }),
          }}
        />
      )}
        <BuilderComponent
        options={{ enrich: true }}
        model="symbol"
        content={nav}
        data={{product}}
        context={{
          productBoxService: {
            addToCart,
            navigateToCart() {
              openSidebar()
            },
            navigateToProductPage(product: { handle: string }) {
              router.push(`/product/${product.handle}`)
            },
          },
        }}
        />
        
      <BuilderComponent
        options={{ enrich: true }}
        model="page"
        data={{ theme }}
        context={{
          productBoxService: {
            addToCart,
            navigateToCart() {
              openSidebar()
            },
            navigateToProductPage(product: { handle: string }) {
              router.push(`/product/${product.handle}`)
            },
          },
        }}
        renderLink={(props: any) => {
          // nextjs link doesn't handle hash links well if it's on the same page (starts with #)
          if (props.target === '_blank' || props.href?.startsWith('#')) {
            return <Link as="a" {...props} />
          }
          return <Link {...props} as={Link} />
        }}
        {...(page && { content: page })}
      />
        {!Builder.isEditing && <BuilderComponent
        options={{ enrich: true }}
        model="symbol"
        content={footer}
        /> }
    </div>
  )
}
