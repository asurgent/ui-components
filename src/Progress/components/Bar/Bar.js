import React from 'react';
import PropTypes from 'prop-types';
import { Text, useTheme } from '@chakra-ui/react';
import * as C from './Bar.styled';

const propTypes = {
  progress: PropTypes.number,
  showNumber: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};
const defaultProps = {
  progress: 0,
  showNumber: true,
  width: '2px',
  height: null,
};

const Bar = ({
  progress, showNumber, width, height,
}) => {
  const { colors } = useTheme();
  return (
    <C.Container height={height}>
      {showNumber && <Text style={{ margin: '0 1.25rem 0 0', width: '2.5rem' }}>{`${progress}%`}</Text>}
      <C.ProgessBar width={width} color={colors?.gray?.['300']}>
        <C.FilledPart progress={progress} color={colors?.asurgent?.['500']} />
      </C.ProgessBar>
    </C.Container>
  );
};

Bar.propTypes = propTypes;
Bar.defaultProps = defaultProps;

export default Bar;
