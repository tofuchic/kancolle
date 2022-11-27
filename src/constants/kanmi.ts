export interface MonthlyKanmi {
  year: number
  month: number
  mikanList: string[]
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
  },
  // {
  //   year: 2022,
  //   month: 12,
  //   mikanList: [
  //     'nankan20gou',
  //     'seinannohikari',
  //     'harehime',
  //     'sui-tosupuringu',
  //     'mihaya',
  //     'tunokagayaki',
  //     'daimasaki',
  //   ],
  // },
]
