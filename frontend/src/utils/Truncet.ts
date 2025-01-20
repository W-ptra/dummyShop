export function Truncet(text: string, max:number):string{
    return text.length > max ? text.slice(0,max)+"..." : text;
}