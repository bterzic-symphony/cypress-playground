export class SignInPage {

    navigate() {
        cy.contains('.nav-link', 'Sign in').click()
    return this
    }

    loginWithEmailAndPassword(email, password) {
        cy.get('input[ng-model="$ctrl.formData.email"]').type(email)
        cy.get('input[ng-model="$ctrl.formData.password"]').type(password)
        cy.get('button[ng-bind="$ctrl.title"]').click()
        return this
    }
}
export const signInPage = new SignInPage()