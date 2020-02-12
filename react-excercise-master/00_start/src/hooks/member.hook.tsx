import { MemberEntity, FiltroMembers, createDefaultFiltroMiembros } from "../model"; import { usePromiseTracker, trackPromise } from "react-promise-tracker"; import { memberAPI } from "../api/memberAPI";
import React from "react";


export const useMembers = () => {
    const [members, setMembers] = React.useState<MemberEntity[]>([]);
    const [filtroMiembros, setFiltroMiembros] =
        React.useState<FiltroMembers>(createDefaultFiltroMiembros());
    const { promiseInProgress } = usePromiseTracker();

    const loadMembers = () => {
        trackPromise(memberAPI.getAllMembers(filtroMiembros.nameOrganization).
            then(members => setTimeout(() => setMembers(members), 4000)));
    };

    const handleChangeFiltro = (name: keyof FiltroMembers, value: string): void => {
        setFiltroMiembros({ ...filtroMiembros, [name]: value })

    }
    return { loadMembers, members, promiseInProgress, handleChangeFiltro }
}