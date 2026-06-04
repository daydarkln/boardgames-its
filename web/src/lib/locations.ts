export const DEFAULT_CITY = 'Ростов-на-Дону'

export const ROSTOV_DISTRICTS = [
  'Ворошиловский',
  'Железнодорожный',
  'Кировский',
  'Ленинский',
  'Октябрьский',
  'Первомайский',
  'Пролетарский',
  'Советский',
] as const

export const rostovDistrictOptions = ROSTOV_DISTRICTS.map((district) => ({
  value: district,
  label: district,
}))
