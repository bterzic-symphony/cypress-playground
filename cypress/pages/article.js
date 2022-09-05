export class ArticlePage {

    checkIfArticleTitleContains(articleTitle) {
        cy.get('h1[ng-bind="::$ctrl.article.title"]').should('contain', articleTitle)
        return this
    }
    checkIfArticleBodyContains(articleBody) {
        cy.get('div[ng-bind-html="::$ctrl.article.body"]').should('contain', articleBody)
        return this
    }

    checkIfArticleTagsContain(tag) {
        cy.get('.tag-default').should('contain', tag)
        return this
    }

    clickDeleteArticleButton() {
        cy.contains('.btn-outline-danger', 'Delete Article').click()
        return this
    }
}

export const articlePage = new ArticlePage();
