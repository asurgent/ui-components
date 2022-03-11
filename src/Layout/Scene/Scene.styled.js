import styled from 'styled-components';
import { theme } from '@chakra-ui/react';

export const Scene = styled.div`
    background: ${() => theme?.colors?.white};
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    display: block;
    padding-bottom: 2rem;

    @media screen and (min-width: ${() => theme.breakpoints.lg}) {
        margin-top: 0;
    }
`;
