"use client";

import React from "react";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  className?: string;
  showText?: boolean;
}

export function LanguageSelector({ className, showText = false }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-7 px-2 text-xs font-medium gap-1.5 text-fg-muted hover:text-fg hover:bg-fill transition-colors",
            className,
          )}
          title={t("common.language", "Idioma")}
        >
          <Globe strokeWidth={1.5} className="w-3.5 h-3.5 text-brand" />
          <span className="font-mono uppercase text-[11px] font-semibold">
            {language === "pt-BR" ? "PT" : "EN"}
          </span>
          {showText && <span className="text-xs">{language === "pt-BR" ? "Português" : "English"}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 bg-raised border-hairline-strong text-fg-secondary">
        <DropdownMenuItem
          onClick={() => setLanguage("pt-BR")}
          className="cursor-pointer flex items-center justify-between text-xs"
        >
          <span className="flex items-center gap-2">
            <span>🇧🇷</span>
            <span>Português (BR)</span>
          </span>
          {language === "pt-BR" && <Check className="w-3.5 h-3.5 text-brand" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className="cursor-pointer flex items-center justify-between text-xs"
        >
          <span className="flex items-center gap-2">
            <span>🇺🇸</span>
            <span>English (US)</span>
          </span>
          {language === "en" && <Check className="w-3.5 h-3.5 text-brand" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
