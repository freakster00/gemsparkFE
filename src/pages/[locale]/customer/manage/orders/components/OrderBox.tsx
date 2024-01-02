import { Link } from '@/src/components/atoms/Link';
import { Price } from '@/src/components/atoms/Price';
import { ProductImage } from '@/src/components/atoms/ProductImage';
import { Stack } from '@/src/components/atoms/Stack';
import { TP } from '@/src/components/atoms/TypoGraphy';
import { OrderState } from '@/src/components/molecules/OrderState';
import { ActiveOrderType } from '@/src/graphql/selectors';
import { dateFormatter } from '@/src/util/dateFormatter';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import React from 'react';

export const OrderBox: React.FC<{ order: ActiveOrderType }> = ({ order }) => {
    const { t } = useTranslation('customer');
    return (
        <ClickableStack key={order.id}>
            <ContentStack w100 itemsStart gap="1.75rem">
                <Stack justifyBetween w100>
                    <Stack column w100 gap="0.75rem">
                        <Stack gap="1.75rem" itemsStart>
                            <ProductImage
                                size="thumbnail"
                                src={order.lines[0].featuredAsset?.preview}
                                alt={order.lines[0].productVariant.product.name}
                            />
                            <Stack column>
                                <Stack w100 column>
                                    <TP size="1.5rem" weight={500}>
                                        {t('ordersPage.orderDate')}:&nbsp;
                                    </TP>
                                    <TP>{dateFormatter(order.createdAt)}</TP>
                                </Stack>
                                <Stack w100 column>
                                    <TP size="1.5rem" weight={500}>
                                        {t('ordersPage.orderCode')}:&nbsp;
                                    </TP>
                                    <TP>{order.code}</TP>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack column w100>
                            <Stack w100 itemsCenter>
                                <TP size="1.5rem" weight={500}>
                                    {t('ordersPage.totalQuantity')}:&nbsp;
                                </TP>
                                <TP>{order.totalQuantity}</TP>
                            </Stack>
                            <Stack w100 itemsCenter>
                                <TP size="1.5rem" weight={500}>
                                    {t('ordersPage.totalItems')}:&nbsp;
                                </TP>
                                <TP>{order.lines.length}</TP>
                            </Stack>
                            <Stack w100 itemsCenter>
                                <TP size="1.5rem" weight={500}>
                                    {t('ordersPage.totalPrice')}:&nbsp;
                                </TP>
                                <Price currencyCode={order.currencyCode} price={order.totalWithTax} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack w100 column justifyBetween itemsEnd style={{ height: '100%' }}>
                    <OrderState state={order.state} column />
                    <Link href={`/customer/manage/orders/${order.code}`}>
                        <TP size="1.5rem" weight={500}>
                            {t('ordersPage.viewOrder')}
                        </TP>
                    </Link>
                </Stack>
            </ContentStack>
        </ClickableStack>
    );
};

const ContentStack = styled(Stack)`
    padding: 1.75rem;
    box-shadow: 0 0 0.75rem ${({ theme }) => theme.shadow};
`;

const ClickableStack = styled(Stack)`
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
        width: 100%;
    }
    width: 50%;
    padding: 1rem;
    position: relative;
`;
