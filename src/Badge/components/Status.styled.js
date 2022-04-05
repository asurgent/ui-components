import styled from 'styled-components';

export const Status = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  background: 'transparent';
  color: ${({ color }) => color};
  text-transform: capitalize;
  align-items: center;
  font-family: poppins;
  font-weight: 500;

  margin-right: ${({ scale }) => `calc(${scale} * 0.5rem)`};
  line-height: ${({ scale }) => `calc(${scale} * 1.5rem)`} ;
  border-radius: 5px; 
  padding: ${({ scale }) => `0 calc(${scale} * 0.5rem)`};
  font-size: ${({ scale }) => `calc(${scale} * 0.875rem)`};
  background: ${({ bg }) => bg};

  svg {
      margin-right: 0.5rem;
  }
`;
