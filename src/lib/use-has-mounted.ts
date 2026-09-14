import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Liefert `false` beim Server-Render/ersten Client-Render und danach `true`.
 * Ersetzt das übliche `useState(false) + useEffect(() => setState(true))`-
 * Muster (das die React-Compiler-Regel `set-state-in-effect` beanstandet)
 * durch `useSyncExternalStore`, das für genau diesen Fall vorgesehen ist.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
