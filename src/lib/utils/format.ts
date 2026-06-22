import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDate = (date: string) =>
  format(new Date(date), "d MMM yyyy", { locale: fr });
