import { resultTree } from '@/utils/firearms-utils/index.js'

export const getNextRouteAfterResult = ({ securingTutorial, confidenceLevel, typology }) => {
  const isAbleToWatchTutorial = securingTutorial === true && confidenceLevel !== 'low'
  if (!isAbleToWatchTutorial) {
    return { name: 'IdentificationTypologyResult' }
  }

  const hasNoSecuringOptions = !resultTree[typology].isSecuringOptions
  if (hasNoSecuringOptions) {
    return { name: 'SecuringAchievement' }
  }

  const hasMoreThanOneOptions = resultTree[typology]?.options_step_1
  if (hasMoreThanOneOptions) {
    return { name: 'SecuringSelectOption', params: { step: 1 } }
  }

  const hasSecuringOptions = resultTree[typology]?.options
  return {
    name: hasSecuringOptions ? 'SecuringSelectOption' : 'SecuringTutorialContent',
    ...(hasSecuringOptions ? { params: { step: 1 } } : {}),
  }
}
