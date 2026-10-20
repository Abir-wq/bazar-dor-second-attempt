"use client";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
// Server HTML is not interactive until React has attached its event handlers.
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
