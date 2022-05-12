export class CurrencyUtils {

    public static StringToDecimal(input): any {
        if (input === null) return 0;

        input = input.replace(/\./g,'');
        input = input.replace(/,/g,'.');

        return parseFloat(input);
    }

    public static DecimalToString(input): any {
        var ret = input ? input.toString().replace('.',',') : null;
        if (ret) {
            var decArray = ret.split(',');
            if (decArray.length > 1){
                var decimal = decArray[1].length;
                if (decimal === 1) ret += '0';
            }
        }

        return ret;
    }
}