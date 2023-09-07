export class Helper {
    public static delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    public static basePath: string = "/assets";
    //public static basePath: string = "/GoShare/assets";
}