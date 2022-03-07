import styled from 'styled-components';
import { BaseBlock } from '../Block.styled';

export const ErrorState = styled(BaseBlock)`
    justify-content: center;
    align-items: flex-start;  
    flex-direction: column;
    padding: 1rem;
    border: 1px solid;
    border-radius: 5px;
    background: ${({ colors }) => colors?.ruby?.['400']};
    border-color: ${({ colors }) => {
    console.log(colors?.ruby?.['300']);
    return colors?.ruby?.['300'];
  }};

    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        padding: 1rem;
    }
    > b.title {
        margin-bottom: 1rem;
    }
    p {
        margin: 0;
        padding: 0;
    }
`;

export const WarningState = styled(ErrorState)`
    background: ${({ colors }) => colors?.gold?.['400']};
    border-color: ${({ colors }) => colors?.gold?.['100']};
`;

export const InfoState = styled(ErrorState)`
    background: ${({ colors }) => colors?.blue?.['50']};
    border-color: ${({ colors }) => colors?.blue?.['800']};
`;
