import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { SSRQuery, storefrontApiQuery } from '@/src/graphql/client';
import { OrderSelector, OrderType } from '@/src/graphql/selectors';
import { Layout } from '@/src/layouts';
import { OrderConfirmation } from '../components/OrderConfirmation';
import { Content } from '../components/ui/Shared';
import { makeServerSideProps, prepareSSRRedirect } from '@/src/lib/getStatic';
import { usePush } from '@/src/lib/redirect';
import { getCollections } from '@/src/graphql/sharedQueries';
import { TP, Stack } from '@/src/components/atoms';
import { useTranslation } from 'next-i18next';
import { arrayToTree } from '@/src/util/arrayToTree';

const MAX_RETRIES = 3;

const ConfirmationPage: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
    const { t } = useTranslation('checkout');
    const [order, setOrder] = useState<OrderType | null>(props.orderByCode);
    const push = usePush();

    useEffect(() => {
        let retries = 0;

        const fetchOrder = async () => {
            try {
                const { orderByCode } = await storefrontApiQuery(props.language)({
                    orderByCode: [{ code: props.code }, OrderSelector],
                });
                if (orderByCode && !orderByCode.active) setOrder(orderByCode);
                else throw new Error('Order not found');
            } catch (error) {
                retries++;
                if (retries <= MAX_RETRIES) setTimeout(fetchOrder, 1000);
                else push('/');
            }
        };

        if (!order && props.code) fetchOrder();
    }, []);

    return (
        <Layout
            categories={props.collections}
            navigation={props.navigation}
            pageTitle={`${t('seoTitles.confirmation')}`}>
            {order ? (
                <Content>
                    <OrderConfirmation code={props.code} order={order} />
                </Content>
            ) : (
                <Content>
                    <Stack w100 justifyCenter itemsCenter>
                        <TP>{t('confirmation.orderNotFound')}</TP>
                    </Stack>
                </Content>
            )}
        </Layout>
    );
};

const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const r = await makeServerSideProps(['common', 'checkout'])(context);
    const homePageRedirect = prepareSSRRedirect('/')(context);
    const language = (context.params?.locale as string) ?? 'en';

    const collections = await getCollections(language);
    const navigation = arrayToTree(collections);
    const code = context.params?.code as string;
    if (!code) return homePageRedirect;

    try {
        const { orderByCode } = await SSRQuery(context)({
            orderByCode: [{ code }, OrderSelector],
        });

        if (!orderByCode || orderByCode.active) throw new Error(`Order not ready yet ${code}`);

        const returnedStuff = {
            ...r.props,
            collections,
            code,
            orderByCode,
            navigation,
            language,
        };

        return { props: returnedStuff };
    } catch (e) {
        return { props: { ...r.props, collections, code, navigation, orderByCode: null, language } };
    }
};

export { getServerSideProps };
export default ConfirmationPage;
