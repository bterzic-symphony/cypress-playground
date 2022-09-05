export class ArticleCreatePage {

    navigate() {
        cy.contains('.nav-link', 'New Article').click()
        return this
    }

    typeInArticleTitle(title) {
        cy.get('input[ng-model="$ctrl.article.title"]').type(title)
        return this
    }

    typeInArticleDescription(description) {
        cy.get('input[ng-model="$ctrl.article.description"]').type(description)
        return this
    }

    typeInArticleBody(body) {
        cy.get('textarea[ng-model="$ctrl.article.body"]').type(body)
        return this
    }

    typeInArticleTag(tag) {
        cy.get('input[ng-model="$ctrl.tagField"]')
            .type(tag)
            .type('{enter}')
        return this
    }

    clickOnPublishArticle() {
        cy.contains('.btn', 'Publish Article').click()
        return this
    }
}

export const articleCreatePage = new ArticleCreatePage()