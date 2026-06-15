import { useQueryClient } from '@tanstack/react-query';
import { adminMutationInvalidations } from '@/lib/admin-query-keys';

export function useInvalidateAdminData() {
  const queryClient = useQueryClient();

  return () => {
    for (const key of adminMutationInvalidations) {
      void queryClient.invalidateQueries({ queryKey: key });
    }
  };
}
