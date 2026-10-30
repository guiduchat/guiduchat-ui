import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type MouseEventHandler } from 'react';

import { icons } from '../../../../icons/catalog';
import { SvgButton } from '../../../../internal/SvgButton';
import { Icon } from '../../../Icon';
import { useAvatarContainerContext } from '../AvatarContainer/AvatarContainerContext';
import styles from './AvatarCloseButton.module.scss';
import { getButtonSize } from './helpers';

export interface AvatarCloseButtonProps extends ComponentProps<'button'> {
  'aria-label'?: string
}

export const AvatarCloseButton = forwardRef<HTMLButtonElement, AvatarCloseButtonProps>((props, forwardedRef) => {
  const {
    className,
    onClick,
    ...rest
  } = props;

  const { size: containerSize } = useAvatarContainerContext();

  const buttonSize = getButtonSize(containerSize);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick?.(e);
  };

  return (
    <SvgButton
      ref={forwardedRef}
      className={clsx(styles.AvatarCloseButton, className)}
      onClick={clickHandler}
      {...rest}
    >
      <Icon icon={icons.closeCircle} size={buttonSize} />
    </SvgButton>
  );
});

AvatarCloseButton.displayName = 'AvatarCloseButton';
