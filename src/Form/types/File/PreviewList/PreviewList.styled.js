import styled from 'styled-components';

export const Container = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  padding: 1rem;
  padding-left: 0;
  border-bottom: ${({ colors }) => `1px solid ${colors?.gray?.['100']}`};

  &:last-of-type {
    border: none;
    padding-bottom: 0;
  }
  `;
