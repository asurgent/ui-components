import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Heading, useTheme } from '@chakra-ui/react';
import * as C from './SubnavigationBlock.styled';
import { Button } from '../../../Button';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  navigationList: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  children: null,
  title: null,
};

const propTypesNavGroup = {
  page: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Object),
  ]),
};

const defaultPropsNavGroup = {
  page: null,
};

const NavGroup = ({ page }) => {
  if (!page) { return null; }
  if (page.row) {
    return page.row;
  }

  const {
    path,
    label,
    clearStateKeys = [],
    isActive,
  } = page;

  return (
    <Button
      width="100%"
      bg={isActive ? '#f2f2f2' : 'transparent'}
      fontWeight={isActive ? 'bold' : 'normal'}
      justifyContent="flex-start"
      variant="ghost"
      internalLink={path}
      clearStateKeys={clearStateKeys}
      borderRadius={0}
      _hover={{ bg: ' #f8f8f8' }}
    >
      {label}
    </Button>
  );
};

NavGroup.propTypes = propTypesNavGroup;
NavGroup.defaultProps = defaultPropsNavGroup;

const SubnavigationBlock = ({ navigationList, title, children }) => {
  const { breakpoints, colors } = useTheme();

  const newNavigation = useMemo(() => {
    if (Array.isArray(navigationList[0])) {
      return navigationList.map((group, groupIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <C.Group key={groupIndex} colors={colors}>
          { group.map((page, pageIndex) => (
            <NavGroup
              page={page}
              // eslint-disable-next-line react/no-array-index-key
              key={`${page.path}${page.label}${pageIndex}`}
            />
          )) }
        </C.Group>
      ));
    }

    return (
      <C.Group colors={colors}>
        {navigationList.map((page) => <NavGroup page={page} key={page.path} />)}
      </C.Group>
    );
  }, [navigationList, colors]);

  return (
    <C.Wrapper breakpoints={breakpoints}>
      { title && <Heading as="h1">{title}</Heading> }
      <C.Navigation>
        { newNavigation }
      </C.Navigation>
      <C.Content breakpoints={breakpoints}>
        { children }
      </C.Content>
    </C.Wrapper>
  );
};

SubnavigationBlock.propTypes = propTypes;
SubnavigationBlock.defaultProps = defaultProps;

export default SubnavigationBlock;
