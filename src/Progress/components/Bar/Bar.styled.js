import styled from 'styled-components/macro';

export const ProgessBar = styled.div`
  background: ${({ color }) => color};
  width: ${({ width }) => width};
  height: 100%;
`;

export const FilledPart = styled.div`
  background: ${({ color }) => color};
  height: ${({ progress }) => `${progress}%`};
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: ${({ height }) => height || '100%'};
`;
