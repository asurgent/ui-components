import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import {
  Tag, Divider, Flex, Wrap, Text, useTheme,
} from '@chakra-ui/react';
import { handleTags } from './handleTags';
import * as C from './Entity.styled';
import translation from './Entity.translation';

const { t } = translation;

const defaultProps = {
  id: '',
  name: '',
  type: '',
  resourceGroup: '',
  region: '',
  displayName: '',
  tags: [],
  hasCloudops: false,
};

const propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string,
  type: PropTypes.string,
  resourceGroup: PropTypes.string,
  region: PropTypes.string,
  displayName: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  hasCloudops: PropTypes.bool,
};

const Entity = ({
  id,
  type,
  tags,
  name,
  region,
  resourceGroup,
  displayName,
  hasCloudops,
}) => (
  <Flex flexDir="column" p={2}>
    <C.Header>
      <C.EntityName hasCloudops={hasCloudops}>
        <MdiIcon
          path={hasCloudops ? mdiEye : mdiEyeOff}
          size={0.625}
        />
        <Text fontWeight="bold">{name}</Text>
      </C.EntityName>
      <Text fontSize="sm">{`ID ${id}`}</Text>
    </C.Header>

    <Divider mb={1} />

    <C.Content>
      <Text fontWeight="bold">{displayName}</Text>
      <Text fontSize="sm">
        <C.Gray>{`${t('entityType', 'asurgentui')} `}</C.Gray>
        {type || 'N/A'}
      </Text>

      <Text fontSize="sm">
        <C.Gray>{`${t('resourceGroup', 'asurgentui')} `}</C.Gray>
        {resourceGroup || 'N/A'}
      </Text>

      <Text fontSize="sm">
        <C.Gray>{`${t('region', 'asurgentui')} `}</C.Gray>
        {region || 'N/A'}
      </Text>

      {tags?.length > 0 && (
        <>
          <Divider mt={1} mb={1} />
          <Text fontSize="sm">
            <C.Gray>{`${t('tags', 'asurgentui')} `}</C.Gray>
          </Text>
          <Wrap spacing={2} mb={2}>
            {handleTags({ items: tags, maxLength: 2 })?.map((tag) => <Tag key={tag} bg="#f5edd8">{tag}</Tag>)}
          </Wrap>
        </>
      )}

    </C.Content>
  </Flex>
);

Entity.propTypes = propTypes;
Entity.defaultProps = defaultProps;

export default Entity;
