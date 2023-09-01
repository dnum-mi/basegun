import { resultTree } from '@/utils/firearms-utils/index.js'

export const getNextRouteAfterResult = ({ securingTutorial, confidenceLevel, typology }) => {
  const isAbleToWatchTutorial = securingTutorial === true && confidenceLevel !== 'low'
  if (!isAbleToWatchTutorial) {
    return 'IdentificationTypologyResult'
  }

  const hasNoSecuringOptions = !resultTree[typology].isSecuringOptions
  if (hasNoSecuringOptions) {
    return 'SecuringAchievement'
  }

  const hasMoreThanOneOptions = resultTree[typology]?.options_step_1
  if (hasMoreThanOneOptions) {
    return 'SecuringSelectOptionStep1'
  }

  const hasSecuringOptions = resultTree[typology]?.options
  return hasSecuringOptions ? 'SecuringSelectOptionStep2' : 'SecuringTutorialContent'
}
