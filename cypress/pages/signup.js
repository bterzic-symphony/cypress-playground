export class SignUpPage {

    navigate() {
        cy.contains('.nav-link', 'Sign up').click()
        return this
    }

    typeInUsername(username) {
        cy.get('input[ng-model="$ctrl.formData.username"]').type(username)
        return this
    }

    typeInEmail(email) {
        cy.get('input[ng-model="$ctrl.formData.email"]').type(email)
        return this
    }

    typeInPassword(password) {
        cy.get('input[ng-model="$ctrl.formData.password"]').type(password)
        return this
    }

    clickSignUpButton() {
        cy.contains('.btn', 'Sign up').click()
        return this
    }
}
export const signUpPage = new SignUpPage()