/* eslint-disable camelcase */
import axios from "axios";
import {
  ASK_FOR_OPINION_ROUTE,
  IDENTIFICATION_DUMMY_ROUTE,
  IDENTIFICATION_FEEDBACK_ROUTE,
  TUTORIAL_FEEDBACK_ROUTE,
  UPLOAD_PHOTO_FOR_DETECTION_ROUTE,
  GET_IRCGN_NUMBERS_ROUTE,
} from "./api-routes";

export const uploadPhotoForDetection = async (file: File) => {
  const fd = new FormData();
  fd.append("image", file, file.name);
  fd.append("date", "" + Date.now() / 1000); // date.now gives in milliseconds, convert to seconds

  const { data } = await axios.post(UPLOAD_PHOTO_FOR_DETECTION_ROUTE, fd);
  return data;
};

export const sendTutorialFeedback = async (feedback: any) => {
  const { data } = await axios.post(TUTORIAL_FEEDBACK_ROUTE, feedback);
  return data;
};

export const sendIdentificationFeedback = async (feedbackData: any) => {
  const { data } = await axios.post(
    IDENTIFICATION_FEEDBACK_ROUTE,
    feedbackData,
  );
  return data;
};

export const sendIdentificationDummyFeedback = async (feedbackDummy: any) => {
  const { data } = await axios.post(IDENTIFICATION_DUMMY_ROUTE, feedbackDummy);
  return data;
};

export const sendExpertiseForm = async (data: any, accessToken: string) => {
  return axios.post(ASK_FOR_OPINION_ROUTE, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    formSerializer: {
      indexes: null,
    },
  });
};

export const getContactDetails = async (accessToken: string) => {
  return await axios.get(GET_IRCGN_NUMBERS_ROUTE, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
