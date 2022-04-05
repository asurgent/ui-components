import styled from 'styled-components/macro';

export const Dismiss = styled.div`
  cursor: pointer;
`;

export const Container = styled.div`
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 2rem;
   

    h3 {
        margin: 0;
    }
`;

export const ContainerPrimary = styled(Container)`
    color: ${({ colors }) => colors?.white};
    fill: ${({ colors }) => colors?.gold?.['800']};
    background: ${({ colors }) => colors?.blue?.['900']};
    border: 0.0625rem solid ${({ colors }) => colors?.blue?.['900']};
    margin-bottom: ${({ withBottomMargin }) => (withBottomMargin ? '1rem' : '0')};
`;

export const ContainerPlain = styled(Container)`
    fill: ${({ colors }) => colors?.gray?.['300']};
    color: ${({ colors }) => colors?.black};
    background: ${({ colors }) => colors?.white};
    border: 0.0625rem solid ${({ colors }) => colors?.gray?.['300']};
    margin-bottom: ${({ withBottomMargin }) => (withBottomMargin ? '1rem' : '0')};
`;

export const IconHolder = styled.div`
    display: flex;
    align-items: center;
    margin-right: 2.9375rem;
    font-size: 1.375rem;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;
