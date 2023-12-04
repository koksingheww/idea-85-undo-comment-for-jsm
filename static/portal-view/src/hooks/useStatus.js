import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { invoke } from '@forge/bridge'

export function useGetStatusUpdate() {
  const result = useQuery({
    queryKey: ['get-status-update'],
    //get the issue ID from context
    queryFn: () => invoke('getForgeStorage', { issueId: '10123' }),
    refetchInterval: 3000,
  });
  const { isSuccess } = result;

  if (isSuccess) {
    return result;
  }

  return { ...result, data: undefined };
}