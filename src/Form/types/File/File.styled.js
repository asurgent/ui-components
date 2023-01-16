import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const DropZone = styled.div`
  width: 100%;
  min-height: 150px;
  border-radius: 4px;
  border: 1px dashed ${({ colors }) => colors?.blue?.['500']};
  cursor: pointer;
  padding: 2rem 0;
  transition: background 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ isDragActive, colors }) => (isDragActive ? `background: ${colors?.cyan?.[100]};` : '')}
  ${({ limitReached }) => (limitReached ? css`
    background: none;
    padding: 0;
    min-height: 0;
    border: none;
  ` : '')}
  ${({
    isDragActive, limitReached, colors,
  }) => (isDragActive && limitReached ? `background: ${colors?.red?.[200]};` : '')}
  `;

export const DropOuterWrapper = styled.div`
  padding: 1rem;
`;

export const ListContainer = styled.div`
  border-bottom: ${({ colors }) => `1px solid ${colors?.gray?.['100']}`};
  width: 100%;
  padding: 1rem;
  `;
