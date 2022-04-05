import styled from 'styled-components/macro';
import * as User from '../CurrentUser/CurrentUser.styled';
import { Omnibar } from '../Omnibar/Omnibar.styled';
import { Scene } from '../Scene/Scene.styled';

export const Logo = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ colors }) => colors.white};
    margin-bottom: -1px;
    border-bottom: 1px solid;
    border-color: ${({ colors }) => colors?.gray?.['300']};

    svg {
        fill: ${({ colors }) => colors?.blue?.['900']};
        width: 60%;
    }
    @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
      background: ${({ colors }) => colors?.blue?.['900']};
      border-color: transparent;
        svg {
          fill: ${({ colors }) => colors.white};
        }
    }
`;

export const Top = styled.div`
    position: relative;
    background: ${({ colors }) => colors.white};
    padding: 1rem;
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 3.75rem;
    border-bottom: 1px solid ${({ colors }) => colors?.gray?.['50']};

    @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
        box-shadow: none;
    }

    ${User.Wrapper} {
        margin-left: 2rem;
    }
`;

export const Left = styled.div`
    background: ${({ colors }) => colors?.blue?.['900']};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const Content = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
        "omnibar"
        "scene";

    ${Omnibar} {
        grid-area: omnibar;
    }

    ${Scene} {
        grid-area: scene;
    }
`;

export const Main = styled.div`
    display: grid;
    height: 100vh;
    width: 100vw;
    background: ${({ colors }) => colors.white};
    position: relative;

    grid-template-columns: 3.75rem 1fr 1fr;
    grid-template-rows: 3.75rem 1fr;
    grid-template-areas:
        "top top top"
        "main main main";

    @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
        grid-template-areas:
            "top top top"
            "left main main";
    }


    ${Logo} {
        grid-area: logo;
    }

    ${Top} {
        grid-area: top;
    }

    ${Left} {
        grid-area: left;
        display: none;

        @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
            display: flex;
        }
    }

    ${Content} {
        grid-area: main;
    }
`;
