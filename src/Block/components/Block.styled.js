import styled from 'styled-components/macro';

export const BaseBlock = styled.div`
    position: relative;
    width: ${({ autoWidth }) => (autoWidth ? 'auto' : '100%')};
    display: flex;
    flex-direction: column;
    margin: ${({ withMargins, withBottomMargin }) => {
    if (withMargins) {
      return '1rem';
    }
    if (withBottomMargin) {
      return '0 0 1rem 0';
    }
    return '0';
  }};
    padding: ${({ withPadding }) => (withPadding ? '1rem' : 0)};
    background: ${({ renderTransparent }) => (renderTransparent === true ? 'transparent' : '#fff')};
`;

export const Left = styled(BaseBlock)`
    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        padding: ${({ withPadding }) => (withPadding ? '2rem' : 0)};
    }
    align-items: flex-start;
`;

export const Center = styled(BaseBlock)`
    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        padding: ${({ withPadding }) => (withPadding ? '2rem' : 0)};
    }
    align-items: center;
`;

export const Right = styled(BaseBlock)`
    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        padding: ${({ withPadding }) => (withPadding ? '2rem' : 0)};
    }
    align-items: flex-end;
`;

export const Plain = styled(BaseBlock)`
    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        padding: ${({ withPadding }) => (withPadding ? '2rem' : 0)};
    }
    align-items: flex-start;
`;

export const Stretch = styled(BaseBlock)`
    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        padding: ${({ withPadding }) => (withPadding ? '2rem' : 0)};
    }
    align-items: stretch;
`;

export const Bordered = styled(BaseBlock)`
    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        padding: ${({ withPadding }) => (withPadding ? '2rem' : 0)};
    }
    border-radius: 5px;
    background: ${({ colors }) => colors.white};
    filter: ${({ noShadow }) => (noShadow ? 'none' : 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.2))')};
    border: ${({ colors, noShadow }) => (noShadow ? `1px solid ${colors?.gray?.['300']}` : 'none')};
`;

export const SpaceBetween = styled(BaseBlock)`
    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        padding: ${({ withPadding }) => (withPadding ? '2rem' : 0)};
    }
    justify-content: space-between;
    flex-direction: row;
    align-items: unset;
`;

export const Wrap = styled(BaseBlock)`   
    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        padding: ${({ withPadding }) => (withPadding ? '2rem' : 0)};
    }
    flex-wrap: ${({ wrapReverse }) => (wrapReverse === true ? 'wrap-reverse' : 'wrap')};
    flex-direction: unset;
`;

export const WrapGrid = styled(BaseBlock)`
    @media screen and (min-width: ${({ breakpoints }) => breakpoints?.md}) {
        padding: ${({ withPadding }) => (withPadding ? '2rem' : 0)};
    }
    display: grid;
    grid-template-columns: ${({ columnMinWidth }) => `repeat(auto-fit, minmax(${columnMinWidth || 200}px, 1fr))`};
    grid-gap: ${({ gridGap }) => (gridGap ? `${gridGap}px` : '0')};
    align-items: ${({ stretchColumns }) => (stretchColumns ? 'stretch' : 'start')};
`;
