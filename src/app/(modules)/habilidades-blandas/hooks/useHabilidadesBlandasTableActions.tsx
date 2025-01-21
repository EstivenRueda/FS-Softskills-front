import { useConst } from "@/hooks";
import { HabilidadBlanda } from "../types";
import { TableActionsFn } from "@/types";
import { useRouter } from "next/navigation";
import { Edit as EditIcon, QuestionMark as QuestionMarkIcon ,  Filter as FilterIcon} from "@mui/icons-material";

export  function useHabilidadesBlandasTableActions() {

  const route = useRouter()

  return useConst<TableActionsFn<HabilidadBlanda>>(()=> (habilidadBlanda: HabilidadBlanda) => [
    {
      label:'Editar',
      icon: <EditIcon color="secondary" />,
      onClick(){
        route.push(`/habilidades-blandas/${habilidadBlanda.slug}/editar`);
      }
    },
    {
      label:'Preguntas',
      icon: <QuestionMarkIcon color="secondary" />,
      onClick(){
        route.push(`/habilidades-blandas/${habilidadBlanda.slug}/editar`);
      }
    },
    {
      label:'Capacitaciones',
      icon: <FilterIcon color="secondary" />,
      onClick(){
        route.push(`/habilidades-blandas/${habilidadBlanda.slug}/editar`);
      }
    },
  ])
}
