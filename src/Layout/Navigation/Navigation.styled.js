import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    border-bottom: 1px solid ${({ colors }) => colors?.gray?.['300']};
   @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
        border-bottom: none;
    }
`;

export const NavigationItem = styled(NavLink)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    position: relative;
    padding: 0.75rem 1.5rem;
    color: ${({ colors }) => colors.black};
    width: 100%;

    @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
        justify-content: center;
        color: ${({ colors }) => colors.white};
        padding: 1rem 0;
    }

    &:hover {
        background: ${({ colors }) => colors?.gray?.['50']};
        @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
            background: inherit;
        }
    }

    &.active {
        background: ${({ colors }) => colors?.gray?.['100']};
        font-weight: 700;
        @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
            background: #20557c;
        }
    }

    span {
         margin-left: 1rem;

     }
`;

export const DropdownNavigationItem = styled(NavigationItem)`
    &:first-child {
        margin-top: 0.5rem;
    }
    &:hover {
        background: ${({ colors }) => colors?.gray?.['50']};
    }

   @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
        justify-content: flex-start;
        color: ${({ colors }) => colors.black};
        padding: 0.75rem 1.5rem;
    }

`;
