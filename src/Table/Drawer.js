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
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiFilter } from '@mdi/js';

import { TableContext } from './data/context';

export const TableDrawer = ({
  children,
  title,
  icon,
  notify,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useContext(TableContext);

  return (
    <GridItem width={8}>
      <Tooltip hasArrow label="Change filter" placement="auto">
        <Box position="relative">

          <IconButton
            isRound
            colorScheme="blue"
            icon={<MdiIcon path={icon || mdiFilter} size={0.6} />}
            onClick={onOpen}
          />
          { notify(state.current) && (
            <Box
              position="absolute"
              w={2}
              h={2}
              borderRadius="full"
              bg="tomato"
              borderWidth="1px"
              borderColor="red"
              top={-0.5}
              right={-0.5}
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
            {children}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </GridItem>
  );
};
