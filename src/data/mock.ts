import type { VintageItem, OutfitSet, RentalOrder } from '@/types'

export const vintageItems: VintageItem[] = [
  {
    id: 'item-001',
    name: '灯芯绒猎装夹克',
    category: 'outerwear',
    era: '1970s',
    year: '1972',
    size: 'M',
    wearLevel: 3,
    deposit: 800,
    color: '驼色',
    styleTags: ['休闲', '户外', '猎装'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20corduroy%20safari%20jacket%20tan%20brown%20on%20wooden%20hanger%20studio%20photography&image_size=portrait_4_3',
    description: '经典70年代灯芯绒猎装夹克，四口袋设计，铜扣微氧化，左肘处轻微磨损',
    occupiedPeriods: [
      { start: '2026-06-10', end: '2026-06-17', orderId: 'order-001' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-corduroy-jacket',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-001-s',
    name: '灯芯绒猎装夹克',
    category: 'outerwear',
    era: '1970s',
    year: '1972',
    size: 'S',
    wearLevel: 3,
    deposit: 800,
    color: '驼色',
    styleTags: ['休闲', '户外', '猎装'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20corduroy%20safari%20jacket%20tan%20brown%20on%20wooden%20hanger%20studio%20photography&image_size=portrait_4_3',
    description: '经典70年代灯芯绒猎装夹克，四口袋设计，铜扣微氧化，左肘处轻微磨损',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-corduroy-jacket',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-001-l',
    name: '灯芯绒猎装夹克',
    category: 'outerwear',
    era: '1970s',
    year: '1972',
    size: 'L',
    wearLevel: 3,
    deposit: 800,
    color: '驼色',
    styleTags: ['休闲', '户外', '猎装'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20corduroy%20safari%20jacket%20tan%20brown%20on%20wooden%20hanger%20studio%20photography&image_size=portrait_4_3',
    description: '经典70年代灯芯绒猎装夹克，四口袋设计，铜扣微氧化，左肘处轻微磨损',
    occupiedPeriods: [
      { start: '2026-06-22', end: '2026-06-28', orderId: 'order-future-009' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-corduroy-jacket',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-002',
    name: '高腰阔腿牛仔裤',
    category: 'bottoms',
    era: '1980s',
    year: '1985',
    size: 'L',
    wearLevel: 4,
    deposit: 500,
    color: '牛仔蓝',
    styleTags: ['休闲', '街头', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2080s%20high%20waist%20wide%20leg%20denim%20jeans%20faded%20blue%20studio%20photography&image_size=portrait_4_3',
    description: '80年代经典高腰阔腿裤，水洗渐变自然，右膝轻微破洞',
    occupiedPeriods: [
      { start: '2026-06-10', end: '2026-06-17', orderId: 'order-001' },
      { start: '2026-06-25', end: '2026-06-30', orderId: 'order-future-001' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-wide-jeans',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-002-m',
    name: '高腰阔腿牛仔裤',
    category: 'bottoms',
    era: '1980s',
    year: '1985',
    size: 'M',
    wearLevel: 4,
    deposit: 500,
    color: '牛仔蓝',
    styleTags: ['休闲', '街头', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2080s%20high%20waist%20wide%20leg%20denim%20jeans%20faded%20blue%20studio%20photography&image_size=portrait_4_3',
    description: '80年代经典高腰阔腿裤，水洗渐变自然，右膝轻微破洞',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-wide-jeans',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-003',
    name: '真丝印花衬衫',
    category: 'tops',
    era: '1960s',
    year: '1967',
    size: 'S',
    wearLevel: 2,
    deposit: 1200,
    color: '米白印花',
    styleTags: ['优雅', '晚宴', '波西米亚'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2060s%20silk%20floral%20print%20shirt%20cream%20background%20studio%20photography&image_size=portrait_4_3',
    description: '60年代真丝印花衬衫，佩斯利花纹，面料柔软，领口微泛黄',
    occupiedPeriods: [
      { start: '2026-06-05', end: '2026-06-12', orderId: 'order-002' },
      { start: '2026-06-20', end: '2026-06-23', orderId: 'order-future-002' }
    ],
    maintenancePeriods: [
      { start: '2026-06-28', end: '2026-07-05' }
    ],
    sameStyleGroupId: 'grp-silk-shirt',
    condition: { stains: true, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-003-m',
    name: '真丝印花衬衫',
    category: 'tops',
    era: '1960s',
    year: '1967',
    size: 'M',
    wearLevel: 2,
    deposit: 1200,
    color: '米白印花',
    styleTags: ['优雅', '晚宴', '波西米亚'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2060s%20silk%20floral%20print%20shirt%20cream%20background%20studio%20photography&image_size=portrait_4_3',
    description: '60年代真丝印花衬衫，佩斯利花纹，面料柔软，领口微泛黄',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-silk-shirt',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-004',
    name: '粗花呢西装外套',
    category: 'outerwear',
    era: '1950s',
    year: '1956',
    size: 'M',
    wearLevel: 2,
    deposit: 1500,
    color: '人字纹棕',
    styleTags: ['正式', '英伦', '学院'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2050s%20tweed%20blazer%20herringbone%20brown%20on%20wooden%20hanger%20studio&image_size=portrait_4_3',
    description: '50年代英伦粗花呢西装外套，人字纹编织，肘部皮质补丁',
    occupiedPeriods: [
      { start: '2026-06-08', end: '2026-06-15', orderId: 'order-003' },
      { start: '2026-07-01', end: '2026-07-05', orderId: 'order-future-003' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-tweed-blazer',
    condition: { stains: false, missingButtons: true, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-004-l',
    name: '粗花呢西装外套',
    category: 'outerwear',
    era: '1950s',
    year: '1956',
    size: 'L',
    wearLevel: 2,
    deposit: 1500,
    color: '人字纹棕',
    styleTags: ['正式', '英伦', '学院'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2050s%20tweed%20blazer%20herringbone%20brown%20on%20wooden%20hanger%20studio&image_size=portrait_4_3',
    description: '50年代英伦粗花呢西装外套，人字纹编织，肘部皮质补丁',
    occupiedPeriods: [],
    maintenancePeriods: [
      { start: '2026-06-19', end: '2026-06-23' }
    ],
    sameStyleGroupId: 'grp-tweed-blazer',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-005',
    name: '刺绣连衣裙',
    category: 'dress',
    era: '1970s',
    year: '1974',
    size: 'S',
    wearLevel: 1,
    deposit: 1800,
    color: '大地色系',
    styleTags: ['波西米亚', '度假', '优雅'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20embroidered%20maxi%20dress%20earth%20tones%20bohemian%20studio%20photography&image_size=portrait_4_3',
    description: '70年代波西米亚刺绣长裙，手工花卉刺绣，品相极佳',
    occupiedPeriods: [
      { start: '2026-06-12', end: '2026-06-19', orderId: 'order-005' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-embroidered-dress',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-005-m',
    name: '刺绣连衣裙',
    category: 'dress',
    era: '1970s',
    year: '1974',
    size: 'M',
    wearLevel: 1,
    deposit: 1800,
    color: '大地色系',
    styleTags: ['波西米亚', '度假', '优雅'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20embroidered%20maxi%20dress%20earth%20tones%20bohemian%20studio%20photography&image_size=portrait_4_3',
    description: '70年代波西米亚刺绣长裙，手工花卉刺绣，品相极佳',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-embroidered-dress',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-006',
    name: '麂皮流苏背心',
    category: 'tops',
    era: '1970s',
    year: '1973',
    size: 'M',
    wearLevel: 3,
    deposit: 900,
    color: '驼色',
    styleTags: ['波西米亚', '嬉皮', '休闲'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20suede%20fringe%20vest%20tan%20leather%20bohemian%20studio%20photography&image_size=portrait_4_3',
    description: '70年代麂皮流苏背心，自然磨损质感，流苏完整',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-suede-vest',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: true }
  },
  {
    id: 'item-006-s',
    name: '麂皮流苏背心',
    category: 'tops',
    era: '1970s',
    year: '1973',
    size: 'S',
    wearLevel: 3,
    deposit: 900,
    color: '驼色',
    styleTags: ['波西米亚', '嬉皮', '休闲'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20suede%20fringe%20vest%20tan%20leather%20bohemian%20studio%20photography&image_size=portrait_4_3',
    description: '70年代麂皮流苏背心，自然磨损质感，流苏完整',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-suede-vest',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-007',
    name: '工装背带裤',
    category: 'bottoms',
    era: '1940s',
    year: '1943',
    size: 'L',
    wearLevel: 4,
    deposit: 600,
    color: '靛蓝',
    styleTags: ['工装', '街头', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2040s%20workwear%20overalls%20denim%20faded%20indigo%20studio%20photography&image_size=portrait_4_3',
    description: '40年代工装背带裤，重磅丹宁，铜铆钉，自然岁月痕迹',
    occupiedPeriods: [
      { start: '2026-06-01', end: '2026-06-08', orderId: 'order-004' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-workwear-overalls',
    condition: { stains: true, missingButtons: false, zipperIssue: true, liningIssue: false }
  },
  {
    id: 'item-007-m',
    name: '工装背带裤',
    category: 'bottoms',
    era: '1940s',
    year: '1943',
    size: 'M',
    wearLevel: 4,
    deposit: 600,
    color: '靛蓝',
    styleTags: ['工装', '街头', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2040s%20workwear%20overalls%20denim%20faded%20indigo%20studio%20photography&image_size=portrait_4_3',
    description: '40年代工装背带裤，重磅丹宁，铜铆钉，自然岁月痕迹',
    occupiedPeriods: [],
    maintenancePeriods: [
      { start: '2026-06-20', end: '2026-06-25' }
    ],
    sameStyleGroupId: 'grp-workwear-overalls',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-008',
    name: '丝绒晚宴外套',
    category: 'outerwear',
    era: '1960s',
    year: '1968',
    size: 'M',
    wearLevel: 2,
    deposit: 1600,
    color: '酒红',
    styleTags: ['晚宴', '优雅', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2060s%20velvet%20dinner%20jacket%20deep%20burgundy%20studio%20photography&image_size=portrait_4_3',
    description: '60年代丝绒晚宴外套，深酒红，缎面翻领，品相优秀',
    occupiedPeriods: [
      { start: '2026-06-05', end: '2026-06-12', orderId: 'order-002' },
      { start: '2026-06-22', end: '2026-06-26', orderId: 'order-future-004' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-velvet-jacket',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-008-s',
    name: '丝绒晚宴外套',
    category: 'outerwear',
    era: '1960s',
    year: '1968',
    size: 'S',
    wearLevel: 2,
    deposit: 1600,
    color: '酒红',
    styleTags: ['晚宴', '优雅', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2060s%20velvet%20dinner%20jacket%20deep%20burgundy%20studio%20photography&image_size=portrait_4_3',
    description: '60年代丝绒晚宴外套，深酒红，缎面翻领，品相优秀',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-velvet-jacket',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-008-l',
    name: '丝绒晚宴外套',
    category: 'outerwear',
    era: '1960s',
    year: '1968',
    size: 'L',
    wearLevel: 2,
    deposit: 1600,
    color: '酒红',
    styleTags: ['晚宴', '优雅', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2060s%20velvet%20dinner%20jacket%20deep%20burgundy%20studio%20photography&image_size=portrait_4_3',
    description: '60年代丝绒晚宴外套，深酒红，缎面翻领，品相优秀',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-velvet-jacket',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-009',
    name: '格纹毛呢半裙',
    category: 'bottoms',
    era: '1960s',
    year: '1965',
    size: 'S',
    wearLevel: 2,
    deposit: 700,
    color: '红绿格纹',
    styleTags: ['学院', '英伦', '优雅'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2060s%20tartan%20wool%20skirt%20A-line%20green%20red%20studio%20photography&image_size=portrait_4_3',
    description: '60年代A字格纹半裙，苏格兰格纹，羊毛面料，拉链顺滑',
    occupiedPeriods: [
      { start: '2026-06-08', end: '2026-06-15', orderId: 'order-003' },
      { start: '2026-06-28', end: '2026-07-02', orderId: 'order-future-005' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-tartan-skirt',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-009-m',
    name: '格纹毛呢半裙',
    category: 'bottoms',
    era: '1960s',
    year: '1965',
    size: 'M',
    wearLevel: 2,
    deposit: 700,
    color: '红绿格纹',
    styleTags: ['学院', '英伦', '优雅'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2060s%20tartan%20wool%20skirt%20A-line%20green%20red%20studio%20photography&image_size=portrait_4_3',
    description: '60年代A字格纹半裙，苏格兰格纹，羊毛面料，拉链顺滑',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-tartan-skirt',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-010',
    name: '牛仔短靴',
    category: 'shoes',
    era: '1980s',
    year: '1982',
    size: '38',
    wearLevel: 3,
    deposit: 1000,
    color: '棕色',
    styleTags: ['西部', '街头', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2080s%20cowboy%20boots%20brown%20leather%20embroidered%20studio%20photography&image_size=portrait_4_3',
    description: '80年代牛仔短靴，棕色皮革，手工刺绣花纹，鞋底磨损适中',
    occupiedPeriods: [
      { start: '2026-06-08', end: '2026-06-15', orderId: 'order-003' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-cowboy-boots',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: true }
  },
  {
    id: 'item-010-37',
    name: '牛仔短靴',
    category: 'shoes',
    era: '1980s',
    year: '1982',
    size: '37',
    wearLevel: 3,
    deposit: 1000,
    color: '棕色',
    styleTags: ['西部', '街头', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2080s%20cowboy%20boots%20brown%20leather%20embroidered%20studio%20photography&image_size=portrait_4_3',
    description: '80年代牛仔短靴，棕色皮革，手工刺绣花纹，鞋底磨损适中',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-cowboy-boots',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-010-39',
    name: '牛仔短靴',
    category: 'shoes',
    era: '1980s',
    year: '1982',
    size: '39',
    wearLevel: 3,
    deposit: 1000,
    color: '棕色',
    styleTags: ['西部', '街头', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2080s%20cowboy%20boots%20brown%20leather%20embroidered%20studio%20photography&image_size=portrait_4_3',
    description: '80年代牛仔短靴，棕色皮革，手工刺绣花纹，鞋底磨损适中',
    occupiedPeriods: [
      { start: '2026-06-24', end: '2026-06-30', orderId: 'order-future-010' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: 'grp-cowboy-boots',
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-011',
    name: '钩针编织披肩',
    category: 'accessories',
    era: '1970s',
    year: '1976',
    size: 'ONE SIZE',
    wearLevel: 2,
    deposit: 400,
    color: '米白',
    styleTags: ['波西米亚', '度假', '优雅'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20crochet%20shawl%20cream%20handmade%20bohemian%20studio%20photography&image_size=portrait_4_3',
    description: '70年代手工钩针披肩，奶油白色，花纹精致',
    occupiedPeriods: [
      { start: '2026-06-10', end: '2026-06-17', orderId: 'order-001' },
      { start: '2026-06-12', end: '2026-06-19', orderId: 'order-005' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: undefined,
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-012',
    name: '双排扣海军风大衣',
    category: 'outerwear',
    era: '1940s',
    year: '1946',
    size: 'L',
    wearLevel: 3,
    deposit: 1400,
    color: '藏青',
    styleTags: ['海军风', '正式', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2040s%20double%20breasted%20peacoat%20navy%20wool%20brass%20buttons%20studio&image_size=portrait_4_3',
    description: '40年代海军呢大衣，藏青色重磅羊毛，铜扣有绿锈',
    occupiedPeriods: [
      { start: '2026-06-19', end: '2026-06-24', orderId: 'order-future-006' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: undefined,
    condition: { stains: false, missingButtons: true, zipperIssue: false, liningIssue: true }
  },
  {
    id: 'item-013',
    name: '复古牛皮医生包',
    category: 'bags',
    era: '1950s',
    year: '1958',
    size: 'ONE SIZE',
    wearLevel: 2,
    deposit: 1100,
    color: '深棕',
    styleTags: ['复古', '正式', '经典'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2050s%20leather%20doctor%20bag%20dark%20brown%20brass%20hardware%20studio%20photography&image_size=portrait_4_3',
    description: '50年代经典医生包款式，牛皮材质，黄铜五金，品相完好',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: undefined,
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-014',
    name: '编织藤条手提包',
    category: 'bags',
    era: '1970s',
    year: '1975',
    size: 'ONE SIZE',
    wearLevel: 3,
    deposit: 350,
    color: '藤编原色',
    styleTags: ['度假', '波西米亚', '休闲'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20wicker%20rattan%20handbag%20natural%20beach%20bohemian%20studio%20photography&image_size=portrait_4_3',
    description: '70年代手工藤编包，度假风格，皮制提手有自然磨损',
    occupiedPeriods: [
      { start: '2026-06-21', end: '2026-06-27', orderId: 'order-future-007' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: undefined,
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-015',
    name: '珍珠项链套装',
    category: 'accessories',
    era: '1960s',
    year: '1964',
    size: 'ONE SIZE',
    wearLevel: 1,
    deposit: 600,
    color: '奶白',
    styleTags: ['优雅', '晚宴', '复古'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2060s%20pearl%20necklace%20set%20elegant%20cream%20jewelry%20studio%20photography&image_size=portrait_4_3',
    description: '60年代仿珍珠三层项链，配耳夹套装，光泽度好',
    occupiedPeriods: [
      { start: '2026-06-24', end: '2026-06-28', orderId: 'order-future-008' }
    ],
    maintenancePeriods: [],
    sameStyleGroupId: undefined,
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-alt-001',
    name: '麂皮狩猎夹克',
    category: 'outerwear',
    era: '1970s',
    year: '1975',
    size: 'M',
    wearLevel: 2,
    deposit: 950,
    color: '深棕',
    styleTags: ['休闲', '户外', '猎装'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20suede%20hunting%20jacket%20dark%20brown%20leather%20studio%20photography&image_size=portrait_4_3',
    description: '70年代麂皮狩猎夹克，深棕色，翻领设计，皮质纽扣',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: undefined,
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-alt-002',
    name: '羊毛直筒裤',
    category: 'bottoms',
    era: '1970s',
    year: '1976',
    size: 'M',
    wearLevel: 2,
    deposit: 550,
    color: '驼色',
    styleTags: ['休闲', '复古', '正式'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2070s%20wool%20straight%20leg%20trousers%20camel%20tan%20studio%20photography&image_size=portrait_4_3',
    description: '70年代羊毛直筒裤，驼色，裤型挺括，压折线清晰',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: undefined,
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  },
  {
    id: 'item-alt-003',
    name: '雪纺波点衬衫',
    category: 'tops',
    era: '1960s',
    year: '1966',
    size: 'M',
    wearLevel: 1,
    deposit: 900,
    color: '白底黑点',
    styleTags: ['优雅', '复古', '学院'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2060s%20chiffon%20polka%20dot%20blouse%20white%20black%20dots%20studio%20photography&image_size=portrait_4_3',
    description: '60年代雪纺波点衬衫，蝴蝶结系带，面料轻盈飘逸',
    occupiedPeriods: [],
    maintenancePeriods: [],
    sameStyleGroupId: undefined,
    condition: { stains: false, missingButtons: false, zipperIssue: false, liningIssue: false }
  }
]

export const outfitSets: OutfitSet[] = [
  {
    id: 'outfit-001',
    name: '波西米亚流浪者',
    items: ['item-001', 'item-002', 'item-011'],
    totalDeposit: 1700,
    description: '70年代自由灵魂——灯芯绒猎装搭配高腰牛仔，钩针披肩点缀，随性而不将就',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bohemian%20outfit%20flat%20lay%2070s%20corduroy%20jacket%20wide%20jeans%20crochet%20shawl%20earth%20tones&image_size=landscape_16_9'
    ]
  },
  {
    id: 'outfit-002',
    name: '英伦绅士俱乐部',
    items: ['item-004', 'item-009', 'item-010'],
    totalDeposit: 3200,
    description: '50年代粗花呢配60年代格纹半裙，牛仔靴收尾——跨年代混搭的优雅叛逆',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=british%20gentleman%20outfit%20flat%20lay%20tweed%20blazer%20tartan%20skirt%20cowboy%20boots%20vintage&image_size=landscape_16_9'
    ]
  },
  {
    id: 'outfit-003',
    name: '午夜丝绒',
    items: ['item-008', 'item-003'],
    totalDeposit: 2800,
    description: '深红丝绒外套覆上佩斯利真丝衬衫，60年代晚宴的灵魂，穿越到今夜',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=midnight%20velvet%20outfit%20flat%20lay%20burgundy%20jacket%20silk%20shirt%20vintage%20evening&image_size=landscape_16_9'
    ]
  },
  {
    id: 'outfit-004',
    name: '西岸嬉皮',
    items: ['item-006', 'item-002', 'item-011'],
    totalDeposit: 1800,
    description: '流苏背心+阔腿牛仔+钩针披肩，1973年的加州阳光',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hippie%20outfit%20flat%20lay%20suede%20fringe%20vest%20wide%20jeans%20crochet%20bohemian%2070s&image_size=landscape_16_9'
    ]
  },
  {
    id: 'outfit-005',
    name: '工装日记',
    items: ['item-007', 'item-001'],
    totalDeposit: 1400,
    description: '40年代工装裤配70年代猎装夹克——跨越三十年的实用主义对话',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=workwear%20outfit%20flat%20lay%20vintage%20overalls%20safari%20jacket%20rugged%20indigo&image_size=landscape_16_9'
    ]
  },
  {
    id: 'outfit-006',
    name: '海上归人',
    items: ['item-012', 'item-009'],
    totalDeposit: 2100,
    description: '海军呢大衣配格纹半裙，甲板上的风和港口的雾气',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nautical%20outfit%20flat%20lay%20navy%20peacoat%20tartan%20skirt%20vintage%20maritime&image_size=landscape_16_9'
    ]
  },
  {
    id: 'outfit-007',
    name: '花间漫步',
    items: ['item-005', 'item-011'],
    totalDeposit: 2200,
    description: '刺绣长裙搭钩针披肩，波西米亚花园里的下午茶',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bohemian%20garden%20outfit%20flat%20lay%20embroidered%20dress%20crochet%20shawl%20floral%20vintage&image_size=landscape_16_9'
    ]
  }
]

export const rentalOrders: RentalOrder[] = [
  {
    id: 'order-001',
    customerName: '林小月',
    outfitId: 'outfit-001',
    itemIds: ['item-001', 'item-002', 'item-011'],
    startDate: '2026-06-10',
    endDate: '2026-06-17',
    totalDeposit: 1700,
    status: 'active',
    returnCheck: undefined,
    renewalRequest: undefined
  },
  {
    id: 'order-002',
    customerName: '陈思远',
    outfitId: 'outfit-003',
    itemIds: ['item-008', 'item-003'],
    startDate: '2026-06-05',
    endDate: '2026-06-12',
    totalDeposit: 2800,
    status: 'overdue',
    returnCheck: undefined,
    renewalRequest: undefined
  },
  {
    id: 'order-003',
    customerName: '王雅琴',
    outfitId: 'outfit-002',
    itemIds: ['item-004', 'item-009', 'item-010'],
    startDate: '2026-06-08',
    endDate: '2026-06-15',
    totalDeposit: 3200,
    status: 'active',
    returnCheck: undefined,
    renewalRequest: {
      requested: true,
      newEndDate: '2026-06-22',
      status: 'pending'
    }
  },
  {
    id: 'order-004',
    customerName: '张明辉',
    outfitId: 'outfit-005',
    itemIds: ['item-007', 'item-001'],
    startDate: '2026-06-01',
    endDate: '2026-06-08',
    totalDeposit: 1400,
    status: 'returned',
    returnCheck: [
      {
        itemId: 'item-007',
        stains: 'damaged',
        missingButtons: 'ok',
        zipperIssue: 'ok',
        liningIssue: 'ok',
        notes: '右裤腿新增一处咖啡渍，约3cm'
      },
      {
        itemId: 'item-001',
        stains: 'ok',
        missingButtons: 'ok',
        zipperIssue: 'ok',
        liningIssue: 'ok',
        notes: '状态良好'
      }
    ]
  },
  {
    id: 'order-005',
    customerName: '李雨薇',
    outfitId: 'outfit-007',
    itemIds: ['item-005', 'item-011'],
    startDate: '2026-06-12',
    endDate: '2026-06-19',
    totalDeposit: 2200,
    status: 'renewal_requested',
    returnCheck: undefined,
    renewalRequest: {
      requested: true,
      newEndDate: '2026-06-26',
      status: 'pending'
    }
  }
]

export const categoryLabels: Record<string, string> = {
  tops: '上装',
  bottoms: '下装',
  outerwear: '外套',
  dress: '连衣裙',
  accessories: '配饰',
  shoes: '鞋履',
  bags: '包袋'
}

export const wearLevelLabels: Record<number, string> = {
  1: '近新品',
  2: '轻微磨损',
  3: '中度磨损',
  4: '明显磨损',
  5: '重度磨损'
}
