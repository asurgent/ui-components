import styled from 'styled-components';

export const SelectFilter = styled.div`
    display: flex;
    width: 100%;
`;

export const Input = styled.input`
    display: none;
`;

export const Output = styled.div`
    width: 100%;
    position: relative;
    user-select: none;
    display: flex;
    flex-direction: column;
    padding: 0.75rem;

    .down-arrow{
        display: absolute;
        top: 50%;
        transform: translateY(-50%)
    }
`;

export const Value = styled.div`
    padding-right: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ colors, asPlaceholder, disabled }) => ((asPlaceholder || disabled) ? colors?.gray?.['400'] : colors.black)};
    
    /* Tags */
    * {
        color: ${({ colors, disabled }) => (disabled ? colors?.gray?.['400'] : colors.black)};
    }
`;

export const SearchWrapper = styled.div`
    padding: 0.5rem ;
    background-color: ${({ colors }) => colors?.gray?.['50']};

    form {
        padding-right: 3rem;

        @media screen and (min-width: ${({ breakpoints }) => breakpoints.md}) {
            padding-right: 0;
        }
    }
`;

export const Search = styled.input`
    margin: 0;
    display: flex;
    align-items: center;
    border: 0.0625rem solid!important;
    border-color: ${({ colors }) => colors?.gray?.['200']}!important;
    border-radius: 5px;
    padding: 0.75rem;
    position: relative;
    box-sizing: border-box;
    min-height: 2.9375rem;
    background: ${({ colors }) => colors.white};
`;

export const Dropdown = styled.div`
    position: fixed;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    background: ${({ colors }) => colors.white};
    border: 1px solid ${({ colors }) => colors?.gray?.['200']};
    display: flex;
    flex-direction: column;
    
    .close {
        position: absolute;
        right: 1rem;
        top: 1rem;
    }

    @media screen and (min-width: ${({ breakpoints }) => breakpoints.md}) {
        position: absolute;
        width: auto;
        height: auto;
        max-height: 31.25rem;
        top: unset;
        bottom: unset;
        min-width: unset;
        left: 0;
        right: 0;
        border-radius: 5px;
        background: ${({ colors }) => colors.white};
        border: 1px solid ${({ colors }) => colors?.gray?.['200']};
        box-shadow: 0 6px 10px -5px ${({ colors }) => colors?.gray?.['200']};
        display: flex;
        flex-direction: column;  
        
        .close {
            display: none;
        }
    }
`;

export const ListWrapper = styled.div`
    flex:1;
    display: flex;
    position: relative;
    overflow:hidden;
`;
