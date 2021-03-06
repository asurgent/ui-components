import styled from 'styled-components';

export const HiddenInput = styled.input`
    display: none;
`;

export const Entry = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: ${({ colors }) => `1px solid ${colors?.gray?.['200']}`};
    align-items: center;
    padding-right: 0.75rem;
    min-height: 3rem;
`;

export const Container = styled.div`
    width: 100%;
    ${Entry}:last-child {
        border-bottom: none;
    }
`;
