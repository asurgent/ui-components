/* eslint-disable react/prop-types */
import React from 'react';
import {
  Flex,
  Spacer,
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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiFilter } from '@mdi/js';

const Filter = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // const keyhandler = (event) => {
  //   event.preventDefault();

  //   if (event.keyCode === 13) {
  //     onApply();
  //     onClose();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("keydown", keyhandler);
  //   return () => window.removeEventListener("keydown", keyhandler);
  // }, []);

  return (
    <>
      <Tooltip hasArrow label="Change filter" placement="auto">
        <IconButton
          colorScheme="blue"
          aria-label="Search database"
          icon={<MdiIcon path={mdiFilter} size={0.6} />}
          onClick={onOpen}
        />
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Apply filter for...</DrawerHeader>

          <DrawerBody>
            <Text>
              Filter stuff here
            </Text>
            {children}
          </DrawerBody>

          <DrawerFooter>
            <Flex w="100%">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Spacer />
              <Button colorScheme="blue">
                Apply Filter
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Filter;
