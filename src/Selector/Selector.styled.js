import styled from 'styled-components';
import { Text } from '@chakra-ui/react';
import theme from '../lib/style/theme';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

export const Label = styled(Text)`
    user-select: none;
    margin: 0;
    color: ${({ selected }) => (selected ? theme.white : theme.black)};
`;

export const Year = styled.div`
    border-radius: 5px;
    background: ${({ selected }) => (selected ? theme.blue900 : 'transparent')};
    transition: 0.15s;
    padding: 0.5625rem 1.125rem;
    cursor: pointer;
    width: 9.375rem;
`;
