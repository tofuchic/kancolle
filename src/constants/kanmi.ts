export interface MonthlyKanmi {
  year: number
  month: number
  mikanList: string[]
  imgURL: string
}

export const kanmi: MonthlyKanmi[] = [
  {
    year: 2022,
    month: 11,
    mikanList: [
      'taguchiwase',
      'kimurawase',
      'orogurosu',
      'yamashitabeniwase',
      'yurawase',
      'amakusa',
      'benimadonnna',
    ],
    imgURL:
      'https://raw.githubusercontent.com/tofuchic/kancolle/main/public/mikan/wanted-november.png',
  },
  {
    year: 2022,
    month: 12,
    mikanList: [
      'daimasaki',
      'sui-tosupuringu',
      'mihaya',
      'tunokagayaki',
      'nankan20gou',
      'harehime',
      'seinannohikari',
      'kurisumasutanzero',
    ],
    imgURL:
      'https://raw.githubusercontent.com/tofuchic/kancolle/main/public/mikan/wanted-december.png',
  },
]
