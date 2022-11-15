import React from 'react';
import Attachment from '../Attachment';

const Story = {
  title: 'Components/Attachment',
  component: Attachment,
  argTypes: {
    file: {
      control: {
        type: 'radio',
        options: [
          {
            attachment_url: 'https://www.funkopopmania.it/wp-content/uploads/2019/04/film-gandalf-il-signore-degli-anelli.jpg',
            content_type: 'image/jpeg',
            created: '2022-11-08T15:02:46Z',
            id: 43371373230,
            name: 'xianjuan-hu-uPYpcsbICI4-unsplash.jpg',
            size: 1528296,
            updated: '2022-11-08T15:02:59Z',
          },
        ],
      },
    },
  },
};
export default Story;

const AttachmentTemplate = (args) => (<Attachment {...args} />);

export const Main = AttachmentTemplate.bind({});
Main.args = {
  file: {
    attachment_url: 'https://www.funkopopmania.it/wp-content/uploads/2019/04/film-gandalf-il-signore-degli-anelli.jpg',
    content_type: 'image/jpeg',
    created: '2022-11-08T15:02:46Z',
    id: 43371373230,
    name: 'xianjuan-hu-uPYpcsbICI4-unsplash.jpg',
    size: 1528296,
    updated: '2022-11-08T15:02:59Z',
  },
};
