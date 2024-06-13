import type { NavigationGuardWithThis } from "vue-router";
import { useStore } from "@/stores/result";

export const clearLocalStorage: NavigationGuardWithThis<undefined> = (
  to,
  from,
  next,
) => {
  const store = useStore();
  store.$reset();
  next();
};
