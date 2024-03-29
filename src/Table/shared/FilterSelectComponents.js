import React, {
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Button,
  Code,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Stack,
  Input,
  Box,
  Tooltip,
  ButtonGroup,
  IconButton,
  Skeleton,
  Text,
  Center,
  Heading,
  Wrap,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import {
  mdiCheck,
  mdiClose,
  mdiChevronDown,
} from '@mdi/js';
import { TableFilterTagGroup } from '../FilterTagGroup';
import { VirtualRender } from '../../VirtualRender';
import { TableContext } from '../data/context';
import { FILTER_KEY } from '../data/constants';
import translation from '../Table.translation';

export const FilterContentComponent = ({
  filterKey,
  searchPlaceholder,
  configuration,
  handleFilterClick,
}) => {
  const { t } = translation;
  const [search, setSearch] = useState('');
  const { dataSource, state } = useContext(TableContext);
  const {
    mutate,
    data,
    isLoading,
  } = dataSource;

  useEffect(() => {
    mutate({ isFilterTrigger: true, filterKey, ...state.getState() });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = useMemo(() => {
    if (!data || isLoading || !data.facets?.[filterKey]) {
      return [];
    }

    const sortedItems = data.facets?.[filterKey].map((filter) => {
      const { title, value, subtitle } = configuration(filter);
      const isSelected = state.getKey(FILTER_KEY)?.[filterKey]?.includes(value);
      return {
        title,
        value,
        subtitle,
        isSelected,
      };
    })
      .filter(({ title }) => {
        if (title) {
          return title
            .toString()
            .toUpperCase()
            .match(search.toString().toUpperCase());
        }

        return false;
      })
      .sort(({ title: a }, { title: b }) => {
        const textA = a.toUpperCase();
        const textB = b.toUpperCase();

        if (textA < textB) { return -1; }
        if (textA > textB) { return 1; }
        return 0;
      })
      .sort(({ isSelected: a }, { isSelected: b }) => {
        if (a && !b) { return -1; }
        if (!a && b) { return 1; }
        return 0;
      })
      .sort(({ subtitle: a }, { subtitle: b }) => {
        if (a < b) { return 1; }
        if (a > b) { return -1; }
        return 0;
      });

    return sortedItems;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, search, state.getKey(FILTER_KEY)]);

  return (
    <>
      <Box mb={2}>
        <Input
          placeholder={searchPlaceholder}
          onChange={({ target }) => setSearch(target.value)}
        />
      </Box>
      { !isLoading && items.length === 0 && search.length > 0
        && (

          <Center p={5}>
            <Heading as="h6" wordBreak="break-all" size="xs">
              {t('noMatch', 'ui')}
              {' '}
              {search}
            </Heading>
          </Center>

        )}
      { !isLoading > 0 && (
        <VirtualRender rowHeight={48} items={items} flex="1" maxHeight="20rem">
          {
            ({
              title,
              value,
              subtitle,
              isSelected,
            }, key) => (
              <Button
                key={key}
                onClick={() => handleFilterClick(value)}
                style={{ display: 'flex', justifyContent: 'space-between' }}
                variant="unstyled"
                isFullWidth
              >
                <Text fontSize="small" isTruncated mr={3}>{title}</Text>
                <Flex alignItems="center">
                  <Code>{subtitle}</Code>
                  {isSelected && (
                  <Box ml={3}>
                    <MdiIcon path={mdiCheck} size={0.6} />
                  </Box>
                  )}
                </Flex>
              </Button>
            )
          }
        </VirtualRender>
      )}

      { isLoading && (
        <Stack>
          <Skeleton height={8} />
          <Skeleton height={8} />
          <Skeleton height={8} />
          <Skeleton height={8} />
          <Skeleton height={8} />
          <Skeleton height={8} />
        </Stack>
      )}
    </>
  );
};

const getStyleFromMaxLength = (titleLength) => {
  const small = {
    width: '275px',
    minWidth: '275px',
    maxWidth: '275px',
  };

  const medium = {
    width: ['95vw', '60vw'],
    minWidth: ['95vw', '350px'],
    maxWidth: '400px',
  };

  const large = {
    width: ['95vw', '60vw'],
    minWidth: ['95vw', '420px'],
    maxWidth: '500px',
  };

  if (!titleLength || titleLength <= 20) {
    return small;
  }

  if (titleLength < 30) {
    return medium;
  }

  return large;
};

export const FilterSelectComponent = ({
  title,
  label,
  filterKey,
  color,
  renderTags,
  children,
}) => {
  const { t } = translation;
  const { state, filtersTitleLength } = useContext(TableContext);

  const hasAppliedFilter = !!state.getKey(FILTER_KEY)?.[filterKey]?.length;

  const handleClearFilter = useCallback(() => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
    state.setKey(FILTER_KEY, { ...current });
  }, [state]);

  const popOverWidth = useMemo(
    () => getStyleFromMaxLength(filtersTitleLength?.[filterKey]),
    [filtersTitleLength, filterKey],
  );

  return (
    <Stack>
      { title && (
        <Text fontSize="xs" mt={1}>
          {title}
        </Text>
      )}
      <Popover placement="bottom">
        {({ isOpen }) => (
          <>
            <ButtonGroup
              size="sm"
              isAttached
              width="auto"
              variant="outline"
              colorScheme="gray"
            >
              <PopoverTrigger>
                <Button
                  justifyContent="space-between"
                  mr="-px"
                  isFullWidth
                  iconSpacing
                  rightIcon={<MdiIcon path={mdiChevronDown} size={0.8} />}
                >

                  {label}
                </Button>
              </PopoverTrigger>
              { hasAppliedFilter && (
                <Tooltip hasArrow label={`${t('clearAppliedFilters', 'ui')} ${label}`} placement="auto">
                  <IconButton
                    onClick={handleClearFilter}
                    aria-label={t('removeFilter', 'ui')}
                    icon={<MdiIcon path={mdiClose} size={0.8} />}
                  />
                </Tooltip>
              ) }
            </ButtonGroup>

            <PopoverContent
              minWidth={popOverWidth?.minWidth}
              width={popOverWidth?.width}
              maxWidth={popOverWidth?.maxWidth}
            >
              <PopoverHeader fontWeight="semibold">
                {t('changeFilter', 'ui')}
                {' '}
                <Code>{label}</Code>
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                {isOpen && children({
                  searchPlaceholder: `${t('search', 'ui')} ${label.toLowerCase()}...`,
                })}
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>

      { renderTags && (
        <Box>
          <Wrap spacing={2}>
            <TableFilterTagGroup
              color={color}
              filterKey={filterKey}
              filterTitle={label}
            />
          </Wrap>
        </Box>
      )}
    </Stack>
  );
};

FilterSelectComponent.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  renderTags: PropTypes.bool,
  children: PropTypes.func.isRequired,
};

FilterSelectComponent.defaultProps = {
  title: '',
  color: null,
  renderTags: false,
};

FilterContentComponent.propTypes = {
  filterKey: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  configuration: PropTypes.func,
  handleFilterClick: PropTypes.func.isRequired,
};

FilterContentComponent.defaultProps = {
  filterKey: '',
  searchPlaceholder: '',
  configuration: (filter) => ({
    title: filter.value,
    value: filter.value,
    subtitle: filter.count,
  }),
};
