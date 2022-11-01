import React from 'react';
import PropTypes from 'prop-types';
import { mdiTrashCan } from '@mdi/js';
import MdiIcon from '@mdi/react';

import {
  useTheme, Flex, Text, HStack, Button, Tooltip,
} from '@chakra-ui/react';
import * as C from './PreviewList.styled';
import translation from './PreviewList.translation';

const propTyps = {
  files: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  handleRemove: PropTypes.func.isRequired,
};

const PreviewList = (props) => {
  const {
    files,
    handleRemove,
  } = props;

  const { t } = translation;

  const { colors } = useTheme();

  return (
    <C.Container>
      {files.map((file, i) => (
        <C.ListItem colors={colors} key={file?.key}>
          <Flex justifyContent="space-between">
            <Text as="span" size={0.75}>{file?.name}</Text>

            <HStack spacing={4}>

              <Tooltip label={t('remove', 'ui')}>

                <Button
                  variant="link"
                  rightIcon={<MdiIcon path={mdiTrashCan} size={0.75} />}
                  value={i}
                  onClick={handleRemove}
                  style={{ color: '#EF6461' }}
                />
              </Tooltip>

            </HStack>
          </Flex>
        </C.ListItem>
      ))}
    </C.Container>

  );
};

PreviewList.propTypes = propTyps;

export default PreviewList;
