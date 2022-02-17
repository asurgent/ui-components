import { darken } from 'polished';
import { withStyle } from 'styled-components';
import * as C from './Button.styled';

const Primary = (
  <C.Button style={{
    backgroundColor: theme.blue900,
    borderColor: darken(0.08, theme.blue900),
  }}
  />
);

const Secondary = withStyle((theme) => ({
  backgroundColor: theme.gold800,
  borderColor: darken(0.05, theme.gold800),
}))(C.Button);

const Reject = withStyle((theme) => ({
  backgroundColor: theme.ruby400,
  borderColor: darken(0.08, theme.ruby400),
}))(C.Button);

const Accept = withStyle((theme) => ({
  backgroundColor: theme.green400,
  borderColor: darken(0.08, theme.green400),
}))(C.Button);

const Create = withStyle((theme) => ({
  backgroundColor: theme.blue900,
  borderColor: theme.blue900,
}))(C.Button);

const Hollow = withStyle((theme) => ({
  backgroundColor: 'transparent',
  borderColor: theme.blue900,
  textColor: theme.blue900,
}))(C.Button);

const Transparent = withStyle((theme) => ({
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  textColor: theme.black,
}))(C.Button);

const Pill = withStyle((theme) => ({
  textColor: theme.black,
}))(C.Pill);

const CreateBlock = withStyle((theme) => ({
  textColor: theme.blue900,
}))(C.CreateBlock);

const Stretched = withStyle((theme) => ({
  textColor: theme.blue900,
}))(C.Stretched);

const iconPropsMapper = ({
  icon,
  iconLeft,
  iconRight,
  ...rest
}) => ({ mainIcon: icon, ...rest });
const Icon = withStyle()(C.Icon));
const Plain = withStyle()(C.Plain);
const Link = withStyle()(C.Link);

export {
  Primary,
  Secondary,
  Hollow,
  Plain,
  Reject,
  Accept,
  Icon,
  Transparent,
  Link,
  Create,
  Pill,
  CreateBlock,
  Stretched,
};
