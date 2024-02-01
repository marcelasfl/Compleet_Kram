import i18n from '@/i18n'

export function patchNameIsCrudUpdate() {
  return window.location.pathname.includes('edit')
}

export function getCrudActionWithPatchName() {
  if (typeof window === 'undefined') return 'edit'
  return (window.location.pathname
    .match(/\/dashboard\/(.*)\/(.*)\/\d+/)
    ?.at(2) || 'add') as 'add' | 'edit'
}

export function getRawEntityNameWithPatchName() {
  if (typeof window === 'undefined') return ''
  return (
    window.location.pathname.match(/\/dashboard\/(.*?)\/(.*?)/)?.at(1) || ''
  )
}

export function getCrudFullActionWithPatchName() {
  const rawEntityName = getRawEntityNameWithPatchName()
  const action = getCrudActionWithPatchName()
  const key = action === 'add' ? 'crud.add' : 'crud.edit'
  return i18n.t(key, {
    entity: i18n.t(rawEntityName as never),
  }) as unknown as string
}
