"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Check, Copy, Eraser, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import type { DatabaseObject, ProviderCapabilities } from "@/lib/db/types";
import { generateTruncateQuery } from "@/lib/query-generators";
import { useTranslation } from "@/lib/i18n";

export interface TruncateTableModalProps {
  readonly object: DatabaseObject | null;
  readonly capabilities: ProviderCapabilities;
  readonly databaseType?: string;
  readonly onClose: () => void;
  readonly onExecute: (sql: string) => Promise<boolean | void>;
}

export function TruncateTableModal({
  object,
  capabilities,
  databaseType,
  onClose,
  onExecute,
}: TruncateTableModalProps) {
  const { t } = useTranslation();
  const [cascade, setCascade] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isPostgres = useMemo(() => {
    const type = (databaseType ?? "").toLowerCase();
    return type === "postgres" || type.includes("postgres") || type.includes("pg");
  }, [databaseType]);

  const query = useMemo(() => {
    if (!object) return "";
    return generateTruncateQuery(object.path, capabilities, databaseType, { cascade });
  }, [object, capabilities, databaseType, cascade]);

  if (!object) return null;

  const handleCopySql = () => {
    if (!query) return;
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = async () => {
    if (!confirmed || isExecuting) return;
    setIsExecuting(true);
    setErrorMessage(null);
    try {
      const success = await onExecute(query);
      if (success !== false) {
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Erro ao truncar a tabela.");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <AlertDialog open={object !== null} onOpenChange={(open) => !open && !isExecuting && onClose()}>
      <AlertDialogContent className="sm:max-w-lg border-danger/30 bg-surface">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-danger/10 text-danger flex items-center justify-center shrink-0">
              <Eraser className="w-5 h-5" />
            </div>
            <div>
              <AlertDialogTitle className="text-base font-semibold text-foreground">
                {t("truncate.title", "Truncar Tabela")}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs text-muted-foreground mt-0.5">
                {t("truncate.subtitle", "Exclusão em massa e limpeza completa de registros")}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="space-y-4 py-2 text-sm">
          <div className="rounded-md border border-danger/20 bg-danger/5 p-3 flex gap-3 text-xs leading-relaxed text-danger-foreground">
            <AlertTriangle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
            <div>
              {t("truncate.warning", "Você está prestes a limpar todos os dados da tabela")}{" "}
              <span className="font-mono font-bold bg-danger/10 text-danger px-1.5 py-0.5 rounded">
                {object.name}
              </span>
              . {t("truncate.irreversible", "Esta ação é irreversível e removerá permanentemente todos os registros.")}
            </div>
          </div>

          {/* Opção CASCADE se for PostgreSQL */}
          {isPostgres && (
            <label className="flex items-center gap-2 cursor-pointer text-xs select-none text-foreground/90">
              <Checkbox
                checked={cascade}
                onCheckedChange={(val) => setCascade(Boolean(val))}
                disabled={isExecuting}
              />
              <span>
                {t("truncate.cascade", "Aplicar CASCADE (recomendado se houver tabelas filhas com chave estrangeira)")}
              </span>
            </label>
          )}

          {/* Prévia da instrução SQL */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{t("truncate.sqlPreview", "Instrução SQL a ser executada:")}</span>
              <button
                type="button"
                onClick={handleCopySql}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? t("truncate.copied", "Copiado!") : t("truncate.copy", "Copiar")}</span>
              </button>
            </div>
            <pre className="p-2.5 rounded bg-sunken font-mono text-xs text-foreground/90 overflow-x-auto border border-border/40 select-all">
              {query}
            </pre>
          </div>

          {/* Mensagem de Erro, se houver */}
          {errorMessage && (
            <div className="rounded border border-danger/40 bg-danger/10 p-2.5 text-xs text-danger">
              {errorMessage}
            </div>
          )}

          {/* Confirmação de segurança */}
          <label className="flex items-center gap-2.5 cursor-pointer text-xs select-none border-t border-border/40 pt-3 text-foreground">
            <Checkbox
              checked={confirmed}
              onCheckedChange={(val) => setConfirmed(Boolean(val))}
              disabled={isExecuting}
            />
            <span className="font-medium text-foreground/90">
              {t("truncate.confirmCheck", "Estou ciente e confirmo a limpeza total desta tabela.")}
            </span>
          </label>
        </div>

        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel disabled={isExecuting} onClick={onClose} className="text-xs">
            {t("truncate.cancel", "Cancelar")}
          </AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            disabled={!confirmed || isExecuting}
            onClick={handleConfirm}
            className="text-xs gap-1.5 bg-danger hover:bg-danger/90 text-white font-medium"
          >
            {isExecuting ? (
              <>
                <Spinner className="w-3.5 h-3.5" />
                <span>{t("truncate.executing", "Truncando tabela...")}</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t("truncate.executeNow", "Truncar Agora")}</span>
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
