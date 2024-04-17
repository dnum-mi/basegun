const MENTIONS = [
  ['A', 'A - Interdite'],
  ['B', 'B - Soumise à autorisation'],
  ['C', 'C - Soumise à déclaration'],
  ['D', 'D - Libre d\'acquisition et de détention'],
  ['Non Classée', 'Libre d\'acquisition et de détention'],
]

export function getMentionsFromCategories (categories: string = '') {
  if (categories !== 'Non Classée') {
    const filteredMentions = []
    for (const mention of MENTIONS) {
      if (categories.includes(mention[0])) { filteredMentions.push(mention[1]) }
    }
    return filteredMentions
  }
  return [MENTIONS.find(mention => mention[0] === 'Non Classée')[1]]
}
