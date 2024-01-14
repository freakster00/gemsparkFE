import React from 'react';
import '../styles/global.css';
import 'keen-slider/keen-slider.min.css';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Noto_Sans_HK } from 'next/font/google';
import { Global, ThemeProvider } from '@emotion/react';
import { LightTheme } from '@/src/theme';
import { CartProvider } from '@/src/state/cart';
import { CheckoutProvider } from '@/src/state/checkout';
import { ProductProvider } from '@/src/state/product';
import { CollectionProvider } from '@/src/state/collection';
import { ChakraProvider } from '@chakra-ui/react'

const sans = Noto_Sans_HK({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider>
        <ThemeProvider theme={LightTheme}>
            <Global styles={`body { font-family:${sans.style.fontFamily}; }`} />
            {/* `checkout` prop should exist only on routes with checkout functionally */}
            {'checkout' in pageProps ? (
                <CheckoutProvider initialState={{ checkout: pageProps.checkout, language: pageProps.language }}>
                    <Component {...pageProps} />
                </CheckoutProvider>
            ) : (
                <CartProvider>
                    <ProductProvider
                        initialState={{
                            language: 'language' in pageProps ? pageProps.language : undefined,
                            product: 'product' in pageProps ? pageProps.product : undefined,
                        }}>
                        <CollectionProvider
                            initialState={{
                                language: 'language' in pageProps ? pageProps.language : undefined,
                                collection: 'collection' in pageProps ? pageProps.collection : undefined,
                                products: 'products' in pageProps ? pageProps.products : undefined,
                                facets: 'facets' in pageProps ? pageProps.facets : undefined,
                                totalProducts: 'totalProducts' in pageProps ? pageProps.totalProducts : undefined,
                                filters: 'filters' in pageProps ? pageProps.filters : undefined,
                                searchQuery: 'searchQuery' in pageProps ? pageProps.searchQuery : undefined,
                                page: 'page' in pageProps ? pageProps.page : undefined,
                                sort: 'sort' in pageProps ? pageProps.sort : undefined,
                            }}>
                            <Component {...pageProps} />
                        </CollectionProvider>
                    </ProductProvider>
                </CartProvider>
            )}
        </ThemeProvider>
        </ChakraProvider>
    );
};

export default appWithTranslation(App);
