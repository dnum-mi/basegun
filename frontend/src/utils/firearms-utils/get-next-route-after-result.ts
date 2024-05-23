import { resultTree, MEASURED_GUNS_TYPOLOGIES } from '@/utils/firearms-utils/index'

export const getNextRouteAfterResult = ({ securingTutorial, confidenceLevel, typology, gunLength, gunBarrelLength }) => {
  const isCardDetected = gunLength !== null && gunBarrelLength !== null
  const isMeasuredGun = MEASURED_GUNS_TYPOLOGIES.includes(typology)

  const isAbleToWatchTutorial = securingTutorial === true && confidenceLevel !== 'low'
  if (!isAbleToWatchTutorial) {
    if (isCardDetected === false && isMeasuredGun === true) { return { name: 'MissingCard' } } else { return { name: 'IdentificationTypologyResult' } }
  }

  const hasSecuringOptions = resultTree[typology]?.options_step_1 || resultTree[typology]?.options || resultTree[typology]?.text_steps
  if (!hasSecuringOptions) {
    return { name: 'SecuringAchievement' }
  }

  const hasMoreThanOneOptions = resultTree[typology]?.options_step_1 || resultTree[typology]?.options
  if (hasMoreThanOneOptions) {
    return { name: 'SecuringSelectOption', params: { step: 1 } }
  }

  return { name: 'SecuringTutorialContent' }
}
