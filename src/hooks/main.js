import { axiosApp } from "@/store";
export const getCharacters = async (page) => {
  try {
    let data = (await axiosApp.get(`/people/?page=${page}`)).data;
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const searchCharacters = async (searchValue) => {
  try {
    let data = (await axiosApp.get(`/people?search=${searchValue}`)).data;
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getHomeworld = async (planetId) => {
  try {
    let data = (await axiosApp.get(`/planets/${planetId}`)).data.name;
    return data;
  } catch (err) {
    console.log(err);
  }
};
