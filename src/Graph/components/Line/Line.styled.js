import styled from 'styled-components';

export const Line = styled.path`
    fill: none;
    stroke: ${({ color }) => color || 'steelblue'};
    stroke-width: 1px;
`;
