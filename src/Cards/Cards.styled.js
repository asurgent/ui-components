import styled from 'styled-components';

export const TooltipParent = styled.span`
  background: transparent!important;
`;

export const Header = styled.div``;

export const Content = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem; 
`;

export const Separator = styled.div`
    height: 1px;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
    background: ${({ theme }) => theme.gray300};
`;

export const Footer = styled.div`
  & *:nth-child(2) {
    margin-top: 1.25rem;
  }
`;
