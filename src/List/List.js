import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@chakra-ui/react';
import * as C from './List.styled';
import { hasValue } from './helpers';

const propTypes = {
  style: PropTypes.instanceOf(Object),
  rows: PropTypes.instanceOf(Array),
  borderBottom: PropTypes.bool,
  borderTop: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  compact: PropTypes.bool,
};

const defaultProps = {
  style: {},
  rows: [],
  children: null,
  borderBottom: false,
  borderTop: false,
  compact: false,
};

const List = ({
  rows,
  style,
  children,
  borderBottom,
  borderTop,
  compact,
}) => {
  const { colors } = useTheme();

  return (
    <C.Wrapper
      colors={colors}
      style={style}
      borderBottom={borderBottom}
      borderTop={borderTop}
      compact={compact}
    >
      { rows.map((item, index) => {
        if (!item) { return null; }

        const { label, value, row } = item;
        return (
        // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={`${value}${label}${index}-key`}>
            { !row && (
            <>
              <C.Title colors={colors}>
                { label }
              </C.Title>
              { hasValue(value) ? (
                <C.Value colors={colors}>
                  { value }
                </C.Value>
              ) : (
                <C.NoValue colors={colors}>
                  N/A
                </C.NoValue>
              )}
            </>
            )}
            { row && (
            <C.Row colors={colors}>{row}</C.Row>
            )}
          </React.Fragment>
        );
      })}
      { children }
    </C.Wrapper>
  );
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
