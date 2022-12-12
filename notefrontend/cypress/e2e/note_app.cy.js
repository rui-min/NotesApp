describe('Note app tests', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'SuperRay',
      username: 'ray',
      password: 'ray'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('ray')
    cy.get('#password').type('ray')
    cy.get('#login-button').click()
    cy.contains('SuperRay logged-in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('ray')
    cy.get('#password').type('wrong password')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'SuperRay logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ray', password: 'ray' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and some notes exist', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
      
      it('one of those can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })

  it('then example', function() { // in-code debug example for promises like Cypress
    cy.get('button').then( buttons => {
      console.log('number of buttons', buttons.length)
      cy.wrap(buttons[0]).click()
    })
  })

})

