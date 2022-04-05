import styled from 'styled-components/macro';

export const Title = styled.div`
    font-family: "Poppins";
    font-style: normal;
    font-weight: normal;
    font-size: 0.75rem;
    text-transform: uppercase;
    display: flex;
    align-items: flex-start;
    word-break: break-all;
    min-width: 5rem;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid ${({ colors }) => colors?.gray?.['100']};
`;

export const Value = styled(Title)`
    word-break: break-all;
    font-family: "Lato";
    font-size: 1rem;
    text-transform: unset;
`;

export const NoValue = styled(Title)`
    color: ${({ colors }) => colors?.gray?.['300']};
    font-size: 0.875rem;
`;

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    border-top: 1px solid ${({ colors, borderTop }) => (borderTop ? colors?.gray?.['100'] : 'transparent')};
    border-bottom: 1px solid ${({ colors, borderBottom }) => (borderBottom ? colors?.gray?.['100'] : 'transparent')};

    ${Title} {
        padding: ${({ compact }) => (compact ? '0.25rem 0.25rem 0.25rem 0 ' : '1rem 1rem 1rem 0')};
    }
`;

export const Row = styled.div`
    padding: 0;
    display: flex;
    grid-column: 1/-1;
    border-bottom: 1px solid ${({ colors }) => colors?.gray?.['100']};
    &:last-of-type {
        border-bottom: none;
    }
`;
