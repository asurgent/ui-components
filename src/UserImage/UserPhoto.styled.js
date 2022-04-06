import styled from 'styled-components';

export const Wrapper = styled.div`
  user-select: none;
  font-size: ${({ size }) => size};
  width: ${({ size }) => size};
  height:${({ size }) => size};
  border-radius:  ${({ square }) => (square ? '3px' : '100%')};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-color: #fff;
  color: #fff;
  box-shadow:${({ bgColor }) => `0 0 0 2px ${bgColor}`};
  background: ${({ bgColor }) => bgColor};

  small {
    font-size: .4em;
    text-transform: uppercase;
  }
`;

export const Picture = styled.img`
    display: ${({ imageExists }) => (imageExists ? 'block' : 'none')};
    width: 100%;
    height: 100%;
`;
