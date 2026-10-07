import type { JSX } from "react/jsx-runtime";
import clsx from "clsx";
import type { Language } from "./../languages.ts";

type LanguageChipsProps = { languages: Language[]; wrongGuessCount: number };

export default function LanguageChips({
  languages,
  wrongGuessCount,
}: LanguageChipsProps): JSX.Element {
  const languageElements: JSX.Element[] = languages.map(
    (language: Language, index: number): JSX.Element => {
      const styles: Omit<Language, "name"> = {
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
    },
  );
  return <section className="language-chips">{languageElements}</section>;
}
