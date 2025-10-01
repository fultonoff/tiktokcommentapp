"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import ReactCountryFlag from "react-country-flag"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


const LocalSwitcher = () => {
    const locale: string = useLocale();
    const t = useTranslations('LocaleSwitcher');
  return (
    <Select defaultValue={locale} >
      <SelectTrigger className="w-fit">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {routing.locales.map((locale) => {

            return (
              <SelectItem value={locale} key={locale}>

                <ReactCountryFlag countryCode={t('locale', { locale }).split(' ')[1]} svg />
                {/* {locale} */}
                {/* {t('locale', { locale })} */}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocalSwitcher;
