/**
 * Shared pointer store — updated by a single passive pointermove listener.
 * Cursor, hero parallax, and spotlight read from here instead of adding their own listeners.
 */
export const pointer = { x: 0, y: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    },
    { passive: true }
  );
}
