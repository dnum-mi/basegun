import { resultTree } from '@/utils/firearms-utils/index'

export const getNextRouteAfterResult = ({ securingTutorial, confidenceLevel, typology, gunLength, gunBarrelLength }) => {
  const noCardDetected = computed(() => gunLength === undefined || gunBarrelLength === undefined)

  const isAbleToWatchTutorial = securingTutorial === true && confidenceLevel !== 'low' && noCardDetected
  if (!isAbleToWatchTutorial) {
    return { name: 'IdentificationTypologyResult' }
  }

  const hasNoSecuringOptions = !resultTree[typology].isSecuringOptions && noCardDetected
  if (hasNoSecuringOptions) {
    return { name: 'SecuringAchievement' }
  }

  const hasMoreThanOneOptions = resultTree[typology]?.options_step_1 && noCardDetected
  if (hasMoreThanOneOptions) {
    return { name: 'SecuringSelectOption', params: { step: 1 } }
  }

  const hasSecuringOptions = resultTree[typology]?.options && noCardDetected
  return {
    name: hasSecuringOptions ? 'SecuringSelectOption' : 'SecuringTutorialContent',
    ...(hasSecuringOptions ? { params: { step: 1 } } : {}),
  }
}
