import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  padding: 0.5rem;
  border: 1px solid ${({ colors }) => colors?.gray?.['100']};
  width: 100%;
  background: white;

  .action-icon {
    color: ${({ colors }) => colors?.blue?.['800']};
    cursor: pointer;
    transition: color 200ms;
    &:hover {
      color: ${({ colors }) => colors?.blue?.['600']};
    }
  }
`;

export const FileExtensionWrapper = styled.div`
    position: absolute;
    top: 25%;

    .stripe {
      z-index: 5;
      position: relative;
      background-color: ${({ colors }) => colors?.blue?.['600']};
      padding: 0 3px;
      font-size: 8px;

      span {
        text-transform: uppercase;
        font-weight: 700;
        font-family: 'Fira Code', monospace;
        color: white;
      }
    }

    &:after {
      display: block;
      content: "";
      width: 10px;
      height: 5px;
      background-color: ${({ colors }) => colors?.blue?.['800']};
      clip-path: polygon(0 0, 100% 0, 100% 100%);
      position: absolute;
      left: 0;
      z-index: 4;
    }


  `;
