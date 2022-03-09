import styled from 'styled-components';
import Input from '../../components/InputWrapper';

export const ButtonContainer = styled.div`
    display: flex;
    margin-top: 1.875rem;
    margin-bottom: 1.25rem;
`;

export const HiddenInput = styled.input`
    display: none;
`;

export const InputContainer = styled(Input)`
    margin-bottom: 1.5rem;
`;

export const Entry = styled.div`
  border-bottom: ${({ colors }) => `1px solid ${colors?.gray?.['200']}`};
  ${InputContainer} {
      margin-bottom: 1.5rem;
  }
  h5 {
      margin-top: 0;
  }
`;

export const Container = styled.div`
    width: 100%;
    & > * {
        padding: 2rem;
    } 

    ${Entry}:last-child {
        border-bottom: none;
    }
`;

export const Error = styled.div`
  flex: 1;
  margin-top: 0.25rem;
  font-size: 0.6875rem;
  letter-spacing: 0.0625rem;
  color: ${({ colors }) => colors?.ruby?.['800']};
  position: absolute; 
  top: 100%;
`;
