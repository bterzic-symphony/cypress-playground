export class SettingsPage {

    navigate() {
        cy.contains('.nav-link', 'Settings').click()
        return this
    }

    typeInShortBio(bio) {
        cy.get('textarea[ng-model="$ctrl.formData.bio"]').type(bio)
        return this
    }

    typeInProfilePicture(pictureUrl) {
        cy.get('input[ng-model="$ctrl.formData.image"]').type(pictureUrl)
        return this
    }

    clickOnUpdateSettings() {
        cy.contains('.btn', 'Update Settings').click()
        return this
    }
}

export const settingsPage = new SettingsPage()