/* eslint-disable eqeqeq */
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/semi */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    userObservable: any = [];
    // url = 'http://localhost:3000'
    url = 'http://35.224.127.34:8080'
    // url = 'http://localhost:8080'
    // url = 'http://10.68.1.25:8080'
    // tentando conectar via localhost

    emitError(code: string) {}

    constructor(private http: HttpClient, private auth: AngularFireAuth, private router: Router) {
        this.auth.authState.subscribe(
            (user: any) => ((this.userObservable = user, console.log(this.userObservable)))
          );
     }
    userInfo: any = [];
    userBinario: any = [];
    userPoints: any = [];


  getSingleUser(email: any){
      return this.http.get(this.url+'/getUser/'+email)
    }
    getSingleUserBinario(usuario: any){
        return this.http.get(this.url+'/getUserBinario/'+usuario)
      }
    getBinario(_id: any){
        return this.http.get(this.url+'/getBinario/'+_id)
      }
      getUnilevel(_id: any){
        return this.http.get(this.url+'/getUnilevel/'+_id)
      }
    async newUser(usuario: any, email: any, password: any){
        usuario.email = email
        await this.auth.createUserWithEmailAndPassword(email, password)
          .then(
            (creds: any) => {
              console.log(creds.user);
              creds.user.sendEmailVerification();
              // this.sendEmailVerification(creds.user);
              creds.user?.updateProfile({ displayName: usuario.name });
              usuario.uid = creds.user.uid;
              // return 'Cadastro realizado com sucesso';
              // this.router.navigate(['login']);
            },
            (err: FirebaseError) => this.emitError(err.code)

          );
          return this.http.post(this.url+'/newUser', usuario)

    }

    completeUser(usuario: any){
     return this.http.get(this.url+'/completeUser/'+usuario)
    //    .subscribe((res: any) =>
    //    {this.userInfo = res[0], console.log(this.userInfo), this.userBinario = res[1], console.log(this.userBinario), this.userPoints = res[2], console.log(this.userPoints);} );
    //   return this.userBinario
    }

    login(email: any, password: any) {
        console.log(email)
        this.auth.signInWithEmailAndPassword(email, password).then(
          (creds: any) => {
            creds.user
              .getIdTokenResult()
              .then((res: any) =>
                this.router.navigate(['dashboard'])
              );
          },
          (err: FirebaseError) => this.emitError(err.code)
        );
      }
    addBinario(usuario: any){
        console.log(usuario.posicionado)
        if(usuario.posicionado == 0 || usuario.posicionado == '0'){
            return this.http.post(this.url+'/newBinario/', usuario)
        }else{
          return
        }
    };
    getRelatorioCollection(){
        return this.http.get(this.url+'/collection')
    }
    getRelatorio(data: any){
        console.log(data)
        return this.http.post(this.url+'/relatorio', data)
    }
}
