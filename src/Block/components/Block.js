import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@chakra-ui/react';
import * as C from './Block.styled';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func.isRequired,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  renderTransparent: PropTypes.bool,
  withMargins: PropTypes.bool,
  withBottomMargin: PropTypes.bool,
};
const defaultProps = {
  children: null,
  renderTransparent: false,
  withMargins: false,
  withBottomMargin: false,
};

export const Center = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Center
      breakpoints={breakpoints}
      renderTransparent={renderTransparent}
      withMargins={withMargins}
      withBottomMargin={withBottomMargin}
    >
      {children}
    </C.Center>
  );
};
Center.propTypes = propTypes;
Center.defaultProps = defaultProps;

export const Left = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Left
      breakpoints={breakpoints}
      renderTransparent={renderTransparent}
      withMargins={withMargins}
      withBottomMargin={withBottomMargin}
    >
      {children}
    </C.Left>
  );
};
Left.propTypes = propTypes;
Left.defaultProps = defaultProps;

export const Right = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Right
      breakpoints={breakpoints}
      renderTransparent={renderTransparent}
      withMargins={withMargins}
      withBottomMargin={withBottomMargin}
    >
      {children}
    </C.Right>
  );
};
Right.propTypes = propTypes;
Right.defaultProps = defaultProps;

export const Bordered = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => {
  const { colors, breakpoints } = useTheme();
  return (
    <C.Bordered
      breakpoints={breakpoints}
      colors={colors}
      renderTransparent={renderTransparent}
      withMargins={withMargins}
      withBottomMargin={withBottomMargin}
    >
      {children}
    </C.Bordered>
  );
};
Bordered.propTypes = propTypes;
Bordered.defaultProps = defaultProps;

export const Plain = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Plain
      breakpoints={breakpoints}
      renderTransparent={renderTransparent}
      withMargins={withMargins}
      withBottomMargin={withBottomMargin}
    >
      {children}
    </C.Plain>
  );
};
Plain.propTypes = propTypes;
Plain.defaultProps = defaultProps;

export const SpaceBetween = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.SpaceBetween
      breakpoints={breakpoints}
      renderTransparent={renderTransparent}
      withMargins={withMargins}
      withBottomMargin={withBottomMargin}
    >
      {children}
    </C.SpaceBetween>
  );
};
SpaceBetween.propTypes = propTypes;
SpaceBetween.defaultProps = defaultProps;

export const Stretch = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Stretch
      breakpoints={breakpoints}
      renderTransparent={renderTransparent}
      withMargins={withMargins}
      withBottomMargin={withBottomMargin}
    >
      {children}
    </C.Stretch>
  );
};
Stretch.propTypes = propTypes;
Stretch.defaultProps = defaultProps;

export const Wrap = ({
  children, renderTransparent, withMargins, withBottomMargin, wrapReverse,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Wrap
      breakpoints={breakpoints}
      wrapReverse={wrapReverse}
      renderTransparent={renderTransparent}
      withMargins={withMargins}
      withBottomMargin={withBottomMargin}
    >
      {children}
    </C.Wrap>
  );
};
Wrap.propTypes = { ...propTypes, wrapReverse: PropTypes.bool };
Wrap.defaultProps = { ...defaultProps, wrapReverse: false };

export const WrapGrid = ({
  children,
  renderTransparent,
  withMargins,
  withBottomMargin,
  columnMinWidth,
  gridGap,
  stretchColumns,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.WrapGrid
      breakpoints={breakpoints}
      renderTransparent={renderTransparent}
      withMargins={withMargins}
      withBottomMargin={withBottomMargin}
      columnMinWidth={columnMinWidth}
      gridGap={gridGap}
      stretchColumns={stretchColumns}
    >
      {children}
    </C.WrapGrid>
  );
};
WrapGrid.propTypes = {
  ...propTypes,
  columnMinWidth: PropTypes.number,
  gridGap: PropTypes.number,
  stretchColumns: PropTypes.bool,
};
WrapGrid.defaultProps = {
  ...defaultProps,
  columnMinWidth: 0,
  gridGap: 0,
  stretchColumns: false,
};
