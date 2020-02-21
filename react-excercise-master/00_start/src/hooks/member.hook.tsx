import {
  MemberEntity,
  FiltroMembers,
  createDefaultFiltroMiembros
} from "../model";
import { memberAPI } from "../api/memberAPI";
import React from "react";
import useInfiniteScroll from "./infinitite-scroll.hook";

export const useMembers = () => {
  const [membersState, setMembers] = React.useState<MemberEntity[]>([]);
  const [filtroMiembros, setFiltroMiembros] = React.useState<FiltroMembers>(
    createDefaultFiltroMiembros()
  );
  const [error, setError] = React.useState<boolean>(false);
  const [noEncontrado, setnoEncontrado] = React.useState<boolean>(false);
  const [fetchingFirst, setFetchingFirst] = React.useState<boolean>(false);
  const [pageCount, setPage] = React.useState<number>(1);
  const { isFetchingMore, setIsFetchingMore } = useInfiniteScroll();
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  React.useEffect(() => {
    isFetchingMore && pageCount !== 1 && hasMore && loadMembers(pageCount);
  }, [isFetchingMore]);

  React.useEffect(() => loadMembers(1), []);

  const loadMembers = (page: number) => {
    setError(false);
    setnoEncontrado(false);
    if (page === 1) {
      setHasMore(true);
      setFetchingFirst(true);
    }
    memberAPI
      .getAllMembers(filtroMiembros.nameOrganization, page)
      .then(members => resolveMembers(members, page))
      .catch((e: Error) => {
        if (e.message === "Not Found") {
          setnoEncontrado(true);
          setMembers([]);
        } else {
          setError(true);
        }
      })
      .finally(() => {
        setFetchingFirst(false);
        setIsFetchingMore(false);
      });
  };
  
  const resolveMembers = (members: MemberEntity[], page: number) => {
    if (members.length !== 0) {
      page === 1
        ? setMembers(members)
        : setMembers([...membersState, ...members]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  const handleChangeFiltro = (name: keyof FiltroMembers, value: string): void =>
    setFiltroMiembros({ ...filtroMiembros, [name]: value });

  return {
    loadMembers,
    members: membersState,
    isFetchingMore,
    filtroMiembros,
    handleChangeFiltro,
    error,
    noEncontrado,
    fetchingFirst,
    hasMore
  };
};
