import moment from 'moment';
export class UtilsDate{

    public static formatByYYYYMMDD = (data: any) =>{
        // const moment = require('moment');
        data = moment(data).format('YYYY-MM-DD HH:mm:ss');
        return data;
    } 

    public static formatByYYYYMMDDSemHora = (data: any) =>{
        // const moment = require('moment');
        data = moment(data).format('YYYY-MM-DD');
        return data;
    } 

    public static formatByDDMMYYYY = (data: any) =>{
        // const moment = require('moment');
        data = moment(data).format('DD/MM/YYYY HH:mm:ss');
        return data;
    } 

    public static getUltimosAnos() {
        const anos = new Array<number>();
        let ano_now = new Date().getFullYear();
        for (let i = 0; i < 5; i++) {
            anos.push(ano_now - i);
        }
        return anos.reverse();
    }

    public static getUltimasHoras(){
        // const moment = require('moment');
        const horas = new Array<string>();
        for (let i = 0; i < 12; i++) {
            let hora = moment(moment().subtract(i, 'hour').zone("-03:00")).format('HH:mm');
            horas.push(hora);
        }
        return horas.reverse();
        
    }

    public static adicionarDiasByData(dias: number){
        // const moment = require('moment');
        return moment().add(dias, 'days');
     }

    public static subtrairDiasByData(dias: number){
        // const moment = require('moment');
        return moment().subtract(dias, 'days');
     }

     public static subtrairhoraByData(horas: number){
        // const moment = require('moment');
        return moment().subtract(horas, 'hour').zone("-03:00");
     }
}