import {
  TYPOLOGIES,
  MEASURED_GUNS_TYPOLOGIES,
} from "@/utils/firearms-utils/index";

export const getNextRouteAfterResult = (
  securingTutorial: boolean,
  confidenceLevel: string,
  typology: string,
  gunLength: number,
  gunBarrelLength: number,
) => {
  const isCardDetected = gunLength !== null && gunBarrelLength !== null;
  const isMeasuredGun = MEASURED_GUNS_TYPOLOGIES.includes(typology);

  const isAbleToWatchTutorial =
    securingTutorial === true && confidenceLevel !== "low";
  if (!isAbleToWatchTutorial) {
    if (isCardDetected === false && isMeasuredGun === true) {
      return { name: "MissingCard" };
    } else {
      return { name: "IdentificationTypologyResult" };
    }
  }

  const hasSecuringOptions = TYPOLOGIES[typology]?.securingSteps;
  if (!hasSecuringOptions) {
    return { name: "SecuringAchievement" };
  }

  const hasMoreThanOneSteps =
    TYPOLOGIES[typology].securingSteps[0].options.length > 1;
  if (hasMoreThanOneSteps) {
    return { name: "SecuringSelectOption", params: { step: 1 } };
  }

  return { name: "SecuringTutorialContent" };
};
