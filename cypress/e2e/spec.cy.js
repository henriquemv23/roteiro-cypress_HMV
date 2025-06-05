describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Deve editar uma tarefa existente', () => {
    cy.visit('');
    const originalText = 'Tarefa para editar';
    const newText = 'Tarefa editada com sucesso';
    cy.get('[data-cy=todo-input]').type(`${originalText}{enter}`);
    cy.get('[data-cy=todos-list]').children().should('have.length', 1);
    cy.get('[data-cy=todos-list] li label').should('have.text', originalText);
    cy.get('[data-cy=todos-list] li label').dblclick();
    cy.get('[data-cy=todos-list] li .edit')
      .clear() 
      .type(`${newText}{enter}`); 
    cy.get('[data-cy=todos-list] li label').should('have.text', newText);
  });

  it('Deve marcar e desmarcar uma tarefa individualmente', () => {
    cy.visit('');
    const taskName = 'Tarefa individual';
    cy.get('[data-cy=todo-input]').type(`${taskName}{enter}`);
    cy.get('[data-cy=todos-list]').children().should('have.length', 1);
    cy.get('[data-cy=todos-list] li').first().should('not.have.class', 'completed');
    cy.get('[data-cy=todos-list] li').first().find('[data-cy=toggle-todo-checkbox]').should('not.be.checked');
    cy.get('[data-cy=todos-list] li').first().find('[data-cy=toggle-todo-checkbox]').click();
    cy.get('[data-cy=todos-list] li').first().should('have.class', 'completed');
    cy.get('[data-cy=todos-list] li').first().find('[data-cy=toggle-todo-checkbox]').should('be.checked');
    cy.get('[data-cy=todos-list] li').first().find('[data-cy=toggle-todo-checkbox]').click();
    cy.get('[data-cy=todos-list] li').first().should('not.have.class', 'completed');
    cy.get('[data-cy=todos-list] li').first().find('[data-cy=toggle-todo-checkbox]').should('not.be.checked');
  });

  it('Deve atualizar o contador de itens restantes corretamente', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]').type('Comprar pão{enter}'); 
    cy.get('.todo-count').should('have.text', '1 item left');
    cy.get('[data-cy=todo-input]').type('Pagar contas{enter}'); 
    cy.get('.todo-count').should('have.text', '2 items left');
    cy.get('[data-cy=todos-list] > li').first().find('[data-cy=toggle-todo-checkbox]').click();
    cy.get('.todo-count').should('have.text', '1 item left');
    cy.get('[data-cy=todos-list] > li').first().find('[data-cy=remove-todo-btn]').invoke('show').click();
    cy.get('.todo-count').should('have.text', '1 item left');

    cy.get('[data-cy=todos-list] > li').first().find('[data-cy=toggle-todo-checkbox]').click();
    cy.get('.todo-count').should('have.text', '0 items left');
  });

});