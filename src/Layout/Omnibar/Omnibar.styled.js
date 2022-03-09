import styled from 'styled-components';
import { theme } from '@chakra-ui/react';

export const Omnibar = styled.div`
    top: 0;
    background: ${() => theme?.colors?.white};
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.5rem;
    position: relative;

    &:before {
        content: "";
        position: absolute;
        bottom: -8px;
        height: 8px;
        width: 100%;
        background: black;
        overflow: visible;
        background: rgb(2,0,36);
        background: linear-gradient( 180deg, rgba(2,0,36,0.1) 0%, rgba(0,0,0,0) 100%);
        z-index: 1;
    }

    @media screen and (min-width: ${() => theme.breakpoints.lg}) {
        padding: 0.5rem 1rem;
    }   
`;

export const LeftActions = styled.div`
    justify-content: flex-start;
    display: flex;
    flex: 1;

`;
export const RightActions = styled.div`
    justify-content: flex-end;
    display: flex;
    flex: 1;
`;
