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
  autoWidth: PropTypes.bool,
  withPadding: PropTypes.bool,
};
const defaultProps = {
  children: null,
  renderTransparent: false,
  withMargins: false,
  withBottomMargin: false,
  autoWidth: false,
  withPadding: false,
};

export const Center = ({
  children, renderTransparent, withMargins, withBottomMargin, autoWidth,
  withPadding,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Center
      autoWidth={autoWidth}
      withPadding={withPadding}
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
  children, renderTransparent, withMargins, withBottomMargin, autoWidth,
  withPadding,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Left
      autoWidth={autoWidth}
      withPadding={withPadding}
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
  children, renderTransparent, withMargins, withBottomMargin, autoWidth,
  withPadding,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Right
      autoWidth={autoWidth}
      withPadding={withPadding}
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
  children,
  renderTransparent,
  withMargins,
  withBottomMargin,
  autoWidth,
  withPadding,
  noShadow,
}) => {
  const { colors, breakpoints } = useTheme();
  return (
    <C.Bordered
      autoWidth={autoWidth}
      withPadding={withPadding}
      breakpoints={breakpoints}
      colors={colors}
      renderTransparent={renderTransparent}
      withMargins={withMargins}
      withBottomMargin={withBottomMargin}
      noShadow={noShadow}
    >
      {children}
    </C.Bordered>
  );
};
Bordered.propTypes = { ...propTypes, noShadow: PropTypes.bool };
Bordered.defaultProps = { ...defaultProps, noShadow: false };

export const Plain = ({
  children, renderTransparent, withMargins, withBottomMargin, autoWidth,
  withPadding,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Plain
      autoWidth={autoWidth}
      withPadding={withPadding}
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
  children, renderTransparent, withMargins, withBottomMargin, autoWidth,
  withPadding,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.SpaceBetween
      autoWidth={autoWidth}
      withPadding={withPadding}
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
  children, renderTransparent, withMargins, withBottomMargin, autoWidth,
  withPadding,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Stretch
      autoWidth={autoWidth}
      withPadding={withPadding}
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
  children, renderTransparent, withMargins, withBottomMargin, wrapReverse, autoWidth,
  withPadding,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.Wrap
      autoWidth={autoWidth}
      withPadding={withPadding}
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
  autoWidth,
  withPadding,
}) => {
  const { breakpoints } = useTheme();
  return (
    <C.WrapGrid
      autoWidth={autoWidth}
      withPadding={withPadding}
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
