import styled from 'styled-components';

export const MenuWrapper = styled.div`
    background: white;
    position: relative;
    z-index: 2;
`;

export const DesktopMenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: auto;
    min-width: 17.5rem;
    height: auto;
    padding: 0.5rem 0;
    margin-top: 0.5rem;
    top: 5px;
    transform: translateY(10px);
    right: -1px;
    border-radius: 5px;
    background: ${({ colors }) => colors?.white};
    border: 1px solid ${({ colors }) => colors?.gray?.['100']};
    box-shadow: 0 6px 10px -5px ${({ colors }) => colors?.gray?.['200']};

    small {
        display: block;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }
`;

export const MobileMenu = styled.div`
    position: fixed;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    background: ${({ colors }) => colors?.white};
    border: 1px solid ${({ colors }) => colors?.gray?.['200']};
    display: flex;
    flex-direction: column;

    .close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
    }
`;

export const CreateTitle = styled.div``;

export const CreateDescription = styled.div`
    color: ${({ colors }) => colors?.gray?.['700']};
    font-size: 0.75rem;
`;

export const CreateItem = styled.div`
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    grid-template-areas:
        "logo title"
        "logo desc";
    padding: 0.5rem 1.5rem;

    &:hover {
        background: ${({ colors }) => colors?.gray?.['50']};
    }

    .create-icon {
        grid-area: logo;
        align-self: center;
        font-weight: bold;
    }
    ${CreateTitle} {
        grid-area: title;
    }

    ${CreateDescription} {
        grid-area: desc;
        &:first-letter {
          text-transform: uppercase;
        }
    }
`;

export const MobileContent = styled.div`
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
`;

export const Mobile = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    @media screen and (min-width: ${({ breakpoints }) => breakpoints.md}) {
        display: none;
    }
`;

export const Desktop = styled.div`
    display: none;
    align-items: center;
    position: relative;

    @media screen and (min-width: ${({ breakpoints }) => breakpoints.md}) {
        display: flex;
    }
`;
