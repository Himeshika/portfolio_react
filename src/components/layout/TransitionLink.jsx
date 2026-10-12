import { useCallback } from 'react';
import { useTransition } from '../../context/TransitionContext';
import { prefetch } from '../../routes';

/**
 * Use TransitionLink instead of bare <Link> for all internal navigation.
 * Prefetches the chunk on pointerenter / focus / touchstart so it's
 * likely cached by the time the user clicks.
 */
export function TransitionLink({ to, children, className, ...rest }) {
  const { go } = useTransition();

  const handleClick = useCallback((e) => {
    e.preventDefault();
    go(to);
  }, [go, to]);

  const handlePrefetch = useCallback(() => prefetch(to), [to]);

  return (
    <a
      href={to}
      onClick={handleClick}
      onPointerEnter={handlePrefetch}
      onFocus={handlePrefetch}
      onTouchStart={handlePrefetch}
      className={className}
      data-cursor="link"
      {...rest}
    >
      {children}
    </a>
  );
}
