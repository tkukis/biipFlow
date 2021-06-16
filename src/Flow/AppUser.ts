export default interface AppUser {
    id: string
    teams: Array<string>
    permissions: Array<string>
}
export function cAppUser(id, permissions: Array<string> = [], teams: Array<string> = []): AppUser {
    return { id, teams, permissions }
}
export const defaultUser: AppUser = {
    id: "tomas",
    permissions: [],
    teams: []
}