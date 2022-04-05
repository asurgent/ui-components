import styled from 'styled-components';

export const SwitchWrapper = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
  width: ${({ size, borderSize }) => size - borderSize}rem;
  height: ${({ size, borderSize }) => (size / 2) - borderSize}rem;
  border-radius: ${({ size }) => (size / 2)}rem;
  padding: ${({ borderSize }) => (borderSize)}rem;
  background-color: ${({ value, colors }) => (value ? colors?.blue?.['900'] : colors?.blue?.['100'])};
  animation-duration: .25s;
  box-sizing: content-box;
  animation-name: ${({ value }) => (value ? 'toggleOn' : 'toggleOff')};


  @keyframes toggleOn {
    from {
      background-color: ${({ colors }) => colors?.blue?.['100']};
    }
    to {
      background-color: ${({ colors }) => colors?.blue?.['900']};
    }
  }

  @keyframes toggleOff {
    from {
      background-color: ${({ colors }) => colors?.blue?.['900']};
    }
    to {
      background-color: ${({ colors }) => colors?.blue?.['100']};
    }
  }
`;

export const Toggle = styled.div`
  position: absolute;
  height: ${({ borderSize }) => `calc(100% - ${borderSize * 2}rem)`};
  width: ${({ borderSize }) => `calc(50% - ${borderSize}rem)`};
  background-color: #fff;
  border-radius: 100%;
  transform: ${({ value }) => (value ? 'translateX(100%)' : 'translateX(0)')};
  transition: transform .25s;
`;

export const Label = styled.span`
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;
