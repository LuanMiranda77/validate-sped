
import { api } from "../api";
import { login } from "../auth";
import { IUserAplication } from "../../types/user_aplication";

export class LoginService {

    url='api/usuario';
    auth='/tokken';
    erro='';

    public async login(pEntity : IUserAplication) {
        
        const token = await api.post(this.auth, {email:'admin',password:'Ads%$#@!Ads'}).then(response =>{
            login(response.data);
            return response.data;
        });
        
        if(token){
            const response = await api.post(this.url+'/login', pEntity)
            .then( resp =>{
                return resp.data;
            })
            .catch(error => {
                console.log(error.response.data[0]);
                
                return error.response.data[0] !== undefined ? Promise.reject(error.response.data[0]) : Promise.reject({mensagemUsuario:'Verifique o JWT'});
            });
            return response;
        }
    }

    public async recuperarSenha(user: IUserAplication){
        const response = await api.post(this.url+'/recuperasenha', user)
        .then( resp =>{
            return resp.data;
        })
        .catch(error => {
            return Promise.reject(error.response.data[0]);
        });
        return response;
    }

    public async trocarSenha(user: IUserAplication){
        const response = await api.put(this.url+`/${user.id}`, user)
        .then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error.response.data[0]);
        });
        return response;
    }


}
