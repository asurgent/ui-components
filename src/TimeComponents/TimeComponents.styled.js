import styled from 'styled-components/macro';

export const TextSmall = styled.p`
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    align-items: center;
    display: flex;
    justify-content: center;
    & > svg {
      margin-left: 5px;
    }
`;

export const TextNormal = styled.h4`
    display: flex;
    text-align: center;
    margin: 0;
    line-height: 28px;
    letter-spacing: 0.05em;
    font-weight: bold;
    align-items: center;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 3.75rem;
    p {
      margin: 0;
    }
    text-align: center;
    color: ${({ hasExpired, colors }) => (hasExpired ? colors?.gray?.['600'] : colors?.black)};
    margin-right: ${({ marginRight }) => marginRight && '1.25rem'};
    margin-left: ${({ marginLeft }) => marginLeft && '1.25rem'};
`;

export const Dates = styled.div`
    display: flex;
    align-items: center;

`;

export const Calendar = styled.div`
  width: 3.75rem;
  height: 3.75rem;
  border-top: 0.5rem solid;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
`;

export const StartDate = styled(Calendar)`
  border-top-color: ${({ hasExpired, colors }) => (hasExpired ? colors?.gray?.['600'] : colors?.green?.['700'])};
`;
export const EndDate = styled(Calendar)`
  border-top-color: ${({ hasExpired, colors }) => (hasExpired ? colors?.gray?.['600'] : colors?.ruby?.['800'])};
`;

export const Time = styled.div`
  background: ${({ colors }) => colors?.white};
  width: 100%;
  padding: 0.125rem 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-top: 4px;
  p {
    font-weight: bold;
  }
`;

export const DateAndTime = styled(Calendar)`
  border-top-color: ${({ colors, active }) => (active ? colors?.blue?.['900'] : colors?.gray?.['600'])};
`;

export const FlexCol = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
