describe('Tic Tac Toe', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('レンダリングするだけ', () => {
    cy.get('body').contains('Next player');
  });
});
