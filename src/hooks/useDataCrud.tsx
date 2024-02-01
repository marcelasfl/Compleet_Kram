export function useDataCrud(data?: Record<string, any>) {
  const hasId = data && 'id' in data

  return {
    isEdit: hasId,
  }
}
