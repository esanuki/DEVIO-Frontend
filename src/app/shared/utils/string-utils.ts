export class StringUtils {
    
    public static onlyNumbers(number: string): string {
        return number.replace(/[^0-9]/g,'');
    }
}