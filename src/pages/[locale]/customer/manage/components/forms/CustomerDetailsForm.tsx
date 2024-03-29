import { Stack } from '@/src/components/atoms/Stack';
import { Input, Banner } from '@/src/components/forms';
import { storefrontApiMutation } from '@/src/graphql/client';
import { ActiveCustomerSelector, ActiveCustomerType, ActiveOrderType } from '@/src/graphql/selectors';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomerLastOrder } from '../atoms/CustomerLastOrder';
import { useTranslation } from 'next-i18next';
import * as z from 'zod';
import { CustomerWrap, Form, StyledButton } from '../atoms/shared';

type CustomerDataForm = {
    addressEmail: ActiveCustomerType['emailAddress'];
    firstName: ActiveCustomerType['firstName'];
    lastName: ActiveCustomerType['lastName'];
    phoneNumber: ActiveCustomerType['phoneNumber'];
};

export const CustomerDetailsForm: React.FC<{
    initialCustomer: ActiveCustomerType;
    order: ActiveOrderType | null;
    language: string;
}> = ({ initialCustomer, order, language }) => {
    const { t } = useTranslation('customer');
    const { t: tErrors } = useTranslation('common');
    const [activeCustomer, setActiveCustomer] = useState<ActiveCustomerType>(initialCustomer);
    const [successBanner, setSuccessBanner] = useState<string>();

    const customerSchema = z.object({
        firstName: z.string().min(1, { message: tErrors('errors.firstName.required') }),
        lastName: z.string().min(1, { message: tErrors('errors.lastName.required') }),
        phoneNumber: z
            .string()
            .min(1, { message: tErrors('errors.phoneNumber.required') })
            .optional(),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CustomerDataForm>({
        values: {
            addressEmail: activeCustomer?.emailAddress,
            firstName: activeCustomer?.firstName || '',
            lastName: activeCustomer?.lastName || '',
            phoneNumber: activeCustomer?.phoneNumber,
        },
        resolver: zodResolver(customerSchema),
    });

    const onCustomerDataChange: SubmitHandler<CustomerDataForm> = async input => {
        const { firstName, lastName, phoneNumber } = input;

        const isDirty = Object.entries(input).every(
            ([key, value]) => value === activeCustomer[key as keyof ActiveCustomerType],
        );
        if (isDirty) return;

        try {
            const { updateCustomer } = await storefrontApiMutation(language)({
                updateCustomer: [{ input: { firstName, lastName, phoneNumber } }, ActiveCustomerSelector],
            });

            if (!updateCustomer) {
                setError('root', { message: tErrors('errors.backend.UNKNOWN_ERROR') });

                return;
            }

            setActiveCustomer(p => ({ ...p, ...updateCustomer }));
            setSuccessBanner(t('accountPage.detailsForm.successMessage'));
        } catch {
            setError('root', { message: tErrors('errors.backend.UNKNOWN_ERROR') });
        }
    };

    const hideSuccessBanner = () => setSuccessBanner(undefined);

    useEffect(() => {
        if (successBanner) {
            const timer = setTimeout(() => {
                setSuccessBanner(undefined);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successBanner]);

    return (
        <>
            <Banner clearErrors={hideSuccessBanner} success={{ message: successBanner }} />
            <CustomerWrap
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                }}>
                <Form onSubmit={handleSubmit(onCustomerDataChange)} noValidate>
                    <Stack column itemsCenter>
                        <Input
                            {...register('addressEmail')}
                            label={t('accountPage.detailsForm.addressEmail')}
                            disabled
                        />
                        <Stack w100 gap="1.25rem">
                            <Input
                                label={t('accountPage.detailsForm.firstName')}
                                {...register('firstName')}
                                error={errors.firstName}
                            />
                            <Input
                                label={t('accountPage.detailsForm.lastName')}
                                {...register('lastName')}
                                error={errors.lastName}
                            />
                        </Stack>
                        <Input
                            label={t('accountPage.detailsForm.phoneNumber')}
                            {...register('phoneNumber')}
                            error={errors.phoneNumber}
                        />
                    </Stack>
                    <StyledButton loading={isSubmitting} type="submit">
                        {t('accountPage.detailsForm.changeDetails')}
                    </StyledButton>
                </Form>
                {order && <CustomerLastOrder order={order} />}
            </CustomerWrap>
        </>
    );
};
