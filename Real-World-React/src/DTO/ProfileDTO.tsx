export default interface ProfileDTO {
    username: string,
    bio: string | null,
    image: string,
    following: boolean
}