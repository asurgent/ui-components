import React, { useContext } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  DrawerFooter,
  DrawerCloseButton,
  DrawerHeader,
  Button,
  Tooltip,
  useDisclosure,
  GridItem,
  Box,
  Stack,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiFilter } from '@mdi/js';
import { TableContext } from './data/context';
import translation from './Table.translation';

export const TableDrawer = ({
  children,
  tooltip,
  title,
  icon,
}) => {
  const { t } = translation;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useContext(TableContext);
  const notify = !!Object.values(state.current?.filter || {}).flat().length;

  return (
    <GridItem width={10}>
      <Tooltip hasArrow label={tooltip || t('changeFilter', 'ui')} placement="auto">
        <Box position="relative">
          <IconButton
            isRound
            colorScheme="asurgent"
            icon={<MdiIcon path={icon || mdiFilter} size={0.6} />}
            onClick={onOpen}
          />
          { notify && (
            <Box
              position="absolute"
              w={2}
              h={2}
              borderRadius="full"
              bg="tomato"
              borderWidth="1px"
              borderColor="red"
              top={0.5}
              right={0.5}
            />
          )}
        </Box>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>
            <Stack>
              {children}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>
              {t('close', 'ui')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </GridItem>
  );
};
