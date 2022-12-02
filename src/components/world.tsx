import { html } from "common-tags";

export const ProgrammingLanguages = () => {
  const proglangs = ["Javascript", "Typescript", "Rust", "C", "C++", "NASM"];
  return proglangs.map(
    (lang) =>
      html` <img
          src="public/${lang}.png"
          alt="${lang}"
          width="25"
          height="25"
        />&nbsp; ${lang} <br />`
  );
};
