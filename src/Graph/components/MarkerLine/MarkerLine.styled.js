import styled from 'styled-components';

export const MarkerLine = styled.line`
    fill: none;
    stroke: ${({ colors, color }) => (color || colors?.ruby?.['800'])};
    stroke-dasharray: 5 3;
    stroke-width: 1px;
`;
