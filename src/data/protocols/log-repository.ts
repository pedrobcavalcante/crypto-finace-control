export default interface LogErrorRepository{
    log(message: any): Promise<void>
}