import pistoletAlarmeImg1 from "@/assets/guide-identification/photos/arme_alarme/ZORAKI_R2.jpg";
import pistoletAlarmeImg2 from "@/assets/guide-identification/photos/arme_alarme/ZORAKI_925.jpg";
import pistoletAlarmeImg3 from "@/assets/guide-identification/photos/arme_alarme/ZORAKI_906.jpg";
import pistoletAlarmeImg4 from "@/assets/guide-identification/photos/arme_alarme/ZORAKI_2906.png";
import pistoletAlarmeImg5 from "@/assets/guide-identification/photos/arme_alarme/ZORAKI_918.jpg";
import pistoletAlarmeImg6 from "@/assets/guide-identification/photos/arme_alarme/KIMAR_911.png";
import pistoletAlarmeImg7 from "@/assets/guide-identification/photos/arme_alarme/KIMAR_75_AUTO.jpg";
import pistoletAlarmeImg8 from "@/assets/guide-identification/photos/arme_alarme/KIMAR_92_AUTO.jpg";
import pistoletAlarmeImg9 from "@/assets/guide-identification/photos/arme_alarme/KIMAR_CA.jpg";
import pistoletAlarmeImg10 from "@/assets/guide-identification/photos/arme_alarme/KIMAR_PA.jpg";
import pistoletAlarmeImg11 from "@/assets/guide-identification/photos/arme_alarme/BLOW_F92.jpg";
import pistoletAlarmeImg12 from "@/assets/guide-identification/photos/arme_alarme/BLOW_F92_AUTO.jpg";
import pistoletAlarmeImg13 from "@/assets/guide-identification/photos/arme_alarme/BLOW_C75.jpg";

import pistoletAlarmeImg1Zoom from "@/assets/guide-identification/photos/arme_alarme/ZORAKI_R2_Zoom.jpg";
import pistoletAlarmeImg2Zoom from "@/assets/guide-identification/photos/arme_alarme/ZORAKI_925_Zoom.jpg";
import pistoletAlarmeImg3Zoom from "@/assets/guide-identification/photos/arme_alarme/ZORAKI_906_Zoom.jpg";
import pistoletAlarmeImg4Zoom from "@/assets/guide-identification/photos/arme_alarme/ZORAKI_2906_Zoom.png";
import pistoletAlarmeImg5Zoom from "@/assets/guide-identification/photos/arme_alarme/ZORAKI_918_Zoom.jpg";
import pistoletAlarmeImg6Zoom from "@/assets/guide-identification/photos/arme_alarme/KIMAR_911_Zoom.png";
import pistoletAlarmeImg7Zoom from "@/assets/guide-identification/photos/arme_alarme/KIMAR_75_AUTO_Zoom.jpg";
import pistoletAlarmeImg8Zoom from "@/assets/guide-identification/photos/arme_alarme/KIMAR_92_AUTO_Zoom.jpg";
import pistoletAlarmeImg9Zoom from "@/assets/guide-identification/photos/arme_alarme/KIMAR_CA_Zoom.png";
import pistoletAlarmeImg10Zoom from "@/assets/guide-identification/photos/arme_alarme/KIMAR_PA_Zoom.jpg";
import pistoletAlarmeImg11Zoom from "@/assets/guide-identification/photos/arme_alarme/BLOW_F92_Zoom.jpg";
import pistoletAlarmeImg12Zoom from "@/assets/guide-identification/photos/arme_alarme/BLOW_F92_AUTO_Zoom.jpg";
import pistoletAlarmeImg13Zoom from "@/assets/guide-identification/photos/arme_alarme/BLOW_C75_Zoom.jpg";

export const arme_alarme = {
  displayLabel: "Arme d'alarme",
  getCategory: () => "C",
  options: [
    {
      label: "ZORAKI R2",
      value: "zoraki_r2",
      img: pistoletAlarmeImg1,
      imgZoom: pistoletAlarmeImg1Zoom,
      typology: "revolver",
    },
    {
      label: "ZORAKI 925",
      value: "zoraki_925",
      img: pistoletAlarmeImg2,
      imgZoom: pistoletAlarmeImg2Zoom,
      typology: "pistolet_semi_auto_moderne",
    },
    {
      label: "ZORAKI 906",
      value: "zoraki_906",
      img: pistoletAlarmeImg3,
      imgZoom: pistoletAlarmeImg3Zoom,
      typology: "pistolet_semi_auto_moderne",
    },
    {
      label: "ZORAKI 2906",
      value: "zoraki_2906",
      img: pistoletAlarmeImg4,
      imgZoom: pistoletAlarmeImg4Zoom,
      typology: "pistolet_semi_auto_moderne",
    },
    {
      label: "ZORAKI 918",
      value: "zoraki_918",
      img: pistoletAlarmeImg5,
      imgZoom: pistoletAlarmeImg5Zoom,
      typology: "pistolet_semi_auto_moderne",
    },
    {
      label: "KIMAR 911",
      value: "kimar_911",
      img: pistoletAlarmeImg6,
      imgZoom: pistoletAlarmeImg6Zoom,
      typology: "pistolet_semi_auto_moderne",
    },
    {
      label: "KIMAR 75 AUTO",
      value: "kimar_75_auto",
      img: pistoletAlarmeImg7,
      imgZoom: pistoletAlarmeImg7Zoom,
      typology: "pistolet_semi_auto_moderne",
    },
    {
      label: "KIMAR 92 AUTO",
      value: "kimar_92_auto",
      img: pistoletAlarmeImg8,
      imgZoom: pistoletAlarmeImg8Zoom,
      typology: "pistolet_semi_auto_moderne",
    },
    {
      label: "KIMAR Competitive Alarm",
      value: "kimar_competitive_alarm",
      img: pistoletAlarmeImg9,
      imgZoom: pistoletAlarmeImg9Zoom,
      typology: "revolver",
    },
    {
      label: "KIMAR Power Alarm",
      value: "kimar_power_alarm",
      img: pistoletAlarmeImg10,
      imgZoom: pistoletAlarmeImg10Zoom,
      typology: "revolver",
    },
    {
      label: "BLOW F92",
      value: "blow_f92",
      img: pistoletAlarmeImg11,
      imgZoom: pistoletAlarmeImg11Zoom,
      typology: "pistolet_semi_auto_moderne",
    },
    {
      label: "BLOW F92 AUTO",
      value: "blow_f92_auto",
      img: pistoletAlarmeImg12,
      imgZoom: pistoletAlarmeImg12Zoom,
      typology: "pistolet_semi_auto_moderne",
    },
    {
      label: "BLOW C75",
      value: "blow_c75",
      img: pistoletAlarmeImg13,
      imgZoom: pistoletAlarmeImg13Zoom,
      typology: "pistolet_semi_auto_moderne",
    },
  ],
} as const;
