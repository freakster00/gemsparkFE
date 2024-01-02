import React from 'react';
import { useTheme } from '@emotion/react';
import { TP } from '@/src/components/atoms/TypoGraphy';
import { LogoAexol, LogoAexolDark } from '@/src/assets';
import { Stack } from '@/src/components/atoms/Stack';
import { Link } from '@/src/components/atoms/Link';
import styled from '@emotion/styled';

export const Copy = () => {
    const theme = useTheme();
    const mode = 'light';
    return (
        <Link
            external
            href="https://aexol.com/pl/"
            style={{ color: mode === 'light' ? theme.gray(900) : theme.gray(200) }}>
            <Stack itemsCenter gap="0.5rem">
                <MadeBy size="1rem">&copy; 2023 Made by</MadeBy>
                {mode === 'light' ? <LogoAexol height={36} width={36} /> : <LogoAexolDark height={36} width={36} />}
            </Stack>
        </Link>
    );
};

const MadeBy = styled(TP)`
    color: ${({ theme }) => theme.gray(500)};
`;