import styled from 'styled-components';

export const Wrapper = styled.div`
    width: auto;
    height: inherit;
    overflow-y: scroll;
`;

export const Row = styled.div`
    margin-top: 1.5rem;
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
    align-items: flex-end;

    .MuiFormHelperText-root.Mui-error.MuiFormHelperText-filled {
        position: absolute;
        bottom: -1.25rem;
    }
`;

export const Label = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: baseline;
    font-size: 0.75rem;
    white-space: pre;
    
    input {
        margin: 0 0.5rem;
    }
`;

export const WeekSelector = styled.div`
    margin-top: 1.5rem;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0.25rem;
    grid-row-gap: 0.25rem;
`;

export const MonthSlector = styled(WeekSelector)`
    grid-template-rows: repeat(5, 1fr);
`;

export const Editor = styled.div`
    width: 100%;
    @media screen and (min-width: 1024px) {
        max-width: 992px;
    }
`;

export const Text = styled.div`
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
`;

export const Columns = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Title = styled.h6`
    margin: 0;
    padding: 0;
`;

export const Output = styled.div`
    border-left: 1px solid ${({ colors }) => colors?.gray?.['300']};
    border-width: ${({ withBorder }) => (withBorder ? 1 : 0)};
    margin-left: ${({ withBorder }) => (withBorder ? '1rem' : '')};
    padding-left: ${({ withBorder }) => (withBorder ? '1rem' : '')};
`;
