import styled from 'styled-components/macro';
import { Text } from '@chakra-ui/react';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

export const Label = styled(Text)`
    user-select: none;
    margin: 0;
    color: ${({ selected, colors }) => (selected ? colors?.white : colors?.black)};
`;

export const Year = styled.div`
    border-radius: 5px;
    background: ${({ selected, colors }) => (selected ? colors?.blue?.['900'] : 'transparent')};
    transition: 0.15s;
    padding: 0.5625rem 1.125rem;
    cursor: pointer;
    width: 9.375rem;
`;
