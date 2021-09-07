describe('Tic Tac Toe のテスト', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('勝者 X', () => {
    // X: 左上
    cy.get('[data-e2e="button-0"]')
      .click()
      .get('[data-e2e="button-0"]')
      .should('have.text', 'X');
    // O: 上中
    cy.get('[data-e2e="button-1"]')
      .click()
      .get('[data-e2e="button-1"]')
      .should('have.text', 'O');
    // X: 左中
    cy.get('[data-e2e="button-3"]')
      .click()
      .get('[data-e2e="button-3"]')
      .should('have.text', 'X');
    // O: 真ん中
    cy.get('[data-e2e="button-4"]')
      .click()
      .get('[data-e2e="button-4"]')
      .should('have.text', 'O');
    // X: 左下
    cy.get('[data-e2e="button-6"]')
      .click()
      .get('[data-e2e="button-6"]')
      .should('have.text', 'X');
    // X が勝ったと表示されているか？
    cy.get('[data-e2e="status"]').should('have.text', 'Winner: X');
  });
});
