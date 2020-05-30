import Axios, { AxiosResponse } from "axios";

import { GNAnimalData } from "@root/constants/APIInterface";
import { AnimalData } from "@root/constants/interface";

class PublicAPI {
  public getAnimalData = async (DogNo: string) => {
    const data = {
      searchDogRegNo: DogNo,
    };

    return Axios.post(
      "https://cors-anywhere.herokuapp.com/https://www.animal.go.kr/front/awtis/record/recordConfirmDtl.do",
      null,
      { params: data }
    ).then((reponse: AxiosResponse<GNAnimalData>) => {
      const myData: AnimalData = {
        name: reponse.data.data.dogNm,
        animalNumber: reponse.data.data.dogRegNo,
        kind: reponse.data.data.kindCd,
        genderType: reponse.data.data.sexCd,
      };

      return myData;
    });
  };
}

// eslint-disable-next-line import/prefer-default-export
export const publicAPI = new PublicAPI();
