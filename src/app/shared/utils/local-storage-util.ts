export class LocalStorageUtil {
    
    getUser = () => JSON.parse(localStorage.getItem('devio.user'));

    public saveDateLocalUser(response: any) {
        this.saveTokenUser(response.accessToken);
        this.saveUser(response.userToken);
    }

    public clearDateLocalUser() {
        localStorage.removeItem('devio.token');
        localStorage.removeItem('devio.user');
    }

    getTokenUser = () => localStorage.getItem('devio.token');

    saveTokenUser = (token: string) => localStorage.setItem('devio.token', token);

    saveUser = (user: string) => localStorage.setItem('devio.user', JSON.stringify(user));

}