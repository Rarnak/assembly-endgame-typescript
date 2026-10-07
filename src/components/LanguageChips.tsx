import type { JSX } from "react/jsx-runtime";
import clsx from "clsx";
import type { language } from "./../languages.ts";

type languageChipsProps = { languages: language[]; wrongGuessCount: number };

export default function LanguageChips({
  languages,
  wrongGuessCount,
}: languageChipsProps): JSX.Element {
  const languageElements = languages.map((language, index) => {
    const styles: Omit<language, "name"> = {
      color: language.color,
      backgroundColor: language.backgroundColor,
    };

    const isLanguageLost: boolean = index < wrongGuessCount;
    const className: string = clsx("chip", isLanguageLost && "lost");

    return (
      <span key={index} style={styles} className={className}>
        {language.name}
      </span>
    );
  });
  return <section className="language-chips">{languageElements}</section>;
}
