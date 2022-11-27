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
      'https://base-ec2.akamaized.net/images/shop_front/kanmi-theshop-jp/438b0d103c9260910bdd940529497bf8.jpg',
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
