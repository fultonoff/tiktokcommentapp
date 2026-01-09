"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import ReactCountryFlag from "react-country-flag";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("LocaleSwitcher");
  const [en, setEn] = useState("en");
  const [fr, setSv] = useState("fr");

  const pathname = usePathname();
  const params = useParams();
  const { locale } = params;

  function onSelectChange(value: any) {
    const nextLocale = value;

    startTransition(() => {
      // router.replace(
      //   // @ts-expect-error -- TypeScript will validate that only known `params`
      //   // are used in combination with a given `pathname`. Since the two will
      //   // always match for the current route, we can skip runtime checks.
      //   { pathname, locale },
      //   { locale: nextLocale }
      // );
      router.push(pathname, { locale: nextLocale });

    });
  }

  const handleClick = (value: any) => {
    console.log("Clicked value:", value);

 
  };
  return (
    <div
      className={clsx(
        "relative text-main flex items-center ",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <div className="border-none">
        <Select className='border-primary '>
          <SelectTrigger className="border-none">
            <div className="text-3xl border-none">
              {locale === "en" ? (
                <ReactCountryFlag countryCode="GB" svg />
              ) : (
                <ReactCountryFlag countryCode="FR" svg className="h-fit"/>
              )}
            </div>
          </SelectTrigger>
          <SelectContent className=''>
            <div onClick={() => onSelectChange(fr)} className="text-main font-medium uppercase p-2 flex items-center gap-1 cursor-pointer hover:bg-accent">
              <ReactCountryFlag countryCode="FR" svg className="text-xl"/>

              {fr}
            </div>
            <div onClick={() => onSelectChange(en)} className="text-main p-2 flex items-center gap-1 cursor-pointer hover:bg-accent">
              <ReactCountryFlag countryCode="GB" svg className="text-xl"/>
              <span className="uppercase font-medium">
              {en}

              </span>
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}