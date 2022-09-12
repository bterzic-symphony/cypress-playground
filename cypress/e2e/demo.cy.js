/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { signUpPage } from "../pages/signup";
import { settingsPage } from "../pages/settings";
import { articleCreatePage } from "../pages/createarticle";
import { articlePage } from "../pages/article";

describe("Cypress Demo Website Automation Scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Check if homepage loads successfully", () => {
    // Check if navbar is present
    cy.get(".navbar")
      .should("be.visible")
      .should("contain", "Home")
      .should("contain", "Sign in")
      .should("contain", "Sign up");

    cy.get(".banner").within(() => {
      // Check if logo(header title) is present
      cy.contains(".logo-font", "conduit").should("be.visible");

      // Check if header subtitle is present
      cy.contains("p", "A place to share your knowledge.").should("be.visible");
    });

    // Check if articles are displayed
    cy.get("article-preview").should("be.visible").should("have.length", 3);
  });

  it("Check if User can modify profile successfully", () => {
    // Click on Sign up link
    signUpPage.navigate();

    // Type Username/Password/Email
    signUpPage.typeInUsername(faker.internet.userName());
    signUpPage.typeInEmail(faker.internet.email());
    signUpPage.typeInPassword(faker.internet.password());

    // Click Sign up
    signUpPage.clickSignUpButton();

    // Click Settings
    settingsPage.navigate();

    // Enter bio
    const profileShortBio = "Cypress-entered short bio";
    settingsPage.typeInShortBio(profileShortBio);

    // Set Profile Picture
    const profilePictureUrl = faker.image.cats();
    settingsPage.typeInProfilePicture(profilePictureUrl);

    // Click Update Settings
    settingsPage.clickOnUpdateSettings();

    // Check if bio is set
    cy.get('p[ng-bind="::$ctrl.profile.bio"]').should(
      "have.text",
      profileShortBio
    );

    // Check if Profile Picture is set
    cy.get(".user-img").invoke("attr", "src").should("eq", profilePictureUrl);
  });

  it("Check if User can submit an Article", () => {
    // Login using custom command
    cy.demoLogin(
      Cypress.env("existingUsername"),
      Cypress.env("existingPassword")
    );

    // Click on New Article link
    articleCreatePage.navigate();

    // Fill in Article details with data from previously created fixture
    cy.fixture("article").then((articleData) => {
      articleCreatePage.typeInArticleTitle(articleData.title);
      articleCreatePage.typeInArticleDescription(articleData.description);
      articleCreatePage.typeInArticleBody(articleData.body);
      articleCreatePage.typeInArticleTag(articleData.tag);
    });

    // Click on Publish Article
    articleCreatePage.clickOnPublishArticle();

    // Check if article data is valid
    cy.fixture("article").then((articleData) => {
      articlePage.checkIfArticleTitleContains(articleData.title);
      articlePage.checkIfArticleBodyContains(articleData.body);
      articlePage.checkIfArticleTagsContain(articleData.tag);
    });

    // Clean up - delete article after successful test
    articlePage.clickDeleteArticleButton();
  });

  it("Check if display of mocked articles is correct", () => {
    // Intercept
    cy.fixture("articles").then((articlesData) => {
      cy.intercept("GET", "feed*", articlesData);
    });

    // Login - this time we use an API method to bypass UI login
    cy.loginUsingApi(
      Cypress.env("existingUsername"),
      Cypress.env("existingPassword")
    );

    cy.visit("/");

    // Check if articles have correct values
    cy.fixture("articles").then((articlesData) => {
      // Check first article
      cy.get("article-preview")
        .eq(0)
        .within(() => {
          cy.get("h1").should("contain", articlesData.articles[0].title);
          cy.get("p").should("contain", articlesData.articles[0].description);
          cy.get("li").should("contain", articlesData.articles[0].tagList[0]);
        });

      // Check second article
      cy.get("article-preview")
        .eq(1)
        .within(() => {
          cy.get("h1").should("contain", articlesData.articles[1].title);
          cy.get("p").should("contain", articlesData.articles[1].description);
          cy.get("li").should("contain", articlesData.articles[1].tagList[0]);
        });

      // Check third article
      cy.get("article-preview")
        .eq(2)
        .within(() => {
          cy.get("h1").should("contain", articlesData.articles[2].title);
          cy.get("p").should("contain", articlesData.articles[2].description);
          // Checking for multiple tags
          cy.get("li").then(($ele) => {
            let tagList = [];

            const tags = Array.from($ele, (el) => el.innerText);
            tags.forEach((text) => tagList.push(text));

            expect(tagList).to.be.eql(articlesData.articles[2].tagList);
          });
          // Check for author username
          cy.get('a[class="author ng-binding"]').then(($author) => {
            let authorText = $author.text();
            expect(authorText).to.be.eql(
              articlesData.articles[2].author.username
            );
          });
        });
    });
  });
});
