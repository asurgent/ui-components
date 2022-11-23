import styled from 'styled-components';

import {

  Button,
  TagLabel as ChakraTagLabel,

} from '@chakra-ui/react';

export const Container = styled.div`
    width: 100%;
`;

export const InputAndButtonWrapper = styled.div`
display: grid;
grid-template-columns: 3fr 1fr;
grid-gap: 1rem;
`;

export const AddButton = styled(Button)`
  display: flex;
  height: 100%;
  &.active {
    background: var(--chakra-colors-gray-300);
  }
`;

export const TagLabel = styled(ChakraTagLabel)`
  cursor: pointer;
`;

export const TagsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-top: 1rem;
    > * {
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .highlight {
      background: var(--chakra-colors-green-300);
    }
    .editing {
      background: var(--chakra-colors-gold-200);
      color: black;
    }
`;
