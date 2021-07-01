import { axiosApp } from "@/store";
export const getCharacters = async () => {
  try {
    let qwe = (await axiosApp.get("/people")).data;
    console.log(qwe);
  } catch (err) {
    console.log(err);
  }
};
export const searchCharacters = async (searchValue) => {
  try {
    let qwe = (await axiosApp.get(`/people?search=${searchValue}`)).data;
    console.log(qwe);
  } catch (err) {
    console.log(err);
  }
};
