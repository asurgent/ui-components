import styled from 'styled-components';

export const MenuWrapper = styled.div`
    @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
        position: absolute;
        right: 20px;
    }
`;

export const DesktopMenu = styled.div`
    position: absolute;
    width: auto;
    min-width: 17.5rem;
    height: auto;
    padding: 0.5rem 0;
    border-radius: 5px;
    background: ${({ colors }) => colors.white};
    border: 1px solid ${({ colors }) => colors?.gray?.['100']};
    box-shadow: 0 6px 10px -5px ${({ colors }) => colors?.gray?.['200']};
    top: 5px;
    right: -1px;

    .user-details {
      padding: 1rem;
      border-bottom: 1px solid ${({ colors }) => colors?.gray?.['100']};
    }

    form {
        padding: 1rem;
        border-bottom: 1px solid ${({ colors }) => colors?.gray?.['100']};
    }

    form > div {
        margin-bottom: 0;
    }

    b {
        display: inline-block;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    }

    small {
        display: block;
        font-size: 0.75rem;
        line-height: 1rem;
    }
    .plain {
        background: ${({ colors }) => colors?.gray?.['100']};
    }
`;

export const CreateTitle = styled.div``;

export const CreateItem = styled.div`
    display: grid;
    grid-template-columns: 1.3125rem 1fr;
    grid-column-gap: 1rem;
    grid-template-areas:
        "logo title"
        "logo desc";
    padding: 0.75rem 1.5rem;
    width: 100%;

     @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
        &:hover {
            background: ${({ colors }) => colors?.gray?.['50']};
        }
     }
  
   

    .create-icon {
        grid-area: logo;
        align-self: center;
        font-weight: 500;
    }
    .exit-icon {
        @media screen and (min-width: ${({ breakpoints }) => breakpoints.lg}) {
            margin-top: 1px;
        }
    }
    ${CreateTitle} {
        grid-area: title;
    }
`;

export const DesktopMenuFooter = styled.div`
`;

export const MobileMenu = styled.div`
    width: 100%;
    height: 100%;
    background: ${({ colors }) => colors.white};

    .close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
    }
    .user {
        padding: 2rem 1.5rem;
        height: auto;
        display: grid;
        grid-template-columns: min-content auto;
        grid-column-gap: 1rem;
        border-bottom: 1px solid ${({ colors }) => colors?.gray?.['300']};

        b {
            display: inline-block;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
        }
        small {
            display: block;
            font-size: 0.75rem;
            line-height: 1rem;
        }
    }
    .menu {
        flex: 1;
        overflow-y: auto;
        flex-flow: column;
        display: flex;

        form {
            padding: 1.5rem;
        }
    }
    .wrapper {
        padding: 0.5rem 0;
    }
`;

export const TabButton = styled.div`
    cursor:pointer;
    width: 100%;
    padding: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    background: ${({ active, colors }) => (active ? colors.white : colors?.gray?.['100'])};
    text-transform: uppercase;
    text-align: center;
    font-family: 'Poppins', sans-serif;
`;

export const Tabs = styled.div`
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
`;

export const Mobile = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`;

export const Desktop = styled.div`
    display: flex;
    align-items: center;
    position: relative;

`;
