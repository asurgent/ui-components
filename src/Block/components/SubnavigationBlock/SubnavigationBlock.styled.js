import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    padding: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: 1fr;
    grid-template-areas:
        "navigation"
        "title"
        "content";
    overflow-x: auto;

    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        overflow-x: unset;
        grid-column-gap: 2.5rem;
        grid-template-columns: 15.625rem minmax(12.5rem , 63.125rem);
        grid-template-areas:
            ". title"
            "navigation content";
    }
    
    h1 {
        grid-area: title;
    }
`;

export const Content = styled.div`
    flex: 1;
    grid-area: content;
    overflow-x: auto;
    
    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        overflow-x: unset;
    }
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ colors }) => colors?.gray?.['300']};
    border-radius: 3px;
    margin-top: 1rem;

    &:first-of-type{
        margin-top: 0;
    }
`;

export const Navigation = styled.div`
    grid-area: navigation;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.div``;
