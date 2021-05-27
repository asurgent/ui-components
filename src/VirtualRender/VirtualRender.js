import React, { createRef, useState, useLayoutEffect } from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.func.isRequired,
  rowHeight: PropTypes.number,
  style: PropTypes.instanceOf(Object),
};

const defaultProps = {
  rowHeight: 35,
  style: {},
};

const VirtualRender = ({
  items,
  rowHeight,
  children,
  ...props
}) => {
  const wrapperRef = createRef();
  const itemsRef = createRef();

  const [position, setPosition] = useState(0);
  const [index, setIndex] = useState(0);
  const [itemRenderCount, setItemRenderCount] = useState(0);

  const onScroll = () => {
    const { scrollTop } = wrapperRef.current;

    const maxScroll = ((items.length * rowHeight)) - itemsRef.current.offsetHeight;
    const scrollPostition = Math.max(0, Math.min(scrollTop, maxScroll));
    const scrollIndex = Math.ceil(scrollPostition / rowHeight);

    setPosition(scrollPostition);
    setIndex(scrollIndex);
  };

  useLayoutEffect(() => {
    const height = (wrapperRef.current.offsetHeight);
    setItemRenderCount(Math.ceil((height / rowHeight)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, index]);

  useLayoutEffect(() => {
    onScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <Box
      onScroll={onScroll}
      ref={wrapperRef}
      width="auto"
      height="inherit"
      overflowY="auto"
      {...props}
    >
      <Box height={`${items.length * rowHeight}px`} position="relative">
        <Box
          width="100%"
          ref={itemsRef}
          position="absolute"
          style={{ top: `${position}px`, height: `${rowHeight}px` }}
        >
          {
            [...items]
              .splice(index, itemRenderCount)
              .map((item, i) => (
                <Box height={`${rowHeight}px`} key={i}>
                  {children(item, i)}
                </Box>
              ))
          }
        </Box>
      </Box>
    </Box>
  );
};

VirtualRender.propTypes = propTypes;
VirtualRender.defaultProps = defaultProps;

export default VirtualRender;
