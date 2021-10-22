import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMutation } from 'react-query';
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
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import {
  mdiCheck,
  mdiClose,
  mdiChevronDown,
} from '@mdi/js';
import { withFormControl } from '../withWrapper';
import { VirtualRender } from '../../VirtualRender';
import { FieldContext, FilterSelectContext } from '../data/formContext';
import translation from '../Form.translation';

const FilterContentComponent = () => {
  const searchPlaceholder = 'Search here';
  const { t } = translation;
  const [search, setSearch] = useState('');

  const field = useContext(FieldContext);
  const { facet, dataSource } = useContext(FilterSelectContext);
  const { mutate, data, isLoading } = dataSource;
  console.log(data);
  const handleFilterClick = (e) => {
    const newValue = new Set(field.value);
    newValue.add(e);
    field.onChange({ target: { value: [...newValue], name: field.name } });
  };

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = useMemo(() => {
    if (!data || isLoading || !data.facets?.[facet]) {
      return [];
    }

    const sortedItems = data.facets?.[facet]
      .map((filter) => ({
        title: filter.value,
        value: filter.value,
        subtitle: filter.count,
        isSelected: field.value?.includes(filter.value),
      }))
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
  }, [data, isLoading, search, field.value]);

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

const FilterSelectComponent = withFormControl(({
  filterPlaceholder,
  facet,
  service,
  label,
}) => {
  const { t } = translation;
  const {
    name,
    value,
    onChange,
  } = useContext(FieldContext);

  const handleClearFilter = () => {
    onChange({ target: { value: [], name } });
  };
  const hasAppliedFilter = !!value?.length;
  const dataSource = useMutation(service, {});

  return (
    <FilterSelectContext.Provider value={{ facet, dataSource }}>
      <Popover placement="bottom">
        {({ isOpen }) => (
          <>
            <ButtonGroup
              width="max"
              size="md"
              isAttached
              variant="outline"
              colorScheme="gray"
            >
              <PopoverTrigger>
                <Button
                  justifyContent="space-between"
                  iconSpacing
                  rightIcon={<MdiIcon path={mdiChevronDown} size={0.8} />}
                >
                  {filterPlaceholder}
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

            <PopoverContent maxWidth="500px">
              <PopoverHeader fontWeight="semibold">
                {t('changeFilter', 'ui')}
                {' '}
                <Code>{label}</Code>
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                {isOpen && <FilterContentComponent />}
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    </FilterSelectContext.Provider>
  );
});

export default FilterSelectComponent;
