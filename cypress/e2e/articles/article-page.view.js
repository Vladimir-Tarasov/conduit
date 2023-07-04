import { faker } from '@faker-js/faker';

export const randomText = faker.lorem.paragraph();

export class ArticlePage {
  page = {
    article: '.article-page'
  };

  form = {
    textarea: 'form.comment-form textarea'
  };

  button = {
    submit: '.card-footer button[type=submit]',
    delete: 'comment .card-footer .mod-options'
  };

  addComment() {
    cy.get(this.form.textarea).click()
      .type(randomText);
    cy.get(this.button.submit).click();
    return this;
  }

  checkComment() {
    cy.get(this.page.article)
      .should('contain', randomText);
    return this;
  }

  deleteComment() {
    cy.get(this.button.delete)
      .eq(0)
      .click();
    cy.get(this.page.article)
      .should('not.contain', randomText);
  }
}
