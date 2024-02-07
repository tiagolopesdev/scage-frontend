
export enum PrivacyEnumLive {
  NotListaded = 'Não listado',
  Public = 'Público',
  Privacy = 'Privado',
}

export const PrivacyEnumLiveOptions = [
  { label: Object.values(PrivacyEnumLive)[0] },
  { label: Object.values(PrivacyEnumLive)[1] },
  { label: Object.values(PrivacyEnumLive)[2] },
]