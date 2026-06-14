import { useQueryClient } from "@tanstack/react-query";
import { applicationMutationInvalidations, resumeMutationInvalidations } from "@/lib/query-keys";

export function useInvalidateApplicationData() {
  const queryClient = useQueryClient();

  return () => {
    for (const key of applicationMutationInvalidations) {
      void queryClient.invalidateQueries({ queryKey: key });
    }
  };
}

export function useInvalidateResumeData() {
  const queryClient = useQueryClient();

  return () => {
    for (const key of resumeMutationInvalidations) {
      void queryClient.invalidateQueries({ queryKey: key });
    }
  };
}
