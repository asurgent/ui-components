import React, { useContext } from 'react';
import {
  Flex,
  Divider,
  Box,
  Heading,
  HStack,
  Code,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiFileDownloadOutline, mdiChevronDown } from '@mdi/js';
import { TableContext } from './data/context';
import translation from './Table.translation';

export const TableResultCount = () => {
  const { t } = translation;
  const { itemCount } = useContext(TableContext);

  const handleDownload = () => {
    console.log('download');
  };

  return (
    <Flex justify="right" direction="column" mt={2}>
      <Divider />
      <Menu>
        <MenuButton
          p={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="0"
          _focus={{ boxShadow: 'outline' }}
        >
          <HStack>
            <Heading size="xs" as="h6">
              {t('totalItems', 'ui')}
            </Heading>
            <Code>
              {itemCount}
            </Code>
            <MdiIcon path={mdiChevronDown} size={0.6} />
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleDownload}>
            <Box mr={2}>
              <MdiIcon path={mdiFileDownloadOutline} size={0.7} />
            </Box>
            {`${t('download', 'ui')} .csv`}
          </MenuItem>
        </MenuList>
      </Menu>
      <Divider />
    </Flex>
  );
};
