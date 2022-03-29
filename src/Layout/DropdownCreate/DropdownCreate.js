import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import {
  Collapse, useTheme,
} from '@chakra-ui/react';
import * as U from './DropdownCreate.styled';
import { Button } from '../../Button';

const btnPropTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string,
};
const btnDefaultProps = {
  onClick: () => null,
  title: '',
  description: '',
  onClose: null,
  link: null,
};

const CreateItemButton = ({
  onClick,
  title,
  description,
  onClose,
  icon,
  link,
}) => {
  const { colors } = useTheme();

  return (
    <Button
      variant="unstyled"
      internalLink={link}
      onClick={() => { onClick(); onClose(); }}
      textAlign="left"
      justifyContent="flex-start"
      p={0}
      height="auto"
      width="100%"
    >
      <U.CreateItem colors={colors}>
        <MdiIcon path={icon} className="create-icon" size={0.875} />
        <U.CreateTitle>{title}</U.CreateTitle>
        <U.CreateDescription colors={colors}>{description}</U.CreateDescription>
      </U.CreateItem>
    </Button>
  );
};

CreateItemButton.propTypes = btnPropTypes;
CreateItemButton.defaultProps = btnDefaultProps;

const dropdownPropTypes = {
  createActionList: PropTypes.instanceOf(Array).isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const dropdownDefaultProps = {};

const DropdownCreate = ({
  createActionList,
  onClose,
  isOpen,
}) => {
  const { colors, breakpoints } = useTheme();
  return (

    <U.MenuWrapper>
      <U.Desktop breakpoints={breakpoints}>
        <Collapse in={isOpen} animateOpacity>
          <U.DesktopMenu colors={colors}>
            {
              createActionList
                .map((action) => (
                  <CreateItemButton
                    key={action.title}
                    icon={action.icon}
                    title={action.title}
                    description={action.description}
                    link={action.link}
                    onClick={action.onClick}
                    onClose={onClose}
                  />
                ))
            }
          </U.DesktopMenu>
        </Collapse>
      </U.Desktop>
      <U.Mobile breakpoints={breakpoints}>
        <Collapse in={isOpen} animateOpacity>
          <U.MobileMenu colors={colors}>
            <Button
              variant="ghost"
              className="close"
              onClick={onClose}
              rightIcon={mdiClose}
            />
            <U.MobileContent>
              {
                  createActionList
                    .map((action) => (
                      <CreateItemButton
                        icon={action.icon}
                        key={action.title}
                        title={action.title}
                        description={action.description}
                        link={action.link}
                        onClick={action.onClick}
                        onClose={onClose}
                      />
                    ))
              }
            </U.MobileContent>
          </U.MobileMenu>
        </Collapse>
      </U.Mobile>
    </U.MenuWrapper>

  );
};

DropdownCreate.propTypes = dropdownPropTypes;
DropdownCreate.defaultProps = dropdownDefaultProps;

export default DropdownCreate;
