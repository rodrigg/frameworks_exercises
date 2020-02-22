export interface FiltroMembers {
  nameOrganization: string;
}

export const createDefaultFiltroMiembros = (): FiltroMembers => ({
  nameOrganization: "Lemoncode"
});
  