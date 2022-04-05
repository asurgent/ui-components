import styled from 'styled-components';
import githubMarkdownCss from 'github-markdown-css';

export const Markdown = styled.div`
    min-width: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    
    ${githubMarkdownCss};

    * {
        background: transparent!important;
    }
     
    blockquote {
        /* height: ${({ foldQuotes }) => foldQuotes && '2rem '};
        overflow: hidden;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: ${({ foldQuotes }) => foldQuotes && '4.375rem'};
        position: relative; */
        
        
        &:after {
            display: none;
            position: absolute;
            content: "expand";
            font-size: 0.75rem;
            padding: 0.25rem;
            right: 0.875rem;
            top: 0;
            color: ${({ colors }) => colors?.gray?.['800']};
            border: 1px solid ${({ colors }) => colors?.gray?.['300']};
            background-color: white;
            border-radius: 3px;
            cursor: pointer;
        }

        &.collapsed {
            height: 2rem;
            overflow: hidden;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 4.375rem;
            position: relative;

            &:after {
                display: block;
            }
        }
/* 
        &.view {
            height: auto;
            overflow: visible;
            white-space: unset;
            text-overflow: unset;

            &:after {
                display: none;
            }
        } */
    }
`;
